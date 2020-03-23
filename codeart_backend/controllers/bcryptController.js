const bcrypt = require('bcrypt');

// Returns a JSON object with the salt and hashed password
exports.getHashedPassword = (password, salt) => {
  // console.log('Salt', salt);
  if (!salt) {
    console.log('Salt was undefined');
    salt = bcrypt.genSaltSync(10);
  }
  let hash = bcrypt.hashSync(password, salt);
  return {
    salt: salt,
    password_hash: hash,
  };
};

// Returns true if passwords match, else false
exports.checkPassword = (passwordToCheck, salt, hashedPassword) => {
  let hashedPasswordToCheck = this.getHashedPassword(passwordToCheck, salt);
  return hashedPasswordToCheck.password_hash === hashedPassword;
};