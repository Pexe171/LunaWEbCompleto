const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('../config');

const createUser = async (email, password, licenseDays = config.licenseDays) => {
    const passwordHash = await bcrypt.hash(password, 12);
    const licenseExpiresAt = new Date(Date.now() + licenseDays * 24 * 60 * 60 * 1000);

    const newUser = new User({
        email,
        passwordHash,
        licenseExpiresAt,
    });

    await newUser.save();
    return newUser;
};

module.exports = { createUser };
