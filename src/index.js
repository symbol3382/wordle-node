require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const guessRoutes = require('./routes/guess');
const cronRoutes = require('./routes/cron');
const mysql = require("./config/db");
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(guessRoutes);
app.use(cronRoutes);
mysql.init();

const hostname = process.env.NODE_HOSTNAME;
if (hostname) {
    app.listen(process.env.APP_PORT, hostname, () => {
        console.log('APP Started on ', process.env.APP_PORT, hostname);
    })
} else {
    app.listen(process.env.APP_PORT, () => {
        console.log('APP Started on ', process.env.APP_PORT);
    })
}
