const User = require('../models/User');

const updateProfileController = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { name, avatarUrl, bio, socialLinks } = req.body;
        const updated = await User.findByIdAndUpdate(
            userId,
            { name, avatarUrl, bio, socialLinks },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

module.exports = { updateProfileController };
