const userService = require('../services/userService');

const getProfileController = (req, res) => {
  const { _id, email, name, bio, licenseExpiresAt, role } = req.user;
  res.json({
    id: _id,
    email,
    name,
    bio,
    licenseExpiresAt,
    role,
  });
};

const updateProfileController = async (req, res, next) => {
  try {
    const { name, bio } = req.body;
    const user = await userService.updateUserProfile(req.user._id, { name, bio });
    res.json({
      message: 'Perfil atualizado com sucesso.',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        licenseExpiresAt: user.licenseExpiresAt,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const changePasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(req.user._id, currentPassword, newPassword);
    res.json({ message: 'Senha atualizada com sucesso.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProfileController,
  updateProfileController,
  changePasswordController,
};
