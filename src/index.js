require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const guessRoutes = require('./routes/guess');
const cronRoutes = require('./routes/cron');
const roomRoutes = require('./routes/room')
const mysql = require("./config/db");
const cors = require('cors');
const { initializeSocket } = require('./sockets/socketServer')
const { createServer } = require('http');
const handleSocketConnection = require('./sockets/socketHandler');
const { fillNextDaysWords } = require('./services/cronServices/wordCronService');


const app = express();
const httpServer = createServer(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(guessRoutes);
app.use(cronRoutes);
app.use(roomRoutes)
mysql.init();
const io = initializeSocket(httpServer);

io.on('connection', (socket) => {
  const username = socket.handshake.headers.username;
  const roomName = socket.handshake.headers.roomname
  handleSocketConnection(socket);

  socket.on('wordle-input', (args) => {
socket.to(roomName).emit('wordle-input', args);
  });

  socket.on('wordle-chat', (args) => {
    console.log('sending msg', args)
    socket.to(roomName).emit('wordle-chat', {chat: args, username: username})
    console.log('message sent successfully')
  } )
});


fillNextDaysWords()

const hostname = process.env.NODE_HOSTNAME;
if (hostname) {
    httpServer.listen(process.env.APP_PORT, hostname, () => {
        console.log('APP Started on ', process.env.APP_PORT, hostname);
    })
} else {
    httpServer.listen(process.env.APP_PORT, () => {
        console.log('APP Started on ', process.env.APP_PORT);
    })
}
