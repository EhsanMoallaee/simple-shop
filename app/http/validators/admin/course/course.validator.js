const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function addCourseValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        type: Joi.string().valid('CASH', 'FREE', 'VIP').messages({
            'any.only': 'The only acceptable values are : CASH, FREE and VIP'
        }),
        title: Joi.string().min(3).max(30).trim().lowercase().messages({
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        text: Joi.string().trim().messages({
            'string.empty': 'Text can not be empty',
        }),
        brief_text: Joi.string().trim().messages({
            'string.empty': 'Brief text can not be empty',
        }),
        tags: Joi.array().max(20).items(
            Joi.string().messages({
              'string.empty': 'Tag title is required'
            })
          ).messages({
            'array.max': 'Tags array can\'t have more than 20 members',
        }),
        category: myJoiObjectId().messages({
            'string.pattern.name': 'Wrong object id format'
        }),
        price: Joi.number().min(0).max(999999999999).messages({
            'number.min': 'Price number should be equal or greater than zeros',
            'number.max': 'Price number should be lower than 999,999,999,999'
        }),
        discount: Joi.number().min(0).max(999999999999).messages({
            'number.min': 'Discount number should be equal or greater than zeros',
            'number.max': 'Discount number should be lower than 999,999,999,999'
        }),
        image: Joi.allow(null)
    })
    return schema.validate(data);
}

function updateCourseValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        type: Joi.string().optional().allow(null, '').valid('CASH', 'FREE', 'VIP').messages({
            'any.only': 'The only acceptable values are : CASH, FREE and VIP'
        }),
        title: Joi.string().optional().allow(null, '').min(3).max(30).trim().lowercase().messages({
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        text: Joi.string().optional().allow(null, '').trim(),
        brief_text: Joi.string().optional().allow(null, '').trim(),
        tags: Joi.array().optional().allow(null, '').max(20).items(
            Joi.string().optional().messages({
              'string.empty': 'Tag title is required'
            })
          ).messages({
            'array.max': 'Tags array can\'t have more than 20 members',
        }),
        category: myJoiObjectId().optional().allow(null, '').messages({
            'string.pattern.name': 'Wrong object id format'
        }),
        price: Joi.number().optional().allow(null, '').min(0).max(999999999999).messages({
            'number.min': 'Price number should be equal or greater than zeros',
            'number.max': 'Price number should be lower than 999,999,999,999'
        }),
        discount: Joi.number().optional().allow(null, '').min(0).max(999999999999).messages({
            'number.min': 'Discount number should be equal or greater than zeros',
            'number.max': 'Discount number should be lower than 999,999,999,999'
        }),
        image: Joi.optional().allow(null, '')
    })
    return schema.validate(data);
}

module.exports = {
    addCourseValidator,
    updateCourseValidator
}