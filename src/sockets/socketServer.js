const socketIO = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: '*'
    }
  });

  return io;
}

function getIO() {
  return io;
}

module.exports = {
  initializeSocket,
  getIO
};

