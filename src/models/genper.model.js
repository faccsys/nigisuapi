const { createRepository } = require('../utils/createRepository');
const columns = require('./genper.columns');

const repository = createRepository({
  table: 'genper00',
  columns,
  searchColumns: ['pernombre', 'perapellido', 'pernumid', 'peralias', 'peremail'],
});

// Valores por defecto que la aplicacion PowerBuilder original asigna cuando
// estas columnas no se indican (la base de datos no tiene DEFAULT para ellas).
const APP_DEFAULTS = {
  ciucodigo: 1,
  destpodoc: 11,
  destpoper: 9,
  desdndemail: 33,
  titcodigo: 0,
  orgcodigo: 0,
};

function withAppDefaults(data) {
  return { ...APP_DEFAULTS, ...data };
}

module.exports = {
  ...repository,
  create: (data) => repository.create(withAppDefaults(data)),
};
