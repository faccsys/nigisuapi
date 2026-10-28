const asyncHandler = require('../utils/asyncHandler');
const model = require('../models/planesTvnetRes.model');

// Vista de solo lectura: unicamente se expone el listado (con filtros), sin
// get-by-id/create/update/delete porque no existe una llave primaria de fila.
const list = asyncHandler(async (req, res) => {
  const filters = {};
  if (req.query.percodigo !== undefined) filters.percodigo = req.query.percodigo;
  if (req.query.addcodigo !== undefined) filters.addcodigo = req.query.addcodigo;

  const { rows, total, page, pageSize } = await model.list({
    filters,
    q: req.query.q,
    page: req.query.page,
    pageSize: req.query.pageSize,
  });

  res.json({
    data: rows,
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 0 },
  });
});

module.exports = { list };
