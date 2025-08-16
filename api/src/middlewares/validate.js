const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  const options = { abortEarly: false, stripUnknown: true };

  if (schema.body) {
    const { error, value } = schema.body.validate(req.body, options);
    if (error) {
      return next(new AppError('Dados inválidos.', 400, error.details.map(d => d.message)));
    }
    req.body = value;
  }

  if (schema.params) {
    const { error, value } = schema.params.validate(req.params, options);
    if (error) {
      return next(new AppError('Parâmetros inválidos.', 400, error.details.map(d => d.message)));
    }
    req.params = value;
  }

  if (schema.query) {
    const { error, value } = schema.query.validate(req.query, options);
    if (error) {
      return next(new AppError('Parâmetros de consulta inválidos.', 400, error.details.map(d => d.message)));
    }
    req.query = value;
  }

  next();
};

module.exports = { validate };
