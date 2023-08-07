const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../models/blog.model");
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
        return await BlogModel.find(findQuery).populate([{path: 'author'}, {path: 'category'}]).lean({ virtuals: true });
    }
}

module.exports = {
    BlogResolver
}