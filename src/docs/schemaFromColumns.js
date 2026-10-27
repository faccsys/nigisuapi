function mapType(col) {
  switch (col.type) {
    case 'number':
      return { type: 'number' };
    case 'boolean':
      return { type: 'boolean' };
    case 'date':
      return { type: 'string', format: 'date-time' };
    default: {
      const schema = { type: 'string' };
      if (col.length) schema.maxLength = col.length;
      return schema;
    }
  }
}

/**
 * Derives an OpenAPI schema straight from the same column metadata used for
 * request validation, so the docs can never drift from what the API accepts.
 *
 * mode: 'read'   -> full row as returned by GET (includes pk + computed/audit columns)
 *       'create' -> body accepted by POST (no computed/audit columns, pk required)
 *       'update' -> body accepted by PUT (no computed/audit columns, no pk)
 */
function toSwaggerSchema(columns, { mode = 'read' } = {}) {
  const properties = {};
  const required = [];

  columns.forEach((col) => {
    if (mode !== 'read' && col.readOnly) return;
    if (mode === 'update' && col.pk) return;

    const schema = mapType(col);
    if (col.description) schema.description = col.description;
    if (col.readOnly) schema.readOnly = true;
    properties[col.name] = schema;

    if (mode === 'create' && col.required) required.push(col.name);
  });

  const result = { type: 'object', properties };
  if (required.length) result.required = required;
  return result;
}

module.exports = { toSwaggerSchema };
