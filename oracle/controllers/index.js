const { getDragonsInGateways } = require('./get-dragons-in-gateways');
const { transferDragon } = require('./transfer-dragon');
const { mapAccounts } = require('./map-accounts');
const { saveDragon } = require('./save-dragon');
const { getDragon } = require('./get-dragon');

module.exports = {
	getDragonsInGateways,
	transferDragon,
	mapAccounts,
	saveDragon,
	getDragon
};
