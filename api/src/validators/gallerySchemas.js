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
    tags: Joi.string().optional(),
    signature: Joi.string().min(10).required().messages({
      'any.required': 'Assinatura digital é obrigatória.',
      'string.empty': 'Assinatura digital é obrigatória.',
      'string.min': 'Assinatura digital deve ter ao menos 10 caracteres.'
    }),
    certificateUrl: Joi.string().uri({ allowRelative: false }).optional().messages({
      'string.uri': 'Certificado digital deve ser uma URL válida.'
    })
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

const updateImageStatusSchema = {
  body: Joi.object({
    status: Joi.string()
      .valid('pending', 'approved', 'rejected')
      .required()
      .messages({
        'any.required': 'Status é obrigatório.',
        'any.only': 'Status deve ser pending, approved ou rejected.'
      }),
    notes: Joi.string().allow('', null).optional()
  }),
  params: imageIdParamSchema.params
};

module.exports = { createGalleryImageSchema, imageIdParamSchema, updateImageStatusSchema };
