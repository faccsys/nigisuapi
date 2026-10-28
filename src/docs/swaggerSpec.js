const genperColumns = require('../models/genper.columns');
const genpclColumns = require('../models/genpcl.columns');
const genperadColumns = require('../models/genperad.columns');
const genpclplanColumns = require('../models/genpclplan.columns');
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

const genperadPaths = buildResourcePaths({
  resourcePath: 'genperad',
  tag: 'Genperad (Direcciones)',
  componentPrefix: 'Genperad',
  pkName: 'addcodigo',
  pkSchema: { type: 'number' },
  singularLabel: 'Direccion',
  filterParams: [
    { name: 'percodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de persona' },
    { name: 'addcodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de direccion' },
    { name: 'tdicodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por tipo de direccion/instalacion' },
    { name: 'perestatus', in: 'query', schema: { type: 'boolean' }, description: 'Filtrar por direcciones activas' },
    { name: 'zoncodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de zona' },
  ],
});

const genpclplanPaths = buildResourcePaths({
  resourcePath: 'genpclplan',
  tag: 'Genpclplan (Planes de cliente)',
  componentPrefix: 'Genpclplan',
  pkName: 'pvlplannumtrx',
  pkSchema: { type: 'number' },
  singularLabel: 'Plan de cliente',
  filterParams: [
    { name: 'percodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de cliente' },
    { name: 'artcodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de articulo/plan' },
    { name: 'addcodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por codigo de direccion' },
    { name: 'tdocodigo', in: 'query', schema: { type: 'number' }, description: 'Filtrar por tipo de documento' },
  ],
});

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Nigisu API',
    version: '1.0.0',
    description:
      'API REST sobre la base de datos de Nigisu (SQL Anywhere, DSN "sql tvnet"). ' +
      'Entidades expuestas: genper00 (Personas), genpcl00 (Clientes, extension 1 a 1 ' +
      'de una persona via percodigo), genperad (Direcciones/instalaciones de una ' +
      'persona) y genpclplan (Planes contratados por un cliente).',
  },
  servers: [{ url: '/api/v1', description: 'Servidor local' }],
  tags: [
    { name: 'Genper (Personas)' },
    { name: 'Genpcl (Clientes)' },
    { name: 'Genperad (Direcciones)' },
    { name: 'Genpclplan (Planes de cliente)' },
  ],
  paths: {
    ...genperPaths,
    ...genpclPaths,
    ...genperadPaths,
    ...genpclplanPaths,
  },
  components: {
    schemas: {
      Genper: toSwaggerSchema(genperColumns, { mode: 'read' }),
      GenperInput: toSwaggerSchema(genperColumns, { mode: 'create' }),
      GenperUpdate: toSwaggerSchema(genperColumns, { mode: 'update' }),
      Genpcl: toSwaggerSchema(genpclColumns, { mode: 'read' }),
      GenpclInput: toSwaggerSchema(genpclColumns, { mode: 'create' }),
      GenpclUpdate: toSwaggerSchema(genpclColumns, { mode: 'update' }),
      Genperad: toSwaggerSchema(genperadColumns, { mode: 'read' }),
      GenperadInput: toSwaggerSchema(genperadColumns, { mode: 'create' }),
      GenperadUpdate: toSwaggerSchema(genperadColumns, { mode: 'update' }),
      Genpclplan: toSwaggerSchema(genpclplanColumns, { mode: 'read' }),
      GenpclplanInput: toSwaggerSchema(genpclplanColumns, { mode: 'create' }),
      GenpclplanUpdate: toSwaggerSchema(genpclplanColumns, { mode: 'update' }),
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
