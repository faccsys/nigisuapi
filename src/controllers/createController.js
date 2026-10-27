const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { validatePayload } = require('../utils/validate');

function coerceId(model, rawId) {
  if (model.pk.type === 'number') {
    const n = Number(rawId);
    if (Number.isFinite(n)) return n;
  }
  return rawId;
}

/**
 * Builds the standard list/get/create/update/remove handlers for a resource,
 * shared by every genXXX00 controller so route files only wire up paths.
 */
function createController(model, { filterKeys = [] } = {}) {
  const list = asyncHandler(async (req, res) => {
    const filters = {};
    filterKeys.forEach((key) => {
      if (req.query[key] !== undefined) filters[key] = req.query[key];
    });

    const { rows, total, page, pageSize } = await model.list({
      filters,
      q: req.query.q,
      page: req.query.page,
      pageSize: req.query.pageSize,
      sort: req.query.sort,
    });

    res.json({
      data: rows,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 0 },
    });
  });

  const getOne = asyncHandler(async (req, res) => {
    const row = await model.findById(coerceId(model, req.params.id));
    if (!row) {
      throw new ApiError(404, `Registro con ${model.pk.name}='${req.params.id}' no encontrado en ${model.table}`);
    }
    res.json({ data: row });
  });

  const create = asyncHandler(async (req, res) => {
    const { errors, value } = validatePayload(req.body, model.columns, { isUpdate: false });
    if (errors.length) throw new ApiError(400, 'Datos invalidos', errors);
    const created = await model.create(value);
    res.status(201).json({ data: created });
  });

  const update = asyncHandler(async (req, res) => {
    const { errors, value } = validatePayload(req.body, model.columns, { isUpdate: true });
    if (errors.length) throw new ApiError(400, 'Datos invalidos', errors);
    const updated = await model.update(coerceId(model, req.params.id), value);
    if (!updated) {
      throw new ApiError(404, `Registro con ${model.pk.name}='${req.params.id}' no encontrado en ${model.table}`);
    }
    res.json({ data: updated });
  });

  const remove = asyncHandler(async (req, res) => {
    const removed = await model.remove(coerceId(model, req.params.id));
    if (!removed) {
      throw new ApiError(404, `Registro con ${model.pk.name}='${req.params.id}' no encontrado en ${model.table}`);
    }
    res.status(204).send();
  });

  return { list, getOne, create, update, remove };
}

module.exports = { createController };
