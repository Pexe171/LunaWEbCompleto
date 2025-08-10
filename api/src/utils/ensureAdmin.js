const User = require('../models/User');

async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL || 'admin@galeriapexe.com';
  const password = process.env.ADMIN_PASSWORD || 'Adm1n#2024';

  const existing = await User.findOne({ email });
  if (!existing) {
    const admin = new User({ email, password, role: 'admin' });
    await admin.save();
    console.log(`Admin user created with email ${email}`);
  }
}

module.exports = { ensureAdminUser };
