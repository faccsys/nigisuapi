const { createRepository } = require('../utils/createRepository');
const columns = require('./genpclplan.columns');

module.exports = createRepository({
  table: 'genpclplan',
  columns,
  searchColumns: ['pclplanobserv'],
});
