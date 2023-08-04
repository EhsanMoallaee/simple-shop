const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function addRoleValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).trim().lowercase().required().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        description: Joi.string().min(3).max(30).trim().lowercase().required().messages({
            'any.required': 'Description is required',
            'string.empty': 'Description can not be empty',
            'string.max': 'Description length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Description length must be at least {{#limit}} characters long',
        }),
        permissions: Joi.array().max(20).items(
            myJoiObjectId().messages({
                'string.pattern.name': 'Wrong object id format',
            }),
          ).messages({
            'array.base': 'Permissions type must be an array (wrong type)',
            'array.max': 'Permissions array can\'t have more than 20 members',
        }),
    })
    return schema.validate(data);
}

function updateRoleValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        title: Joi.string().optional().allow(null, '').min(3).max(30).trim().lowercase().messages({
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        description: Joi.string().optional().allow(null, '').min(3).max(30).trim().lowercase().messages({
            'string.max': 'Description length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Description length must be at least {{#limit}} characters long',
        }),
        permissions: Joi.array().optional().max(20).items(
            myJoiObjectId().allow(null, '').messages({
                'string.pattern.name': 'Wrong object id format',
            }),
          ).messages({
            'array.base': 'Permissions type must be an array (wrong type)',
            'array.max': 'Permissions array can\'t have more than 20 members',
        }),
    })
    return schema.validate(data);
}

module.exports = {
    addRoleValidator,
    updateRoleValidator
}