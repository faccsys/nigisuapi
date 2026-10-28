const { createController } = require('./createController');
const genperadModel = require('../models/genperad.model');

module.exports = createController(genperadModel, {
  filterKeys: ['percodigo', 'addcodigo', 'tdicodigo', 'perestatus', 'zoncodigo'],
});
