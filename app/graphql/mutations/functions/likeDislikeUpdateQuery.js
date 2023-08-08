const createError = require("http-errors");

function likeDislikeUpdateQuery(modelName, item, like, dislike, userId) {
    let updateQuery;
    let message;
    const isAlreadyLiked = item?.likes?.some( like => like.equals(userId) );
    const isAlreadyDisliked = item?.dislikes?.some( dislike => dislike.equals(userId) );
    if(!item && !like && !dislike) {
        return new createError.BadRequest('Like or Dislike state is required');
    } else if( item && !like && !dislike && isAlreadyLiked ) {
        updateQuery = { $pull: {likes: userId} };
        message = `${modelName}\'s like removed successfully`;
    } else if( item && !like && dislike && isAlreadyLiked ) {
        updateQuery = { $pull: {likes: userId}, $push: {dislikes: userId} };
        message = `${modelName}\'s like removed and dislike added successfully`;
    } else if( item && !like && !dislike && isAlreadyDisliked ) {
        updateQuery = { $pull: {dislikes: userId} };
        message = `${modelName}\'s dislike removed successfully`;
    } else if( item && like && !dislike && isAlreadyDisliked ) {
        updateQuery = { $pull: {dislikes: userId}, $push: {likes: userId} };
        message = `${modelName}\'s dislike removed and like added successfully`;
    } else if(!item && like) {
        updateQuery = { $push: {likes: userId} };
        message = `${modelName} liked successfully`;
    } else if(!item && dislike) {
        updateQuery = { $push: {dislikes: userId} };
        message = `${modelName} disliked successfully`;
    }
    return {updateQuery, message}
}

module.exports = {
    likeDislikeUpdateQuery
}