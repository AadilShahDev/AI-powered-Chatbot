const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },                     // payload
    process.env.JWT_SECRET,            // secret key (put in .env)
    { expiresIn: '2h' }                // token validity
  );
};

module.exports = generateToken;
