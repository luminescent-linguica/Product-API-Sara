const express = require('express');
const postgresqlController = require('../controllers/postgresqlController');

const router = express.Router();

router.get('/data', postgresqlController.get);

module.exports = router;