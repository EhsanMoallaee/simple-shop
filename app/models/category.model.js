const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        default: undefined,
        ref: 'category'
    },
}, { id: false, versionKey: false, toJSON: {virtuals: true} });

categorySchema.virtual('children', {
    ref: 'category',
    localField: '_id',
    foreignField: 'parent',
});

categorySchema
.pre('findOne', autoPopulate)
.pre('find', autoPopulate)

function autoPopulate(next) {
    this.populate([{path: 'children', select: {__v: 0, id: 0}}]);
    next();
}

module.exports = {
    CategoryModel: mongoose.model('category', categorySchema)
}