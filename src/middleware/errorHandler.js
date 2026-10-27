const ApiError = require('../utils/ApiError');

function notFoundHandler(req, res) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message, details: err.details });
    return;
  }

  // Errores nativos del driver ODBC (violacion de FK, NOT NULL, PK duplicada, etc.)
  if (err && Array.isArray(err.odbcErrors)) {
    res.status(409).json({
      message: 'Error de base de datos',
      details: err.odbcErrors.map((e) => e.message),
    });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = { notFoundHandler, errorHandler };
