const { default: mongoose } = require("mongoose");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const courseBasketSchema = new mongoose.Schema({
    courseId: { type: mongoose.Types.ObjectId, ref: 'course' },
    count: { type: Number, default: 1}
})

const productBasketSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, ref: 'product' },
    count: { type: Number, default: 1}
})

const basketSchema = new mongoose.Schema({
    courses: { type: [courseBasketSchema], default: []},
    products: { type: [productBasketSchema], default: []},
})

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
    token: { type: String, default: '' },
    role: { type: String, default: 'User' },
    permissions : [{ type: mongoose.Types.ObjectId, ref: 'permission' }],
    courses: { type: [mongoose.Types.ObjectId], ref: 'course', default: [] },
    products: { type: [mongoose.Types.ObjectId], ref: 'product', default: [] },
    basket: { type: basketSchema },
}, { timestamps: true, toJSON: { virtuals: true }});

userSchema.plugin(mongooseLeanVirtuals);
userSchema.index({ first_name: 'text', last_name: 'text', username: 'text', mobile: 'text', email: 'text' });

module.exports = { 
    UserModel: mongoose.model('user', userSchema)
}