const Joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const updateMeSchema = {
  body: Joi.object({
    name: Joi.string().optional(),
    bio: Joi.string().optional()
  })
};

const changePasswordSchema = {
  body: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Senha atual é obrigatória.'
    }),
    newPassword: Joi.string().pattern(passwordPattern).required().messages({
      'string.pattern.base': 'A nova senha deve conter maiúscula, minúscula, número e caractere especial.',
      'any.required': 'Nova senha é obrigatória.'
    })
  })
};

module.exports = { updateMeSchema, changePasswordSchema };
