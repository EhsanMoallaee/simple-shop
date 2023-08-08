const createError = require("http-errors");
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");

const { checkExistBlog } = require("../utils/checkExistBlog");
const { checkExistCourse } = require("../utils/checkExistCourse");
const { checkExistProduct } = require("../utils/checkExistProduct");
const { getComments } = require("../utils/getComments");
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { validateObjectId } = require("../utils/validateItemId");

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
        const user = await graphqlVerifyAccessToken(req);
        const blogExist = await checkExistBlog(blogId);
        if(!blogExist) throw new createError.NotFound('Blog not found');
        let parentComment;
        if(parent) {
            validateObjectId(parent);
            const commentExist = await getComments(BlogModel, parent);
            if(!commentExist || commentExist.length == 0) return new createError.NotFound('Comment not found');
            if(!commentExist.comments?.[0].open_toReply) return new createError.Forbidden('Replying to this comment is not allowed');
            parentComment = commentExist.comments?.[0];
        }
        const commentData = {
            user: user._id,
            comment: comment,
            parent: parent ? parent : null,
            open_toReply: !parent
        }
        const searchQuery = parentComment ? {_id: blogId, 'comments._id': parentComment._id } : {_id: blogId};
        const updateQuery = parentComment ? { $push: { 'comments.$.answers' : commentData }} : { $push: { 'comments' : commentData }};
        const updatedBlog = await BlogModel.findOneAndUpdate(searchQuery, updateQuery, {new: true});
        if(!updatedBlog) throw new createError.NotFound('Blog not found');
        return {
            statusCode: 200,
            success: true,
            message: 'Comment added to blog successfully'
        }
    }
}

const CreateCommentForCourseResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        courseId: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async(_, args, context) => {
        const { comment, courseId, parent } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        const courseExist = await checkExistCourse(courseId);
        if(!courseExist) throw new createError.NotFound('Course not found');
        let parentComment;
        if(parent) {
            validateObjectId(parent);
            const commentExist = await getComments(CourseModel, parent);
            if(!commentExist || commentExist.length == 0) return new createError.NotFound('Comment not found');
            if(!commentExist.comments?.[0].open_toReply) return new createError.Forbidden('Replying to this comment is not allowed');
            parentComment = commentExist.comments?.[0];
        }
        const commentData = {
            user: user._id,
            comment: comment,
            parent: parent ? parent : null,
            open_toReply: !parent
        }
        const searchQuery = parentComment ? {_id: courseId, 'comments._id': parentComment._id } : {_id: courseId};
        const updateQuery = parentComment ? { $push: { 'comments.$.answers' : commentData }} : { $push: { 'comments' : commentData }};
        const updatedCourse = await CourseModel.findOneAndUpdate(searchQuery, updateQuery, {new: true});
        if(!updatedCourse) throw new createError.NotFound('Course not found');
        return {
            statusCode: 200,
            success: true,
            message: 'Comment added to course successfully'
        }
    }
}

const CreateCommentForProductResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        productId: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async(_, args, context) => {
        const { comment, productId, parent } = args;
        const { req } = context;

        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(productId);
        const productExist = await checkExistProduct(productId);
        if(!productExist) throw new createError.NotFound('Product not found');

        let parentComment;
        if(parent) {
            validateObjectId(parent);
            const commentExist = await getComments(ProductModel, parent);
            if(!commentExist || commentExist.length == 0) return new createError.NotFound('Comment not found');
            if(!commentExist.comments?.[0].open_toReply) return new createError.Forbidden('Replying to this comment is not allowed');
            parentComment = commentExist.comments?.[0];
        }
        const commentData = {
            user: user._id,
            comment: comment,
            parent: parent ? parent : null,
            open_toReply: !parent
        }
        const searchQuery = parentComment ? {_id: productId, 'comments._id': parentComment._id } : {_id: productId};
        const updateQuery = parentComment ? { $push: { 'comments.$.answers' : commentData }} : { $push: { 'comments' : commentData }};
        const updatedProduct = await ProductModel.findOneAndUpdate(searchQuery, updateQuery, {new: true});
        if(!updatedProduct) throw new createError.NotFound('Product not found');
        return {
            statusCode: 200,
            success: true,
            message: 'Comment added to product successfully'
        }
    }
}

module.exports = {
    CreateCommentForBlogResolver,
    CreateCommentForCourseResolver,
    CreateCommentForProductResolver
}