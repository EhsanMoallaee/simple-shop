const createError = require("http-errors");
const { objectIDValidator } = require("../../http/validators/publicValidators/objectID.validator");

function validateObjectId(id) {
    const { error } = objectIDValidator({id});
    if(error) {
        throw new createError.BadRequest(error.message);
    }
}

module.exports = {
    validateObjectId,
}