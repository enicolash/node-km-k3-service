const express = require('express');

const matriksProgramController = require('../controller/MatriksProgramController.js');

const router = express.Router();

router.post('/',matriksProgramController.getDataMatriksProgram);

module.exports = router;