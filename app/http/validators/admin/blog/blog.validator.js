const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function addBlogValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        author: myJoiObjectId().messages({
            'any.only': `missing field {{#label}}`
        }),
        title: Joi.string().min(3).max(30).trim().lowercase().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        text: Joi.string().trim().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
        }),
        brief_text: Joi.string().trim().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title can not be empty',
        }),
        tags: Joi.array().max(20).items(
            Joi.string().optional().messages({
              'string.empty': 'Tag title is required'
            })
          ).messages({
            'array.max': 'Tags array can\'t have more than 20 members',
        }),
        category: myJoiObjectId().messages({
            'any.only': `missing field {{#label}}`
        })
    })
    return schema.validate(data);
}

function updateBlogValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        author: myJoiObjectId().messages({
            'any.only': `missing field {{#label}}`
        }),
        title: Joi.string().min(3).max(30).trim().lowercase().messages({
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        text: Joi.string().trim().messages({
            'string.empty': 'Title can not be empty',
        }),
        brief_text: Joi.string().trim().messages({
            'string.empty': 'Title can not be empty',
        }),
        tags: Joi.array().max(20).items(
            Joi.string().messages({
              'string.empty': 'Tag title is required'
            })
          ).messages({
            'array.max': 'Tags array can\'t have more than 20 members',
        }),
        category: myJoiObjectId().messages({
            'any.only': `missing field {{#label}}`
        })
    })
    return schema.validate(data);
}

module.exports = {
    addBlogValidator,
    updateBlogValidator
}