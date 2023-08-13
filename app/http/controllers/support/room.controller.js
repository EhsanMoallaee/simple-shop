const createError = require("http-errors");
const Controller = require("../controller");
const { ConversationModel } = require("../../../models/conversation.model");
const { checkExistRoom } = require("./functions/checkExistRoom");

class RoomController extends Controller {
    addRoom = async (req, res, next) => {
        const { name, description, namespace } = req.body;
        const existRoom = await checkExistRoom(name);
        if(existRoom) return next(createError.Conflict('Room with this name is already exist'));
        const roomData = { name, description, image: req?.images[0] };
        const room = await ConversationModel.findOneAndUpdate({endpoint: namespace}, {$push: { rooms: roomData }});
        if(!room) return next(createError.BadRequest('Room creation failed'))
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Room created successfully'
        })
    }

    getAllRooms = async (req, res, next) => {
        const rooms = await ConversationModel.find({}, {rooms: 1}).lean();
        return res.status(200).json({
            statusCode: 200,
            success: true,
            rooms
        })
    }
}

module.exports = {
    RoomController: new RoomController()
}