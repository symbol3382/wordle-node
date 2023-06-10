const express = require('express');
const guessRoutes = express();
const words = require('../../words/words_dictionary.json');
const {all} = require("express/lib/application");
const {fillNextDaysWords} = require("../services/wordService");
const {checkWord} = require("../controllers/guessController");
const {validateWord} = require("../controllers/validations/wordGuessValidate");


guessRoutes.post('/guess', validateWord, checkWord);

module.exports = guessRoutes;
