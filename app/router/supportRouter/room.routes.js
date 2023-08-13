const { Router } = require('express');
const {RoomController} = require('../../http/controllers/support/room.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const roomRouter = Router();

roomRouter.post("/add", imageUploader.single('image'), RoomController.addRoom);
roomRouter.get("/list", RoomController.getAllRooms);

module.exports = {
    roomRouter
}