const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schemas");
const Episodes = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ['LOCK', 'UNLOCK'], default: 'UNLOCK' },
    time: { type: String, required: true },
    video: {  type: String, required: true },
});

const Chapter = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String},
    episodes: { type: [Episodes]}
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brief_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], ref: 'tags', default: [] },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, required: true, enum: ['FREE', 'CASH', 'VIP'], default: 'FREE' },
    status: { type: String, required: true, enum: ['not_started', 'completed', 'on_performing'], default: 'not_started' },
    time: { type: String, default: '00:00:00' },
    teacher: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    chapters: { type: [Chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
}, { timestamps: true, toJSON: { virtuals: true }});

courseSchema.index({title: 'text', brief_text: 'text', text: 'text'})
module.exports = {
    CourseModel: mongoose.model('course', courseSchema)
}