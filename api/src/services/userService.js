const User = require('../models/User');
const config = require('../config');

const createUser = async (email, password, licenseDays = config.licenseDays, role = 'user') => {
    const licenseExpiresAt = new Date(Date.now() + licenseDays * 24 * 60 * 60 * 1000);

    const newUser = new User({
        email,
        password,
        licenseExpiresAt,
        role,
    });

    await newUser.save();
    return newUser;
};

module.exports = { createUser };
