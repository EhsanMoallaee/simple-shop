const { CourseModel } = require("../../models/course.model");
const { GraphQLList, GraphQLString } = require("graphql");
const { CourseType } = require("../typeDefs/course.type");

const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async( _, args) => {
        const { category } = args;
        const findQuery = category ? { category } : {};
        return await CourseModel.find(findQuery).populate([
            {path: 'teacher'},
            {path: 'category'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
        ]).lean({ virtuals: true });
    }
}

module.exports = {
    CourseResolver
}