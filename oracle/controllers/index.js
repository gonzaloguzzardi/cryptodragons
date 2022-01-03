const { getDragonsInGateways } = require('./get-dragons-in-gateways');
const { getOrCreateSideAccount, giveSomeMoney } = require('./create-account');

const { getSessionAdmin } = require('./get-session-admin');
const { postLoginAdmin } = require('./post-login-admin');

module.exports = {
  getDragonsInGateways,
  getOrCreateSideAccount,
  giveSomeMoney,

  getSessionAdmin,
  postLoginAdmin,
};
