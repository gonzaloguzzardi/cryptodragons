const jwt = require('jsonwebtoken');
const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SECRET } = require('../config');

async function postLoginAdmin(req, res) {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const user = {
      username,
      role: 'admin',
    };
    const token = jwt.sign(user, ADMIN_SECRET, { expiresIn: 1200 });

    res.status(200).send({ token });
    return;
  }

  res.status(401).send({ message: 'Invalid credentials' });
}

module.exports = {
  postLoginAdmin,
};
