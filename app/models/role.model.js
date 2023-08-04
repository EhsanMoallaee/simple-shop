const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true }
}, { 
    timestamps: true, toJSON: { virtuals: true }
})

module.exports = {
    RoleModel: mongoose.model('role', roleSchema)
}