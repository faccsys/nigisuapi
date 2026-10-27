const genperColumns = require('../models/genper.columns');
const genpclColumns = require('../models/genpcl.columns');
const { toSwaggerSchema } = require('./schemaFromColumns');
const { buildResourcePaths } = require('./buildResourcePaths');

const genperPaths = buildResourcePaths({
  resourcePath: 'genper',
  tag: 'Genper (Personas)',
  componentPrefix: 'Genper',
  pkName: 'percodigo',
  pkSchema: { type: 'number' },
  singularLabel: 'Persona',
  filterParams: [
    { name: 'percodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de persona' },
    { name: 'pernumid', in: 'query', schema: { type: 'string' }, description: 'Filtrar por numero de identificacion' },
    { name: 'orgcodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de organizacion' },
    { name: 'ciucodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de ciudad' },
    { name: 'perescli', in: 'query', schema: { type: 'boolean' }, description: 'Filtrar personas que son cliente' },
    { name: 'perespro', in: 'query', schema: { type: 'boolean' }, description: 'Filtrar personas que son proveedor' },
    { name: 'peresemp', in: 'query', schema: { type: 'boolean' }, description: 'Filtrar personas que son empleado' },
  ],
});

const genpclPaths = buildResourcePaths({
  resourcePath: 'genpcl',
  tag: 'Genpcl (Clientes)',
  componentPrefix: 'Genpcl',
  pkName: 'percodigo',
  pkSchema: { type: 'number' },
  singularLabel: 'Cliente',
  filterParams: [
    { name: 'percodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de persona/cliente' },
    { name: 'zoncodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de zona' },
    { name: 'pvecodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de vendedor' },
    { name: 'pclsuspendido', in: 'query', schema: { type: 'boolean' }, description: 'Filtrar por clientes suspendidos' },
    { name: 'esccodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de escala' },
  ],
});

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Nigisu API',
    version: '1.0.0',
    description:
      'API REST sobre la base de datos de Nigisu (SQL Anywhere, DSN "sql tvnet"). ' +
      'Primeras entidades expuestas: genper00 (Personas) y genpcl00 (Clientes, ' +
      'extension 1 a 1 de una persona via percodigo).',
  },
  servers: [{ url: '/api/v1', description: 'Servidor local' }],
  tags: [{ name: 'Genper (Personas)' }, { name: 'Genpcl (Clientes)' }],
  paths: {
    ...genperPaths,
    ...genpclPaths,
  },
  components: {
    schemas: {
      Genper: toSwaggerSchema(genperColumns, { mode: 'read' }),
      GenperInput: toSwaggerSchema(genperColumns, { mode: 'create' }),
      GenperUpdate: toSwaggerSchema(genperColumns, { mode: 'update' }),
      Genpcl: toSwaggerSchema(genpclColumns, { mode: 'read' }),
      GenpclInput: toSwaggerSchema(genpclColumns, { mode: 'create' }),
      GenpclUpdate: toSwaggerSchema(genpclColumns, { mode: 'update' }),
      PaginationMeta: {
        type: 'object',
        properties: {
          page: { type: 'integer' },
          pageSize: { type: 'integer' },
          total: { type: 'integer' },
          totalPages: { type: 'integer' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          details: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};
