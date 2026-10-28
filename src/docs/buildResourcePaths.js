/**
 * Builds the standard GET/POST/GET-one/PUT/DELETE OpenAPI path definitions for
 * a resource. Every genXXX00 entity exposes the same shape, so this is shared
 * instead of hand-writing five path objects per table.
 */
function buildResourcePaths({ resourcePath, tag, componentPrefix, pkName, pkSchema, singularLabel, filterParams = [] }) {
  const listParams = [
    { name: 'page', in: 'query', description: 'Numero de pagina (base 1)', schema: { type: 'integer', minimum: 1, default: 1 } },
    { name: 'pageSize', in: 'query', description: 'Cantidad de registros por pagina (1-200)', schema: { type: 'integer', minimum: 1, maximum: 200, default: 25 } },
    { name: 'q', in: 'query', description: 'Busqueda de texto libre', schema: { type: 'string' } },
    { name: 'sort', in: 'query', description: 'Columna por la cual ordenar', schema: { type: 'string' } },
    ...filterParams,
  ];

  const idParam = {
    name: 'id',
    in: 'path',
    required: true,
    description: `Valor de ${pkName}`,
    schema: pkSchema,
  };

  const notFound = {
    description: `${singularLabel} no encontrado`,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
  };

  const badRequest = {
    description: 'Datos invalidos',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
  };

  return {
    [`/${resourcePath}`]: {
      get: {
        tags: [tag],
        summary: `Listar ${singularLabel.toLowerCase()}s`,
        parameters: listParams,
        responses: {
          200: {
            description: 'Listado paginado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: `#/components/schemas/${componentPrefix}` } },
                    meta: { $ref: '#/components/schemas/PaginationMeta' },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: [tag],
        summary: `Crear ${singularLabel.toLowerCase()}`,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: `#/components/schemas/${componentPrefix}Input` } } },
        },
        responses: {
          201: {
            description: `${singularLabel} creado`,
            content: { 'application/json': { schema: { type: 'object', properties: { data: { $ref: `#/components/schemas/${componentPrefix}` } } } } },
          },
          400: badRequest,
        },
      },
    },
    [`/${resourcePath}/{id}`]: {
      get: {
        tags: [tag],
        summary: `Obtener ${singularLabel.toLowerCase()} por ${pkName}`,
        parameters: [idParam],
        responses: {
          200: {
            description: singularLabel,
            content: { 'application/json': { schema: { type: 'object', properties: { data: { $ref: `#/components/schemas/${componentPrefix}` } } } } },
          },
          404: notFound,
        },
      },
      put: {
        tags: [tag],
        summary: `Actualizar ${singularLabel.toLowerCase()}`,
        parameters: [idParam],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: `#/components/schemas/${componentPrefix}Update` } } },
        },
        responses: {
          200: {
            description: `${singularLabel} actualizado`,
            content: { 'application/json': { schema: { type: 'object', properties: { data: { $ref: `#/components/schemas/${componentPrefix}` } } } } },
          },
          400: badRequest,
          404: notFound,
        },
      },
      delete: {
        tags: [tag],
        summary: `Eliminar ${singularLabel.toLowerCase()}`,
        parameters: [idParam],
        responses: {
          204: { description: `${singularLabel} eliminado` },
          404: notFound,
        },
      },
    },
  };
}

/**
 * Builds a single GET-list path for a read-only view/resource (no id lookup,
 * no POST/PUT/DELETE since there is nothing to write to or a row key to use).
 */
function buildReadOnlyListPath({ resourcePath, tag, componentPrefix, singularLabel, filterParams = [] }) {
  const listParams = [
    { name: 'page', in: 'query', description: 'Numero de pagina (base 1)', schema: { type: 'integer', minimum: 1, default: 1 } },
    { name: 'pageSize', in: 'query', description: 'Cantidad de registros por pagina (1-200)', schema: { type: 'integer', minimum: 1, maximum: 200, default: 25 } },
    { name: 'q', in: 'query', description: 'Busqueda de texto libre', schema: { type: 'string' } },
    ...filterParams,
  ];

  return {
    [`/${resourcePath}`]: {
      get: {
        tags: [tag],
        summary: `Listar ${singularLabel.toLowerCase()}`,
        parameters: listParams,
        responses: {
          200: {
            description: 'Listado paginado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: `#/components/schemas/${componentPrefix}` } },
                    meta: { $ref: '#/components/schemas/PaginationMeta' },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

module.exports = { buildResourcePaths, buildReadOnlyListPath };
