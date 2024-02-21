const express = require('express');
const adminRoutes = express();
const {checkWord} = require("../controllers/guessController");
const {validateWord} = require("../controllers/validations/wordGuessValidate");
const { getStatistics } = require('../controllers/adminController');


adminRoutes.get('/statistics', getStatistics);

module.exports = adminRoutes;
