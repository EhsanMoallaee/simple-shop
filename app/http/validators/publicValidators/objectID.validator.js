const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function objectIDValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        id: myJoiObjectId().messages({
            'string.empty': 'ID parameter can not be empty',
            'string.pattern.name': 'Wrong object id format'
        })
    })
    return schema.validate(data);
}
module.exports = {
    objectIDValidator
}