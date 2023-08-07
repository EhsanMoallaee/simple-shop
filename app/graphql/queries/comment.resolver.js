const createError = require("http-errors");
const { BlogModel } = require("../../models/blog.model");
const { checkExistBlog } = require("../utils/checkExistBlog");
const { getComments } = require("../utils/getComments");
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { objectIDValidator } = require("../../http/validators/publicValidators/objectID.validator");
const { ResponseType } = require("../typeDefs/public.types");
const { GraphQLString } = require("graphql");

const CreateCommentForBlogResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async(_, args, context) => {
        const { comment, blogId, parent } = args;
        const { req } = context;
        await graphqlVerifyAccessToken(req);
        const blogExist = checkExistBlog(blogId);
        if(!blogExist) throw new createError.NotFound('Blog not found');
        if(parent) {
            const { error } = objectIDValidator({id: parent});
            if(error) {
                return new createError.BadRequest(error.message);
            }
            const commentExist = await getComments(BlogModel, parent);
            if(!commentExist || commentExist.length == 0) return new createError.NotFound('Comment not found');
            if(!commentExist.comments?.[0].open_toReply) return new createError.Forbidden('Replying to this comment is not allowed');
        }
        const commentData = {
            user: req.user._id,
            comment: comment,
            parent: parent ? parent : null,
            open_toReply: !parent
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { $push: { comments : commentData }}, {new: true});
        if(!updatedBlog) throw new createError.NotFound('Blog not found');
        return {
            statusCode: 200,
            success: true,
            message: 'Comment added to blog successfully'
        }
    }
}

module.exports = {
    CreateCommentForBlogResolver,
}