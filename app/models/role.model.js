const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    permissions: { type: [mongoose.Types.ObjectId], ref: 'permission', default: []}
}, { 
    timestamps: true, toJSON: { virtuals: true }
})

module.exports = {
    RoleModel: mongoose.model('role', roleSchema)
}