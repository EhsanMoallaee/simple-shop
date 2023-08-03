const { PermissionModel } = require("../../../../../models/permission.model");

async function findPermissionByTitle(title) {
    const permission = await PermissionModel.findOne({title});
    return permission;
}

module.exports = {
    findPermissionByTitle,
}