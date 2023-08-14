const { ConversationModel } = require("../models/conversation.model");

module.exports = class NamespaceSocketHandler {
    #io
    constructor(io) {
        this.#io = io;
    }
    initConnection() {
        this.#io.on('connection', async (socket) => {
            const namespaces = await ConversationModel.find({}, {title: 1, endpoint: 1}).lean().sort({_id: -1});
            socket.emit('namespacesList', namespaces)
        })
    }
    
    async getOnlineUsersCount(endpoint, roomName) {
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets();
        this.#io.of(`/${endpoint}`).in(roomName).emit('onlineUsersCount', Array.from(onlineUsers).length)
    }

    async createNamespacesConnection() {
        const namespaces = await ConversationModel.find({}, {title: 1, endpoint: 1, rooms: 1}).sort({_id: -1});
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on('connection', async (socket) => {
                const conversation = await ConversationModel.findOne({endpoint: namespace.endpoint}, {rooms: 1}).sort({_id: -1});
                socket.emit('roomList', conversation.rooms);
                socket.on('joinRoom', async (roomName) => {
                    const lastRoom = Array.from(socket.rooms)[1];
                    if(lastRoom) { 
                        socket.leave(lastRoom);
                        await this.getOnlineUsersCount(namespace.endpoint, roomName);
                    }
                    socket.join(roomName);
                    await this.getOnlineUsersCount(namespace.endpoint, roomName);
                    const roomInfo = conversation.rooms.find(item => item.name === roomName);
                    socket.emit('roomInfo', roomInfo);
                    socket.on('disconnect', async () => {
                        await this.getOnlineUsersCount(namespace.endpoint, roomName);
                    })
                })
            })            
        }
    }

}