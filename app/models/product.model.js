const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brief_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], ref: 'tags', default: [] },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    comments: { type: [], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, required: true },
    type: { type: String, required: true },
    time: { type: String },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, required: true },
    features: {
        type: Object,
        default: {
            length: '',
            height: '',
            width: '',
            weight: '',
            colors: [],
            model: [],
            madein: ''
        }
    },
});

module.exports = {
    ProductModel: mongoose.model('product', productSchema)
}