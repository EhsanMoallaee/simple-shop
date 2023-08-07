const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schemas");

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    brief_text: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'user',
        default: []
    },
    dislikes: {
        type: [mongoose.Types.ObjectId],
        ref: 'user',
        default: []
    },
    bookmarks: {
        type: [mongoose.Types.ObjectId],
        ref: 'user',
        default: []
    }
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true} });

blogSchema.virtual('user_detail', {
    ref: 'user',
    localField: '_id',
    foreignField: 'author',
});
blogSchema.virtual('category_detail', {
    ref: 'category',
    localField: '_id',
    foreignField: 'category',
});

blogSchema.virtual("imageURL").get(function() {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
})

module.exports = {
    BlogModel: mongoose.model('blog', blogSchema)
}