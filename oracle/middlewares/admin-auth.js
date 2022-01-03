const jwt = require('jsonwebtoken');
const { ADMIN_SECRET } = require('../config');

async function adminAuth(req, res, next) {
  try {
    jwt.verify(req.headers.authorization, ADMIN_SECRET);
    next();
  } catch (err) {
    res.status(401).send({ err });
  }
}

module.exports = {
  adminAuth,
};
