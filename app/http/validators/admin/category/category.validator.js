const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function addCategoryValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required().trim().lowercase().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        parent: myJoiObjectId().optional().allow(null, '').messages({
            'string.pattern.name': 'Wrong object id format'
        }),
    })
    return schema.validate(data);
}

function updateCategoryValidator(data) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required().trim().lowercase().required().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        })
    })
    return schema.validate(data);
}

module.exports = {
    addCategoryValidator,
    updateCategoryValidator
}