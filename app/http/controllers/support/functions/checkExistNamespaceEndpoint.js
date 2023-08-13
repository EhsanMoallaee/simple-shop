const { ConversationModel } = require("../../../../models/conversation.model");

async function checkExistNamespaceEndpoint(endpoint) {
    const existEndpoint = await ConversationModel.findOne({endpoint});
    return existEndpoint;
}

module.exports = {
    checkExistNamespaceEndpoint
}