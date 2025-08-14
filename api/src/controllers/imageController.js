const path = require('path');
const fs = require('fs');
const { signImageToken, verifyImageToken } = require('../utils/imageToken');

const signImageController = async (req, res, next) => {
  try {
    const { file } = req.query;
    if (!file) {
      return res.status(400).json({ message: 'Arquivo é obrigatório.' });
    }
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
    if (!file || !token) {
      return res.status(400).json({ message: 'Parâmetros inválidos.' });
    }
    const fileName = path.basename(file);
    if (!verifyImageToken(token, fileName)) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    const imagePath = path.join(__dirname, '../../..', 'public', 'assets', 'img', fileName);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Imagem não encontrada.' });
    }
    res.sendFile(imagePath);
  } catch (err) {
    next(err);
  }
};

module.exports = { signImageController, fetchImageController };
