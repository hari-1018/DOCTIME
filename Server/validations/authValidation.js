const Joi = require('joi');

// Register Validation
const validateRegister = (data) => {
    const Schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid('admin','user').default('user'),
    });
    return Schema.validate(data);
}

const validateLogin = (data) => {
    const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    });
    return Schema.validate(data);
}

module.exports = { validateRegister, validateLogin };
