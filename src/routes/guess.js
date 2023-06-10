const express = require('express');
const guessRoutes = express();
const {checkWord} = require("../controllers/guessController");
const {validateWord} = require("../controllers/validations/wordGuessValidate");


guessRoutes.post('/guess', validateWord, checkWord);

module.exports = guessRoutes;
