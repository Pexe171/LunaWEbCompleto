const jwt = require('jsonwebtoken');
const config = require('../config');

function signImageToken(filePath) {
  return jwt.sign({ filePath }, config.jwt.secret, { expiresIn: '1m' });
}

function verifyImageToken(token, filePath) {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded.filePath === filePath;
  } catch (err) {
    return false;
  }
}

module.exports = { signImageToken, verifyImageToken };
