const Joi = require('joi');

function checkOtpValidator(data) {
    const schema = Joi.object({
        mobile: Joi.string()
        .pattern(/^09[0-9]{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Mobile nubmer format is wrong',
            'any.required': 'Mobile is required',
            'string.empty': 'Mobile can not be empty',
        }),
        code: Joi.string()
        .pattern(/^[0-9]{5}$/)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Code format is wrong, it must be a number',
            'string.length': 'Wrong code',
            'any.required': 'Code is required',
            'string.empty': 'Code can not be empty',
        }),
    })
    return schema.validate(data);
}
module.exports = {
    checkOtpValidator,
}