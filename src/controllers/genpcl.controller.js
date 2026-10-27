const { createController } = require('./createController');
const genpclModel = require('../models/genpcl.model');

module.exports = createController(genpclModel, {
  filterKeys: ['percodigo', 'zoncodigo', 'pvecodigo', 'pclsuspendido', 'esccodigo'],
});
