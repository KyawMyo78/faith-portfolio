// Load environment variables manually
const fs = require('fs');
const path = require('path');

console.log('Loading .env.local manually...');
try {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  console.log('Raw .env.local content:');
  lines.forEach((line, index) => {
    if (line.includes('ADMIN_')) {
      console.log(`Line ${index + 1}: "${line}"`);
    }
  });

  // Parse manually
  const adminEmailLine = lines.find(line => line.startsWith('ADMIN_EMAIL='));
  const adminPasswordLine = lines.find(line => line.startsWith('ADMIN_PASSWORD_HASH='));
  
  console.log('\nParsed variables:');
  console.log('ADMIN_EMAIL line:', adminEmailLine);
  console.log('ADMIN_PASSWORD_HASH line:', adminPasswordLine);
  
  if (adminPasswordLine) {
    const hash = adminPasswordLine.split('=')[1];
    console.log('Extracted hash:', hash);
    console.log('Hash length:', hash?.length);
  }
  
} catch (error) {
  console.error('Error reading .env.local:', error.message);
}

// Test bcrypt
const bcrypt = require('bcryptjs');
const testPassword = 'kmk787067652';
const newHash = bcrypt.hashSync(testPassword, 12);
console.log('\nNew hash generated:', newHash);
console.log('Hash validation:', bcrypt.compareSync(testPassword, newHash));
