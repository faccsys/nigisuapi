const { createController } = require('./createController');
const genperModel = require('../models/genper.model');

module.exports = createController(genperModel, {
  filterKeys: ['percodigo', 'pernumid', 'orgcodigo', 'ciucodigo', 'perescli', 'perespro', 'peresemp'],
});
