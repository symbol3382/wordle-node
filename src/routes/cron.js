const express = require('express');
const {fillNextDaysWords} = require("../services/cronServices/wordCronService");
const cronRoutes = express();

cronRoutes.get('/cron/word-of-days', async (req, res) => {
        await fillNextDaysWords()
        return res.json({
            status: true
        })
    }
);

module.exports = cronRoutes;
