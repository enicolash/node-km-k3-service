const express = require('express');

const DataAktivitasPekerjaanController = require('../controller/DataAktivitasPekerjaanController.js');

const router = express.Router();

router.get('/',DataAktivitasPekerjaanController.getDataAktivitasPekerjaan);

module.exports = router;