const createError = require("http-errors");
const Controller = require("../controller");
const { ConversationModel } = require("../../../models/conversation.model");
const { checkExistNamespaceEndpoint } = require("./functions/checkExistNamespaceEndpoint");

class NamespaceController extends Controller {
    
    addNamespace = async (req, res, next) => {
        const { title, endpoint } = req.body;
        const existEndpoint = await checkExistNamespaceEndpoint(endpoint);
        if(existEndpoint) return next(createError.Conflict('Conversation with this endpoint is already exist'));
        const conversation = await ConversationModel.create({ title, endpoint });
        if(!conversation) return next(createError.InternalServerError('Internal server error occured'))
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Conversation created successfully'
        })
    }

    getAllNamespaces = async (req, res, next) => {
        const namespaces = await ConversationModel.find({}, {rooms: 0}).lean();
        if(!namespaces || namespaces.length == 0) return next(createError.NotFound('Namespaces not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            namespaces
        })
    }
}

module.exports = {
    NamespaceController: new NamespaceController()
}