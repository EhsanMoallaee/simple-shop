const { RoleModel } = require("../../../../../models/role.model");

async function findRoleByTitle(title) {
    const role = await RoleModel.findOne({title});
    return role;
}

module.exports = {
    findRoleByTitle,
}