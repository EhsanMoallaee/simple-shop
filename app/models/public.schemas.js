const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'comment',
        default: undefined
    }
})

module.exports = {
    commentSchema,
}