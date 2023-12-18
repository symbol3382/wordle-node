
// socketHandlers.js

function handleSocketConnection(socket) {
    const username = socket.handshake.headers.username;
    const roomName = socket.handshake.headers.roomname
    console.log(username + ' will join in ' + roomName)
    console.log(socket.adapter.rooms.get(roomName))
    // if(socket.adapter.rooms[roomName]?.indexOf(socket.id) <= 0){
      socket.join(roomName);
    // }
  
    // socket.on('wordle-input', (args) => {
    //   socket.to(roomName).emit('wordle-input', args);
    // });

    // socket.on('wordle-chat', (args) => {
    //   console.log('sending msg', args)
    //   socket.to(roomName).emit('wordle-chat', {chat: args, username: username})
    // } )

    // socket.off('wordle-chat')

  }



  
  module.exports = handleSocketConnection;
  