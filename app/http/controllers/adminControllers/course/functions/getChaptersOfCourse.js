const { CourseModel } = require("../../../../../models/course.model");

async function getChaptersOfCourse(courseId = {}) {
    const chapters = await CourseModel.findById(courseId, { chapters: 1, title: 1, _id: 1 });
    return chapters? chapters : undefined;
}

module.exports = {
    getChaptersOfCourse,
}