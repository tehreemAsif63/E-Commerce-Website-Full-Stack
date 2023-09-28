const jwt = require("jsonwebtoken");
const secretJWTKey = require("./secretKey")

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }
  try {
    const decoded = jwt.verify(token, secretJWTKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports=verifyToken;

