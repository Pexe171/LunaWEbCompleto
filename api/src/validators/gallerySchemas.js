const Joi = require('joi');

const createGalleryImageSchema = {
  body: Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Título é obrigatório.',
      'string.empty': 'Título é obrigatório.'
    }),
    url: Joi.string().uri().required().messages({
      'string.uri': 'URL da imagem inválida.',
      'any.required': 'URL é obrigatória.'
    }),
    description: Joi.string().optional(),
    tags: Joi.string().optional()
  })
};

const imageIdParamSchema = {
  params: Joi.object({
    imageId: Joi.string().length(24).hex().required().messages({
      'string.length': 'ID de imagem inválido.',
      'string.hex': 'ID de imagem inválido.',
      'any.required': 'ID de imagem é obrigatório.'
    })
  })
};

module.exports = { createGalleryImageSchema, imageIdParamSchema };
