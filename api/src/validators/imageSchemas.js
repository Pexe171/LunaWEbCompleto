const Joi = require('joi');

const signImageSchema = {
  query: Joi.object({
    file: Joi.string().required().messages({
      'any.required': 'Arquivo é obrigatório.'
    })
  })
};

const fetchImageSchema = {
  query: Joi.object({
    file: Joi.string().required().messages({
      'any.required': 'Arquivo é obrigatório.'
    }),
    token: Joi.string().required().messages({
      'any.required': 'Token é obrigatório.'
    })
  })
};

module.exports = { signImageSchema, fetchImageSchema };
