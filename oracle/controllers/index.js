const { getDragonsInGateways } = require('./get-dragons-in-gateways');
const { transferDragon } = require('./transfer-dragon');
const { mapAccounts } = require('./map-accounts');
const { saveDragon } = require('./save-dragon');
const { getDragon } = require('./get-dragon');
const { deleteDragon, insertDragon } = require('./commons');
const { createAccount, getOrCreateSideAccount } = require('./create-account');
const { login } = require('./login');
const { isMap } = require('./is-map');

module.exports = {
	getDragonsInGateways,
	transferDragon,
	isMap,
	mapAccounts,
	saveDragon,
	getDragon,
	deleteDragon,
	insertDragon,
	createAccount,
	getOrCreateSideAccount,
	login
};
