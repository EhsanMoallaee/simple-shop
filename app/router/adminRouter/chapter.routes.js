const { Router } = require('express');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { ChapterController } = require('../../http/controllers/adminControllers/course/chapter.controller');
const adminChapterRouter = Router();


adminChapterRouter.put('/add', ChapterController.addChapter);

module.exports = {
    adminChapterRouter,
}