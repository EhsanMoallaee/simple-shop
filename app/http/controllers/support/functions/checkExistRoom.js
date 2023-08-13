const { ConversationModel } = require("../../../../models/conversation.model");

async function checkExistRoom(roomName) {
    const existRoom = await ConversationModel.findOne({'rooms.name': roomName});
    return existRoom;
}

module.exports = {
    checkExistRoom
}