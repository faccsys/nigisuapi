require('dotenv').config();
const odbc = require('odbc');

const connectionString =
  process.env.ODBC_CONNECTION_STRING || `DSN=${process.env.ODBC_DSN || 'sql tvnet'}`;

let poolPromise = null;

function getPool() {
  if (!poolPromise) {
    poolPromise = odbc.pool({
      connectionString,
      initialSize: Number(process.env.ODBC_POOL_INITIAL_SIZE) || 2,
      incrementSize: Number(process.env.ODBC_POOL_INCREMENT_SIZE) || 2,
      maxSize: Number(process.env.ODBC_POOL_MAX_SIZE) || 10,
    });
  }
  return poolPromise;
}

async function query(sql, params) {
  const pool = await getPool();
  return params && params.length ? pool.query(sql, params) : pool.query(sql);
}

async function closePool() {
  if (poolPromise) {
    const pool = await poolPromise;
    poolPromise = null;
    await pool.close();
  }
}

module.exports = { getPool, query, closePool };
