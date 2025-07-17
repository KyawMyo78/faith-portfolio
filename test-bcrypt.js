// Quick test of bcrypt with our exact password
const bcrypt = require('bcryptjs');

const password = 'kmk787067652';
const newHash = bcrypt.hashSync(password, 12);
console.log('Fresh hash:', newHash);
console.log('Hash length:', newHash.length);

// Test the password
console.log('Test validation:', bcrypt.compareSync(password, newHash));

// Now let's test with a hash that doesn't have special characters
const simpleHash = bcrypt.hashSync(password, 8);
console.log('\nSimple hash (rounds=8):', simpleHash);
console.log('Simple hash length:', simpleHash.length);
console.log('Simple validation:', bcrypt.compareSync(password, simpleHash));
