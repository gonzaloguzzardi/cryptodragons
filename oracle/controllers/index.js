const { getDragonsInGateways } = require('./get-dragons-in-gateways');
const { saveDragon } = require('./save-dragon');
const { getOrCreateSideAccount } = require('./create-account');
const { isMap } = require('./is-map');

module.exports = {
	getDragonsInGateways,
	getOrCreateSideAccount,
	isMap,
	saveDragon,
};
