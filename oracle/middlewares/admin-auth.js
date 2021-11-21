const jwt = require('jsonwebtoken');
const { ADMIN_SECRET } = require('../config');

async function adminAuth(req, res, next) {
  const { authorization } = req.headers;

  try {
    jwt.verify(authorization, ADMIN_SECRET);
    next();
  } catch (err) {
    res.status(401).send({ err });
  }
}

module.exports = {
  adminAuth,
};
