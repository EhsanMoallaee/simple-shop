const Joi = require('joi');

function getOtpValidator(data) {
    const schema = Joi.object({
        mobile: Joi.string()
        .pattern(/^09[0-9]{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Mobile nubmer format is wrong',
            'any.required': 'Mobile is required',
            'string.empty': 'Mobile can not be empty',
        }),
    })
    return schema.validate(data);
}
module.exports = {
    getOtpValidator,
}