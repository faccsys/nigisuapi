const { createRepository } = require('../utils/createRepository');
const columns = require('./genperad.columns');

module.exports = createRepository({
  table: 'genperad',
  columns,
  searchColumns: ['perdireccion', 'perreferencia', 'pertelefono', 'percontrato'],
});
