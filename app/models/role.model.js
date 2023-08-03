const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    permission: { type: [mongoose.Types.ObjectId], ref: 'permission', default: []}
}, { 
    timestamps: true, toJSON: { virtuals: true }
})

module.exports = {
    RoleModel: mongoose.model('role', roleSchema)
}