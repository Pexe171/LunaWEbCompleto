const { isLicenseValid } = require('../services/licenseService');

describe('License Service', () => {
    test('should return true for a valid license', () => {
        const user = { licenseExpiresAt: new Date(Date.now() + 10000) };
        expect(isLicenseValid(user)).toBe(true);
    });

    test('should return false for an expired license', () => {
        const user = { licenseExpiresAt: new Date(Date.now() - 10000) };
        expect(isLicenseValid(user)).toBe(false);
    });
});
