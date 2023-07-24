const Joi = require('joi');

function authValidator(data) {
    const schema = Joi.object({
        email: Joi.string().email().required().trim().lowercase().messages({
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required',
            'string.empty': 'Email can not be empty',
        }),
        password: Joi.string()
        .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,30}$/)
        .required()
        .messages({
            'string.pattern.base': 'Your password must be have at least: 8 characters long,1 uppercase & 1 lowercase character,1 number and 1 symbol of (@ # $ % &)',
            'any.required': 'Password is required',
            'string.empty': 'Password can not be empty',
        }),
        // mobile: Joi.string()
        // .pattern(/^09[0-9]{9}$/)
        // .required()
        // .messages({
        //     'string.pattern.base': 'Mobile nubmer format is wrong',
        //     'any.required': 'Mobile is required',
        //     'string.empty': 'Mobile can not be empty',
        // }),
    })
    return schema.validate(data);
}
module.exports = {
    authValidator,
}