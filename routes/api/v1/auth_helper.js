module.exports = { hashPassword, compare };

const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(plainPassword){
  try {
    const hashedPassword = bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
  }
};

function compare(password, hash){
  return bcrypt.compare(password, hash);
}
