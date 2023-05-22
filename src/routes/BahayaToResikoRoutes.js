const express = require('express');

const bahayaToResikoController = require('../controller/BahayaToResikoController.js');

const router = express.Router();

router.post('/',bahayaToResikoController.mapsBahayaToPenyebab);

module.exports = router;