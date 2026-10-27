const { createRepository } = require('../utils/createRepository');
const columns = require('./genpcl.columns');

module.exports = createRepository({
  table: 'genpcl00',
  columns,
  searchColumns: ['pclcontacto', 'pcltelefono', 'usuario'],
});
