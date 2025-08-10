const User = require('../models/User');
const config = require('../config');

// Cria um novo usuário e deixa que o mongoose aplique o hash da senha
// através do middleware `pre('save')` definido no modelo de usuário.
const createUser = async (email, password, licenseDays = config.licenseDays) => {
    const licenseExpiresAt = new Date(Date.now() + licenseDays * 24 * 60 * 60 * 1000);

    const newUser = new User({
        email,
        password,
        licenseExpiresAt,
    });

    await newUser.save();
    return newUser;
};

module.exports = { createUser };
