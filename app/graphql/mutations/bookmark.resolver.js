const createError = require("http-errors");
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
const { GraphQLString, GraphQLBoolean } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");

const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { validateObjectId } = require("../utils/validateItemId");

const BookmarkProductResolver = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { productId, like, dislike } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(productId);
        const bookmarkedProduct = await ProductModel.findOne({
            _id: productId,
            bookmarks: user._id
        });
        const updateQuery = bookmarkedProduct ? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};        
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateQuery);
        let message;
        if(!bookmarkedProduct) message = 'Product bookmarked successfully';
        else message = 'Product removed from bookmarked list successfully';
        if(!updatedProduct) throw new createError.BadRequest('Bookmark product operation failed');
        return {
            statusCode: 200,
            success: true,
            message: message || 'You did it before'
        }
    }
}

const BookmarkCourseResolver = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { courseId } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(courseId);
        let bookmarkedCourse = await CourseModel.findOne({
            _id: courseId,
            bookmarks: user._id
        });
        const updateQuery = bookmarkedCourse ? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}}; 
        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, updateQuery);
        let message;
        if(!bookmarkedCourse) message = 'Course bookmarked successfully';
        else message = 'Course removed from bookmarked list successfully';
        if(!updatedCourse) throw new createError.BadRequest('Bookmark course operation failed');
        return {
            statusCode: 200,
            success: true,
            message: message || 'You did it before'
        }
    }
}

const BookmarkBlogResolver = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { blogId, like, dislike } = args;
        const { req } = context;
        const user = await graphqlVerifyAccessToken(req);
        validateObjectId(blogId);
        const bookmarkedBlog = await BlogModel.findOne({
             _id: blogId,
             bookmarks: user._id
        });
        const updateQuery = bookmarkedBlog ? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updateQuery);
        let message;
        if(!bookmarkedBlog) message = 'Blog bookmarked successfully';
        else message = 'Blog removed from bookmarked list successfully';
        if(!updatedBlog) throw new createError.BadRequest('Bookmark blog operation failed');
        return {
            statusCode: 200,
            success: true,
            message: message || 'You did it before'
        }
    }
}

module.exports = {
    BookmarkProductResolver,
    BookmarkCourseResolver,
    BookmarkBlogResolver
}