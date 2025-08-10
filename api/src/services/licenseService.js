const User = require('../models/User');
const config = require('../config');

const isLicenseValid = (user) => {
    return user.licenseExpiresAt > new Date();
};

const getLicenseStatus = (user) => {
    const valid = isLicenseValid(user);
    return {
        valid,
        licenseExpiresAt: user.licenseExpiresAt
    };
};

const renewLicense = async (user, days = config.licenseDays) => {
    let newExpiresAt = user.licenseExpiresAt;
    const now = new Date();

    if (newExpiresAt < now) {
        newExpiresAt = now;
    }

    newExpiresAt.setDate(newExpiresAt.getDate() + days);

    await User.findByIdAndUpdate(user._id, { licenseExpiresAt: newExpiresAt });

    return { licenseExpiresAt: newExpiresAt };
};

module.exports = { isLicenseValid, getLicenseStatus, renewLicense };
