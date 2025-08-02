const bcrypt = require('bcryptjs');

if (process.argv.length !== 3) {
  console.log('Usage: node generate-hash.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const saltRounds = 12;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  
  console.log('\n🔐 Generated Password Hash:');
  console.log('============================');
  console.log(hash);
  console.log('\n📝 Add this to your .env.local file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('\n✅ Keep this hash secure and never share it publicly!');
});
