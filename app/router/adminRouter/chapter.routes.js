const { Router } = require('express');
const { ChapterController } = require('../../http/controllers/adminControllers/course/chapter.controller');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminChapterRouter = Router();


adminChapterRouter.get('/list/:id', ChapterController.getAllChaptersOfOneCourse);
adminChapterRouter.put(
    '/add',
    checkPermission([PERMISSIONS.CHAPTER.CREATE]),
    ChapterController.addChapter
);
adminChapterRouter.patch(
    '/:chapterId',
    checkPermission([PERMISSIONS.CHAPTER.DELETE]),
    ChapterController.removeChapter
);
adminChapterRouter.patch(
    '/update/:chapterId',
    checkPermission([PERMISSIONS.CHAPTER.UPDATE]),
    ChapterController.updateChapter
);

module.exports = {
    adminChapterRouter,
}