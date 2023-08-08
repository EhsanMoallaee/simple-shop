const { CourseModel } = require("../../models/course.model");

async function checkExistCourse(id) {
    const course = await CourseModel.findById(id);
    return course ? course : {};
}

module.exports = {
    checkExistCourse,
}