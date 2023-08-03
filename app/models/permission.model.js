const { default: mongoose } = require("mongoose");

const permissionSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    description: { type: String, default: ''}
}, { 
    timestamps: true, toJSON: { virtuals: true }
})

module.exports = {
    PermissionModel: mongoose.model('permission', permissionSchema)
}