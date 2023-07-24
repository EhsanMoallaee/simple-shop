const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        sparse: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String
    },
    otp: {
        code: {type: String, default: ""},
        expiresIn: {type: String, default: ""}
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
    roles: {
        type: [String],
        default: ['User']
    },
});
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel