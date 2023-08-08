const { GraphQLString, GraphQLBoolean } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { objectIDValidator } = require("../../http/validators/publicValidators/objectID.validator");
const { checkExistProduct } = require("../utils/checkExistProduct");
const { graphqlVerifyAccessToken } = require("../../http/middlewares/login.middleware");
const { ProductModel } = require("../../models/product.model");
const createError = require("http-errors");

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
        const isLiked = product?.likes.some( like => like.userId.equals(user._id) );
        const isDisliked = product?.dislikes.some( dislike => dislike.userId.equals(user._id) );
        if(!product && !like && !dislike) {
            return new createError.BadRequest('Like or Dislike state is required');
        } else if( product && !like && !dislike && isLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}} };
            message = 'Product\'s like removed successfully';
        } else if( product && !like && dislike && isLiked ) {
            updateQuery = { $pull: {likes: {userId: user._id}}, $push: {dislikes: {userId: user._id}} };
            message = 'Product\'s like removed and dislike added successfully';
        } else if( product && !like && !dislike && isDisliked ) {
            updateQuery = { $pull: {dislikes: {userId: user._id }} };
            message = 'Product\'s dislike removed successfully';
        } else if( product && like && !dislike && isDisliked ) {
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

module.exports = {
    LikeAndDislikeProductResolver,
}