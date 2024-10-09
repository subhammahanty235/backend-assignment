const express = require('express');
const { fetchSingleCoin, findDeviation } = require('../controller/coinController');
const router = express.Router();

//api request structure example : /stats?coin=bitcoin
router.get('/stats' , fetchSingleCoin);
router.get('/deviation' , findDeviation)

module.exports = router;