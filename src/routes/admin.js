const express = require('express');
const adminRoutes = express();
const {checkWord} = require("../controllers/guessController");
const {validateWord} = require("../controllers/validations/wordGuessValidate");
const { getStatistics, adminSyncWords } = require('../controllers/adminController');


adminRoutes.get('/statistics', getStatistics);
adminRoutes.post('/sync-word', adminSyncWords);

module.exports = adminRoutes;
