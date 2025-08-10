const userService = require('../services/userService');

const getMe = (req, res) => {
  const { email, role, name, bio } = req.user;
  res.json({ email, role, name, bio });
};

const updateMe = async (req, res, next) => {
  try {
    const { name, bio } = req.body;
    const updatedUser = await userService.updateUser(req.user._id, { name, bio });
    const { email, role } = updatedUser;
    res.json({ email, role, name: updatedUser.name, bio: updatedUser.bio });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(req.user._id, currentPassword, newPassword);
    res.json({ message: 'Senha atualizada com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe, changePassword };
