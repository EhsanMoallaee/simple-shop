const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Object,
        default: {
            code: 0,
            expires: 0
        }
    },
    bills: {
        type: [String],
        default: []
    },
    discount_code: {
        type: Number,
        default: 0
    },
    birthday: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        enums: ['user', 'admin']
    },
});

module.exports = {
    UserModel: mongoose.model('user', userSchema)
}