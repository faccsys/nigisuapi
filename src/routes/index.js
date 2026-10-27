const express = require('express');
const genperRoutes = require('./genper.routes');
const genpclRoutes = require('./genpcl.routes');

const router = express.Router();

router.use('/genper', genperRoutes);
router.use('/genpcl', genpclRoutes);

module.exports = router;
