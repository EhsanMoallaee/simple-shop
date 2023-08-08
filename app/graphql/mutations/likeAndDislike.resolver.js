const createError = require("http-errors");
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
const { GraphQLString, GraphQLBoolean } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");

const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { likeDislikeUpdateQuery } = require("./functions/likeDislikeUpdateQuery");
const { validateObjectId } = require("./functions/validateItemId");

const LikeAndDislikeProductResolver = {
    type: ResponseType,
    args: {
        like: { type: GraphQLBoolean},
        dislike: { type: GraphQLBoolean},
        productId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { productId, like, dislike } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(productId);
        let product = await ProductModel.findOne({
             _id: productId,
             $or: [
                { likes: user._id },
                { dislikes: user._id }
            ] 
        });
        const {updateQuery, message} = likeDislikeUpdateQuery('product', product, like, dislike, user._id);        
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateQuery);
        if(!updatedProduct) throw new createError.BadRequest('Like or Dislike operation failed');
        return {
            statusCode: 200,
            success: true,
            message: message || 'You did it before'
        }
    }
}

const LikeAndDislikeCourseResolver = {
    type: ResponseType,
    args: {
        like: { type: GraphQLBoolean},
        dislike: { type: GraphQLBoolean},
        courseId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { courseId, like, dislike } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(courseId);
        let course = await CourseModel.findOne({
             _id: courseId,
             $or: [
                { likes: user._id },
                { dislikes: user._id }
            ] 
        });
        const {updateQuery, message} = likeDislikeUpdateQuery('course', course, like, dislike, user._id);
        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, updateQuery);
        if(!updatedCourse) throw new createError.BadRequest('Like or Dislike operation failed');
        return {
            statusCode: 200,
            success: true,
            message: message || 'You did it before'
        }
    }
}

const LikeAndDislikeBlogResolver = {
    type: ResponseType,
    args: {
        like: { type: GraphQLBoolean},
        dislike: { type: GraphQLBoolean},
        blogId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { blogId, like, dislike } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(blogId);
        let blog = await BlogModel.findOne({
             _id: blogId,
             $or: [
                { likes: user._id },
                { dislikes: user._id }
            ] 
        });
        const {updateQuery, message} = likeDislikeUpdateQuery('blog', blog, like, dislike, user._id);
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updateQuery);
        if(!updatedBlog) throw new createError.BadRequest('Like or Dislike operation failed');
        return {
            statusCode: 200,
            success: true,
            message: message || 'You did it before'
        }
    }
}

module.exports = {
    LikeAndDislikeProductResolver,
    LikeAndDislikeCourseResolver,
    LikeAndDislikeBlogResolver
}