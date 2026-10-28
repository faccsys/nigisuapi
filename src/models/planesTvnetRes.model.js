const db = require('../config/db');
const columns = require('./planesTvnetRes.columns');

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 25;
const TABLE = 'dbo.v_Fc_PlanesTvnetRes';

// The view itself exposes its two aggregate expressions unnamed ("expression",
// "expression1"); we alias them here to the friendly names used in the API.
const SELECT_LIST = 'percodigo, addcodigo, expression AS artnombre, expression1 AS valtot';

function clampInt(value, fallback, min, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isInteger(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

function castRow(row) {
  if (!row) return row;
  ['percodigo', 'addcodigo', 'valtot'].forEach((name) => {
    if (row[name] !== null && row[name] !== undefined) row[name] = Number(row[name]);
  });
  return row;
}

async function count(where, params) {
  const sql = `SELECT COUNT(*) AS total FROM ${TABLE}${where ? ` WHERE ${where}` : ''}`;
  const rows = await db.query(sql, params);
  return Number(rows[0].total);
}

function buildWhere({ filters = {}, q }) {
  const clauses = [];
  const params = [];

  if (filters.percodigo !== undefined) {
    clauses.push('percodigo = ?');
    params.push(filters.percodigo);
  }
  if (filters.addcodigo !== undefined) {
    clauses.push('addcodigo = ?');
    params.push(filters.addcodigo);
  }
  if (q) {
    clauses.push('expression LIKE ?');
    params.push(`%${q}%`);
  }

  return { where: clauses.join(' AND '), params };
}

async function list({ filters, q, page, pageSize } = {}) {
  const safePageSize = clampInt(pageSize, DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE);
  const safePage = clampInt(page, 1, 1, Number.MAX_SAFE_INTEGER);
  const startAt = (safePage - 1) * safePageSize + 1;

  const { where, params } = buildWhere({ filters, q });
  const whereSql = where ? ` WHERE ${where}` : '';

  const sql =
    `SELECT TOP ${safePageSize} START AT ${startAt} ${SELECT_LIST} ` +
    `FROM ${TABLE}${whereSql} ORDER BY percodigo, addcodigo`;

  const [rows, total] = await Promise.all([db.query(sql, params), count(where, params)]);

  return { rows: rows.map(castRow), total, page: safePage, pageSize: safePageSize };
}

module.exports = { table: TABLE, columns, list };
