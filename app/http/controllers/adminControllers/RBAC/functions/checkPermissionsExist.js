const { PermissionModel } = require("../../../../../models/permission.model");

async function checkPermissionsExist(permissions) {
    if(permissions && permissions.length > 0) {
        let permissionsExist = true;
        for(let permission of permissions) {
            const result = await PermissionModel.findById(permission);
            if(!result) {
                permissionsExist = false;
                break;
            }
        }
        return permissionsExist;
    }
}

module.exports = {
    checkPermissionsExist,
}