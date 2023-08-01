const { default: mongoose } = require("mongoose");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const { commentSchema } = require("./public.schemas");
const { calculateCourseTime } = require("../utils/course/calculateCourseTime");

const Episodes = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ['LOCK', 'UNLOCK'], default: 'UNLOCK' },
    time: { type: String, required: true },
    video: {  type: String, required: true },
});
Episodes.virtual('videoURL').get(function() {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.video}`
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
    teacher: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    chapters: { type: [Chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
}, { timestamps: true, toJSON: { virtuals: true }});

courseSchema.plugin(mongooseLeanVirtuals);
courseSchema.index({title: 'text', brief_text: 'text', text: 'text'});
courseSchema.virtual('imageURL').get(function() {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
});
courseSchema.virtual('totalTime').get(function() {
    return calculateCourseTime(this.chapters)
});

module.exports = {
    CourseModel: mongoose.model('course', courseSchema)
}