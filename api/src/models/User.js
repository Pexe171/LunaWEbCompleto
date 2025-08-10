const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const refreshTokenSchema = new mongoose.Schema({
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    licenseExpiresAt: { type: Date, required: true },
    refreshTokens: [refreshTokenSchema]
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
