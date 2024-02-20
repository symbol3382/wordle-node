const express = require('express');
const { syncWords } = require('../services/cronServices/wordCronService');
const cronRoutes = express();

cronRoutes.get('/cron/word-of-days', async (req, res) => {
    return res.send({res: await syncWords(30)});
});

module.exports = cronRoutes;
