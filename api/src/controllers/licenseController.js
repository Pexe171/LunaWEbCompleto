const licenseService = require('../services/licenseService');

const verifyLicenseController = async (req, res, next) => {
    try {
        const status = licenseService.getLicenseStatus(req.user);
        res.json(status);
    } catch (err) {
        next(err);
    }
};

const renewLicenseController = async (req, res, next) => {
    try {
        const { days } = req.body;
        const newLicense = await licenseService.renewLicense(req.user, days);
        res.json(newLicense);
    } catch (err) {
        next(err);
    }
};

module.exports = { verifyLicenseController, renewLicenseController };
