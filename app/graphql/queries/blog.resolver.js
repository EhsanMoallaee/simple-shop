const { BlogModel } = require("../../models/blog.model");
const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        await graphqlVerifyAccessToken(req);
        const { category } = args;
        const findQuery = category ? { category } : {};
        return await BlogModel.find(findQuery).populate([
            {path: 'author'},
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
    BlogResolver
}