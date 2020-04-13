const { getDragonsInGateways } = require('./get-dragons-in-gateways');
const { transferDragon } = require('./transfer-dragon');
const { mapAccounts } = require('./map-accounts');
const { saveDragon } = require('./save-dragon');
const { getDragon } = require('./get-dragon');
const {
    _deleteDragon,
    _insertDragon
} = require('./common');

module.exports = {
	getDragonsInGateways,
	transferDragon,
	mapAccounts,
	saveDragon,
	getDragon,
	_deleteDragon,
    _insertDragon
};
