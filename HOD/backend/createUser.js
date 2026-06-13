const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Hod = require('./models/Hod');
// Load environment variables
require('dotenv').config();

async function createUser() {
  // Get email and password from command line arguments
  const email = process.argv[2];
  const plainPassword = process.argv[3];

  if (!email || !plainPassword) {
    console.log('❌ Error: Please provide both an email and a password.');
    console.log('Usage: node createUser.js <email> <password>');
    console.log('Example: node createUser.js john.doe@university.edu secret123');
    process.exit(1);
  }

  try {
    // 1. Connect to the database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/AntiGravity');
    console.log('✅ Connected to the database.');

    // 2. Hash the password securely with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // 3. Insert or update the user in the database
    const result = await Hod.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true, upsert: true }
    );

    console.log(`\n🎉 Success! User has been inserted/updated.`);
    console.log(`📧 Email: ${result.email}`);
    console.log(`🔑 Password: ${plainPassword} (Secured as a hash in the Database)`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database operation failed:', error);
    process.exit(1);
  }
}

createUser();
