require('dotenv').config();
const app = require('./src/app');
const { closePool } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Nigisu API escuchando en http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
});

async function shutdown() {
  console.log('Cerrando servidor...');
  server.close();
  await closePool();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
