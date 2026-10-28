const express = require('express');
const genperRoutes = require('./genper.routes');
const genpclRoutes = require('./genpcl.routes');
const genperadRoutes = require('./genperad.routes');
const genpclplanRoutes = require('./genpclplan.routes');

const router = express.Router();

router.use('/genper', genperRoutes);
router.use('/genpcl', genpclRoutes);
router.use('/genperad', genperadRoutes);
router.use('/genpclplan', genpclplanRoutes);

module.exports = router;
