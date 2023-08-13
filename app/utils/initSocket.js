const socketIO = require('socket.io');
function initSocket(httpServer) {
    const BASE_URL = process.env.BASE_URL;
    const PORT = process.env.PORT;
    const io = socketIO(httpServer, {
        cors: {
            origin: `${BASE_URL}:${PORT}`
        }
    });
    return io;
}

module.exports = {
    initSocket
}