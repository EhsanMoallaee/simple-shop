const { GraphQLString, GraphQLBoolean } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { objectIDValidator } = require("../../http/validators/publicValidators/objectID.validator");
const { checkExistProduct } = require("../utils/checkExistProduct");
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { ProductModel } = require("../../models/product.model");
const createError = require("http-errors");
const { CourseModel } = require("../../models/course.model");
const { BlogModel } = require("../../models/blog.model");

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
        await graphqlVerifyAccessToken(req);
        const user = req.user;
        const { error } = objectIDValidator({id: productId});
        if(error) {
            return new createError.BadRequest(error.message);
        }
        let product = await ProductModel.findOne({
             _id: productId,
             $or: [
                { likes: { $elemMatch: { userId: user._id } } },
                { dislikes: { $elemMatch: { userId: user._id } } }
            ] 
        });
        let updateQuery;
        let message;
        const isAlreadyLiked = product?.likes.some( like => like.userId.equals(user._id) );
        const isAlreadyDisliked = product?.dislikes.some( dislike => dislike.userId.equals(user._id) );
        if(!product && !like && !dislike) {
            return new createError.BadRequest('Like or Dislike state is required');
        } else if( product && !like && !dislike && isAlreadyLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}} };
            message = 'Product\'s like removed successfully';
        } else if( product && !like && dislike && isAlreadyLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}}, $push: {dislikes: {userId: user._id}} };
            message = 'Product\'s like removed and dislike added successfully';
        } else if( product && !like && !dislike && isAlreadyDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id }} };
            message = 'Product\'s dislike removed successfully';
        } else if( product && like && !dislike && isAlreadyDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id}}, $push: {likes: {userId: user._id}} };
            message = 'Product\'s dislike removed and like added successfully';
        } else if(!product && like) {
            updateQuery = { $push: {likes: {userId: user._id}} };
            message = 'Product liked successfully';
        } else if(!product && dislike) {
            updateQuery = { $push: {dislikes: {userId: user._id}} };
            message = 'Product disliked successfully';
        }
        
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
        await graphqlVerifyAccessToken(req);
        const user = req.user;
        const { error } = objectIDValidator({id: courseId});
        if(error) {
            return new createError.BadRequest(error.message);
        }
        let course = await CourseModel.findOne({
             _id: courseId,
             $or: [
                { likes: { $elemMatch: { userId: user._id } } },
                { dislikes: { $elemMatch: { userId: user._id } } }
            ] 
        });
        let updateQuery;
        let message;
        const isAlreadyLiked = course?.likes.some( like => like.userId.equals(user._id) );
        const isAlreadyDisliked = course?.dislikes.some( dislike => dislike.userId.equals(user._id) );
        if(!course && !like && !dislike) {
            return new createError.BadRequest('Like or Dislike state is required');
        } else if( course && !like && !dislike && isAlreadyLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}} };
            message = 'Course\'s like removed successfully';
        } else if( course && !like && dislike && isAlreadyLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}}, $push: {dislikes: {userId: user._id}} };
            message = 'Course\'s like removed and dislike added successfully';
        } else if( course && !like && !dislike && isAlreadyDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id }} };
            message = 'Course\'s dislike removed successfully';
        } else if( course && like && !dislike && isAlreadyDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id}}, $push: {likes: {userId: user._id}} };
            message = 'Course\'s dislike removed and like added successfully';
        } else if(!course && like) {
            updateQuery = { $push: {likes: {userId: user._id}} };
            message = 'Course liked successfully';
        } else if(!course && dislike) {
            updateQuery = { $push: {dislikes: {userId: user._id}} };
            message = 'Course disliked successfully';
        }
        
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
        await graphqlVerifyAccessToken(req);
        const user = req.user;
        const { error } = objectIDValidator({id: blogId});
        if(error) {
            return new createError.BadRequest(error.message);
        }
        let blog = await BlogModel.findOne({
             _id: blogId,
             $or: [
                { likes: { $elemMatch: { userId: user._id } } },
                { dislikes: { $elemMatch: { userId: user._id } } }
            ] 
        });
        let updateQuery;
        let message;
        const isAlreadyLiked = blog?.likes.some( like => like.userId.equals(user._id) );
        const isAlreadyDisliked = blog?.dislikes.some( dislike => dislike.userId.equals(user._id) );
        if(!blog && !like && !dislike) {
            return new createError.BadRequest('Like or Dislike state is required');
        } else if( blog && !like && !dislike && isAlreadyLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}} };
            message = 'Blog\'s like removed successfully';
        } else if( blog && !like && dislike && isAlreadyLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}}, $push: {dislikes: {userId: user._id}} };
            message = 'Blog\'s like removed and dislike added successfully';
        } else if( blog && !like && !dislike && isAlreadyDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id }} };
            message = 'Blog\'s dislike removed successfully';
        } else if( blog && like && !dislike && isAlreadyDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id}}, $push: {likes: {userId: user._id}} };
            message = 'Blog\'s dislike removed and like added successfully';
        } else if(!blog && like) {
            updateQuery = { $push: {likes: {userId: user._id}} };
            message = 'Blog liked successfully';
        } else if(!blog && dislike) {
            updateQuery = { $push: {dislikes: {userId: user._id}} };
            message = 'Blog disliked successfully';
        }
        
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