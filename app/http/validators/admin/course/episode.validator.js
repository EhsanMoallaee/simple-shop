const Joi = require('joi');
const JoiObjectId = require('Joi-Objectid');

function addEpisodeValidator(data) {
    const myJoiObjectId = JoiObjectId(Joi);
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).trim().lowercase().messages({
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        text: Joi.string().trim().messages({
            'string.empty': 'Text can not be empty',
        }),
        type: Joi.string().valid('LOCK', 'UNLOCK').messages({
            'any.only': 'The only acceptable values are : LOCK and UNLOCK'
        }),
        chapterId: myJoiObjectId().messages({
            'any.only': 'Wrong object id'
        }),
        courseId: myJoiObjectId().messages({
            'any.only': 'Wrong object id'
        }),
    })
    return schema.validate(data);
}

function updateEpisodeValidator(data) {
    const schema = Joi.object({
        title: Joi.string().max(30).trim().lowercase().allow(null, '').messages({
            'string.empty': 'Title can not be empty',
            'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
            'string.min': 'Title length must be at least {{#limit}} characters long',
        }),
        text: Joi.string().trim().allow(null, '').messages({
            'string.empty': 'Text can not be empty',
        }),
        type: Joi.string().valid('LOCK', 'UNLOCK').messages({
            'any.only': 'The only acceptable values are : LOCK and UNLOCK'
        })
    })
    return schema.validate(data);
}

module.exports = {
    addEpisodeValidator,
    updateEpisodeValidator
}