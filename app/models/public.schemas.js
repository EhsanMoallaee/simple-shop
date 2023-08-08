const { default: mongoose } = require("mongoose");

const answerSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, default: false },
}, { timestamps: {createdAt: true } })

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, default: false },
    open_toReply: { type: Boolean, default: true },
    answers: { type: [answerSchema] },
}, { timestamps: {createdAt: true }, default: [] })

module.exports = {
    commentSchema,
}