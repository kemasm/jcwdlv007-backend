const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret";

const generateToken = (payload, expiresIn = "2d") => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn
  });

  return token;
};

const verifyToken = (token) => {
  const isVerified = jwt.verify(token, JWT_SECRET);

  return isVerified;
};

module.exports = {
  generateToken,
  verifyToken,
};
