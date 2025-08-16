const Joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createUserSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email inválido.',
      'any.required': 'Email é obrigatório.'
    }),
    password: Joi.string().pattern(passwordPattern).required().messages({
      'string.pattern.base': 'A senha deve conter maiúscula, minúscula, número e caractere especial.',
      'any.required': 'Senha é obrigatória.'
    }),
    role: Joi.string().valid('user', 'admin').optional()
  })
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email inválido.',
      'any.required': 'Email é obrigatório.'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Senha é obrigatória.'
    })
  })
};

const refreshTokenSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token é obrigatório.'
    })
  })
};

module.exports = { createUserSchema, loginSchema, refreshTokenSchema };
