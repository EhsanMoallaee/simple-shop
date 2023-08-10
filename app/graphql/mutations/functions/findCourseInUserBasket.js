const { UserModel } = require("../../../models/user.model");
const { deepCopyOfAnObject } = require("../../../utils/deepCopyOfAnObject");

async function findCourseInUserBasket(userId, courseId) {
    const userCoursesBasket = await UserModel.findOne({_id: userId, 'basket.courses.courseId': courseId}, {'basket.courses.$': 1});
    const coursesBasket = deepCopyOfAnObject(userCoursesBasket);
    return coursesBasket?.basket?.courses?.[0];
}

module.exports = {
    findCourseInUserBasket,
}