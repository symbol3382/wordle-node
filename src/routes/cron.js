const express = require('express');
const {fillNextDaysWords} = require("../services/cronServices/wordCronService");
const cronRoutes = express();

cronRoutes.post('/cron/word-of-days', () => fillNextDaysWords());

module.exports = cronRoutes;
