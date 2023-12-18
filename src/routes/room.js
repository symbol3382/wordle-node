const express = require('express');
const { checkRoom } = require('../controllers/roomController');
const roomRoutes = express();


roomRoutes.post('/room/checkIfRoomExists', checkRoom)


module.exports = roomRoutes;