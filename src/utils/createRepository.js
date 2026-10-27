const db = require('../config/db');

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 25;

function clampInt(value, fallback, min, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isInteger(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

/**
 * Builds a minimal CRUD repository over a SQL Anywhere table, driven purely by
 * column metadata. Used by every genXXX00 entity so adding a new table only
 * requires a column list, not a new copy of this query logic.
 */
function createRepository({ table, columns, searchColumns = [] }) {
  const pk = columns.find((c) => c.pk);
  if (!pk) throw new Error(`createRepository: '${table}' needs a column with pk: true`);

  const allColumnNames = columns.map((c) => c.name);
  const filterableColumns = new Set(allColumnNames);
  const booleanColumns = columns.filter((c) => c.type === 'boolean').map((c) => c.name);
  const numberColumns = columns.filter((c) => c.type === 'number').map((c) => c.name);

  // The ODBC driver returns SQL Anywhere 'bit' columns as the strings "0"/"1"
  // instead of real booleans, and some numeric columns as strings too. Cast
  // them back so the response matches the documented Swagger types.
  function castRow(row) {
    if (!row) return row;
    booleanColumns.forEach((name) => {
      if (row[name] !== null && row[name] !== undefined) row[name] = row[name] === true || row[name] === 1 || row[name] === '1';
    });
    numberColumns.forEach((name) => {
      if (row[name] !== null && row[name] !== undefined && typeof row[name] === 'string') row[name] = Number(row[name]);
    });
    return row;
  }

  async function count(where, params) {
    const sql = `SELECT COUNT(*) AS total FROM ${table}${where ? ` WHERE ${where}` : ''}`;
    const rows = await db.query(sql, params);
    return Number(rows[0].total);
  }

  function buildWhere({ filters = {}, q }) {
    const clauses = [];
    const params = [];

    Object.entries(filters).forEach(([name, val]) => {
      if (!filterableColumns.has(name) || val === undefined) return;
      clauses.push(`${name} = ?`);
      params.push(val);
    });

    if (q && searchColumns.length) {
      const searchClause = searchColumns.map((name) => `${name} LIKE ?`).join(' OR ');
      clauses.push(`(${searchClause})`);
      searchColumns.forEach(() => params.push(`%${q}%`));
    }

    return { where: clauses.join(' AND '), params };
  }

  async function list({ filters, q, page, pageSize, sort } = {}) {
    const safePageSize = clampInt(pageSize, DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE);
    const safePage = clampInt(page, 1, 1, Number.MAX_SAFE_INTEGER);
    const startAt = (safePage - 1) * safePageSize + 1;
    const sortColumn = allColumnNames.includes(sort) ? sort : pk.name;

    const { where, params } = buildWhere({ filters, q });
    const whereSql = where ? ` WHERE ${where}` : '';

    const sql =
      `SELECT TOP ${safePageSize} START AT ${startAt} ${allColumnNames.join(', ')} ` +
      `FROM ${table}${whereSql} ORDER BY ${sortColumn}`;

    const [rows, total] = await Promise.all([db.query(sql, params), count(where, params)]);

    return { rows: rows.map(castRow), total, page: safePage, pageSize: safePageSize };
  }

  async function findById(id) {
    const sql = `SELECT ${allColumnNames.join(', ')} FROM ${table} WHERE ${pk.name} = ?`;
    const rows = await db.query(sql, [id]);
    return castRow(rows[0]) || null;
  }

  async function create(data) {
    const columnsToInsert = Object.keys(data);
    if (columnsToInsert.length === 0) throw new Error('create: no hay columnas para insertar');
    const placeholders = columnsToInsert.map(() => '?').join(', ');
    const sql = `INSERT INTO ${table} (${columnsToInsert.join(', ')}) VALUES (${placeholders})`;
    await db.query(sql, columnsToInsert.map((c) => data[c]));
    return findById(data[pk.name]);
  }

  async function update(id, data) {
    const columnsToUpdate = Object.keys(data);
    if (columnsToUpdate.length === 0) return findById(id);
    const setClause = columnsToUpdate.map((c) => `${c} = ?`).join(', ');
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${pk.name} = ?`;
    const params = [...columnsToUpdate.map((c) => data[c]), id];
    const result = await db.query(sql, params);
    if (!result.count) return null;
    return findById(id);
  }

  async function remove(id) {
    const sql = `DELETE FROM ${table} WHERE ${pk.name} = ?`;
    const result = await db.query(sql, [id]);
    return Boolean(result.count);
  }

  return { table, columns, pk, list, findById, create, update, remove };
}

module.exports = { createRepository };
