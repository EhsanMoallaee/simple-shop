const Joi = require('joi');

function addPermissionValidator(data) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).trim().lowercase().required().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        description: Joi.string().min(3).max(100).trim().lowercase().required().messages({
            'any.required': 'Description is required',
            'string.empty': 'Description can not be empty',
            'string.max': 'Description length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Description length must be at least {{#limit}} characters long',
        }),
    })
    return schema.validate(data);
}

function updatePermissionValidator(data) {
    const schema = Joi.object({
        title: Joi.string().optional().allow(null, '').min(3).max(30).trim().lowercase().messages({
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        description: Joi.string().optional().allow(null, '').min(3).max(30).trim().lowercase().messages({
            'string.max': 'Description length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Description length must be at least {{#limit}} characters long',
        })
    })
    return schema.validate(data);
}

module.exports = {
    addPermissionValidator,
    updatePermissionValidator
}