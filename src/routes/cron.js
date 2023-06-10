const express = require('express');
const cronRoutes = express();
const {fillNextDaysWords} = require("../services/wordService");

cronRoutes.post('/cron/word-of-days', () => fillNextDaysWords());

module.exports = cronRoutes;
