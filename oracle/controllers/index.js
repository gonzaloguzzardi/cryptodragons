const { getDragonsInGateways } = require('./get-dragons-in-gateways');
const { transferDragon } = require('./transfer-dragon');
const { mapAccounts } = require('./map-accounts');
const { saveDragon } = require('./save-dragon');
const { getOrCreateSideAccount } = require('./create-account');
const { isMap } = require('./is-map');

module.exports = {
	getDragonsInGateways,
	transferDragon,
	getOrCreateSideAccount,
	isMap,
	mapAccounts,
	saveDragon,
};
