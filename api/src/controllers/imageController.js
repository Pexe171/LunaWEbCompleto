const path = require('path');
const fs = require('fs');
const { signImageToken, verifyImageToken } = require('../utils/imageToken');
const AppError = require('../utils/AppError');

const signImageController = async (req, res, next) => {
  try {
    const { file } = req.query;
    const fileName = path.basename(file);
    const token = signImageToken(fileName);
    const url = `/api/v1/images/fetch?file=${encodeURIComponent(fileName)}&token=${token}`;
    res.json({ url });
  } catch (err) {
    next(err);
  }
};

const fetchImageController = async (req, res, next) => {
  try {
    const { file, token } = req.query;
    const fileName = path.basename(file);
    if (!verifyImageToken(token, fileName)) {
      return next(new AppError('Token inválido ou expirado.', 403));
    }
    const imagePath = path.join(__dirname, '../../..', 'public', 'assets', 'img', fileName);
    if (!fs.existsSync(imagePath)) {
      return next(new AppError('Imagem não encontrada.', 404));
    }
    res.sendFile(imagePath);
  } catch (err) {
    next(err);
  }
};

module.exports = { signImageController, fetchImageController };
