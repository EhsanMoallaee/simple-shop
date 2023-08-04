const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function updateUserValidator(data) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(30).trim().lowercase().allow(null, '').messages({
            'string.max': 'First name length must be less than or equal to {{#limit}} characters long',
        }),
        last_name: Joi.string().min(3).max(30).trim().lowercase().allow(null, '').messages({
            'string.max': 'Last name length must be less than or equal to {{#limit}} characters long',
        }),
        username: Joi.string().min(5).max(30).trim().lowercase().allow(null, '').messages({
            'string.max': 'Username length must be less than or equal to {{#limit}} characters long',
        }),
        email: Joi.string().email().trim().lowercase().allow(null, ''),
        birthday: Joi.string().trim().allow(null, ''),
    })
    return schema.validate(data);
}

function setUserPermissionsValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        permissions: Joi.array().max(20).items(
            myJoiObjectId().messages({
                'string.pattern.name': 'Wrong object id format'
            }),
          )
    })
    return schema.validate(data);
}

module.exports = {
    updateUserValidator,
    setUserPermissionsValidator
}