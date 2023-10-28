const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
