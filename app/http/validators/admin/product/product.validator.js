const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function addProductValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        type: Joi.string().valid('REAL_PRODUCT', 'VIRTUAL_PRODUCT').messages({
            'any.only': 'The only acceptable values are : REAL_PRODUCT and VIRTUAL_PRODUCT'
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
        }),
        supplier: Joi.string().trim().messages({
            'string.empty': 'Supplier can not be empty',
        }),
        price: Joi.number().positive().max(999999999999).messages({
            'number.positive': 'Price number should be positive number',
            'number.max': 'Price number should be lower than 999,999,999,999'
        }),
        discount: Joi.number().positive().max(999999999999).messages({
            'number.positive': 'Discount number should be positive number',
            'number.max': 'Discount number should be lower than 999,999,999,999'
        }),
        count: Joi.number().positive().max(999999999999).messages({
            'number.positive': 'Count number should be positive number',
            'number.max': 'Count number should be lower than 999,999,999,999'
        }),
        height: Joi.number().allow('', 0).positive().max(200).messages({
            'number.positive': 'Height number should be positive number',
            'number.max': 'Height number should be lower than 200'
        }),
        width: Joi.number().allow('', 0).positive().max(200).messages({
            'number.positive': 'Width number should be positive number',
            'number.max': 'Width number should be lower than 200'
        }),
        length: Joi.number().allow('', 0).positive().max(200).messages({
            'number.positive': 'Length number should be positive number',
            'number.max': 'Length number should be lower than 200'
        }),
        weigth: Joi.number().allow('', 0).positive().max(50000).messages({
            'number.positive': 'Weigth number should be positive number',
            'number.max': 'Weigth number should be lower than 50,000'
        })
    })
    return schema.validate(data);
}

module.exports = {
    addProductValidator
}