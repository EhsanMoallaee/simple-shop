const { CourseModel } = require("../../../../../models/course.model");

async function getOneChapter(chapterId = {}) {
    const chapter = await CourseModel.findOne({ chapters: {$elemMatch: {_id: chapterId}} }, {'chapters.$': 1});
    return chapter? chapter : undefined;
}

module.exports = {
    getOneChapter,
}