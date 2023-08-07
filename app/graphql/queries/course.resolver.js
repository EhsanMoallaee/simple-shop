const { GraphQLList, GraphQLString } = require("graphql");
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { CourseType } = require("../typeDefs/course.type");
const { CourseModel } = require("../../models/course.model");

const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async( _, args) => {
        const { category } = args;
        const findQuery = category ? { category } : {};
        return await CourseModel.find(findQuery).populate([{path: 'teacher'}, {path: 'category'}]).lean({ virtuals: true });
    }
}

module.exports = {
    CourseResolver
}