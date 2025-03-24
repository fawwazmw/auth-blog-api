const Joi = require('joi');

exports.signupSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: {allow:['com', 'net']}
    }),
    password: Joi.string().required()
})

exports.signinSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: {allow:['com', 'net']}
    }),
    password: Joi.string().required()
})

exports.acceptCodeSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: {allow:['com', 'net']}
    }),
    providedCode: Joi.number().required()
})

exports.changePasswordSchema = Joi.object({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required()
})

exports.acceptFPCodeSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: {allow:['com', 'net']}
    }),
    providedCode: Joi.number().required(),
    newPassword: Joi.string().required(),
})

exports.createPostSchema = Joi.object({
    title: Joi.string().min(3).max(60).required(),
    description: Joi.string().min(3).max(600).required(),
    userId: Joi.string().required(),
})