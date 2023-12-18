const { getIO } = require("../sockets/socketServer")



const checkRoom = (req, res) => {
    const io = getIO()
    if(io.sockets.adapter.rooms.get(req.body.roomId)){
        res.send({roomExists: true})
    }
    else{
        res.send({roomExists: false})
    }
}

module.exports = {
    checkRoom
}