const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schemas");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brief_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    gallery_images: { type: [String] },
    tags: { type: [String], ref: 'tags', default: [] },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, required: true },
    type: { type: String, required: true, enum: ['REAL_PRODUCT', 'VIRTUAL_PRODUCT'] },
    format: { type: String },
    supplier: { type: String, required: true },
    features: {
        type: Object,
        default: {
            length: { type: Number, default: undefined },
            height: { type: Number, default: undefined },
            width: { type: Number, default: undefined },
            weight: { type: Number, default: undefined },
            colors: [{ type: String, default: undefined }],
            model: [{ type: String, default: undefined }],
            made_in: { type: String, default: undefined }
        }
    },
});

module.exports = {
    ProductModel: mongoose.model('product', productSchema)
}