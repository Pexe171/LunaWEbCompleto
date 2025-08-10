const User = require('../models/User');
const config = require('../config');

// Cria um novo usuário e deixa que o mongoose aplique o hash da senha
// através do middleware `pre('save')` definido no modelo de usuário.
const createUser = async (
  email,
  password,
  licenseDays = config.licenseDays,
  role = 'user'
) => {
  const licenseExpiresAt = new Date(Date.now() + licenseDays * 24 * 60 * 60 * 1000);

  const newUser = new User({
    email,
    password,            // o hash será aplicado no pre('save')
    licenseExpiresAt,
    role,
  });

  await newUser.save();
  return newUser;
};

const getUserById = async (id) => {
  return User.findById(id).select('-password -refreshTokens');
};

const updateUserProfile = async (id, data) => {
  return User.findByIdAndUpdate(id, {
    name: data.name,
    bio: data.bio,
  }, { new: true }).select('-password -refreshTokens');
};

const changePassword = async (id, currentPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new Error('Senha atual incorreta.');
  }
  user.password = newPassword;
  await user.save();
};

module.exports = { createUser, getUserById, updateUserProfile, changePassword };
