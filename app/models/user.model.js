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
    role: { type: String, default: 'User' },
    permissions : [{ type: mongoose.Types.ObjectId, ref: 'permission' }],
    courses: { type: [mongoose.Types.ObjectId], ref: 'course', default: []}
}, { timestamps: true, toJSON: { virtuals: true }});

userSchema.plugin(mongooseLeanVirtuals);
userSchema.index({ first_name: 'text', last_name: 'text', username: 'text', mobile: 'text', email: 'text' });

module.exports = { 
    UserModel: mongoose.model('user', userSchema)
 }