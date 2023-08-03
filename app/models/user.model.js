const { default: mongoose } = require("mongoose");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const userSchema = new mongoose.Schema({
    first_name: { type: String, },
    last_name: { type: String, },
    username: { type: String, lowercase: true, unique: true, sparse: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true, unique: true, sparse: true },
    password: { type: String },
    otp: { code: {type: String, default: ""}, expiresIn: {type: String, default: ""} },
    bills: { type: [String], default: [] },
    discount_code: { type: Number, default: 0 },
    birthday: { type: String },
    roles: { type: [String], default: ['User'] },
    courses: { type: [mongoose.Types.ObjectId], ref: 'course', default: []}
}, { timestamps: true, toJSON: { virtuals: true }});

userSchema.plugin(mongooseLeanVirtuals);
userSchema.index({ first_name: 'text', last_name: 'text', username: 'text', mobile: 'text', email: 'text' });
// userSchema.virtual('imageURLs').get(function() {
//     return this.gallery_images.map(img => `${process.env.BASE_URL}:${process.env.PORT}/${img}`)
// });

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel