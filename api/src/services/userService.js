const User = require('../models/User');
const AppError = require('../utils/AppError');

// Cria um novo usuário e deixa que o mongoose aplique o hash da senha
// através do middleware `pre('save')` definido no modelo de usuário.
const createUser = async (
  email,
  password,
  role = 'user'
) => {
  const newUser = new User({
    email,
    password,            // o hash será aplicado no pre('save')
    role,
  });

  await newUser.save();
  return newUser;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const changePassword = async (id, currentPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user || !(await user.comparePassword(currentPassword))) {
    throw new AppError('Senha atual incorreta.', 401);
  }
  user.password = newPassword;
  await user.save();
  return user;
};

const countUsers = async () => {
  return User.countDocuments();
};

module.exports = { createUser, getUserById, updateUser, changePassword, countUsers };
