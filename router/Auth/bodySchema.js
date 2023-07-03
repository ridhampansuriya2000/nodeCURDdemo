const Joi = require('joi');

const sighupBodySchema = Joi.object().keys({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')).required().trim().options({messages: { 'string.pattern.base' : 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'}}),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ messages: { 'any.only': '{{#label}} does not match.' } })
});

const loginBodySchema = Joi.object().keys({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
});

const updateBodySchema = Joi.object().keys({
    phoneNum: Joi.string()
        .pattern(/^\d{10}$/)
        .min(10)
        .max(10)
        .messages({
            'string.pattern.base': 'Phone number must be 10 digits in length.',
            'string.min': 'Phone number must be 10 digits in length.',
            'string.max': 'Phone number must be 10 digits in length.',
        }),
});

module.exports = {
    sighupBodySchema,
    loginBodySchema,
    updateBodySchema
}