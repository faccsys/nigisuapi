const { createController } = require('./createController');
const genpclplanModel = require('../models/genpclplan.model');

module.exports = createController(genpclplanModel, {
  filterKeys: ['percodigo', 'artcodigo', 'addcodigo', 'tdocodigo'],
});
