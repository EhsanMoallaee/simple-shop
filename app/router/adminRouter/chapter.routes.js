const { Router } = require('express');
const { ChapterController } = require('../../http/controllers/adminControllers/course/chapter.controller');
const adminChapterRouter = Router();


adminChapterRouter.put('/add', ChapterController.addChapter);
adminChapterRouter.get('/list/:id', ChapterController.getAllChaptersOfOneCourse);
adminChapterRouter.patch('/:chapterId', ChapterController.removeChapter);
adminChapterRouter.patch('/update/:chapterId', ChapterController.updateChapter);

module.exports = {
    adminChapterRouter,
}