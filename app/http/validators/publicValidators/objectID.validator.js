const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function objectIDValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        id: myJoiObjectId().messages({
            'any.only': 'Wrong object id'
        })
    })
    return schema.validate(data);
}
module.exports = {
    objectIDValidator
}