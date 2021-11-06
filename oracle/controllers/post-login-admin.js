const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = require('../config');

async function postLoginAdmin(req, res) {
  const { username, password } = req.body;

  if ((username === ADMIN_USERNAME) && (password === ADMIN_PASSWORD)) {
    res.status(200).send({ token: "TOKEN-MOCC" });
  }

  res.status(401).send();
}

module.exports = {
    postLoginAdmin,
};
