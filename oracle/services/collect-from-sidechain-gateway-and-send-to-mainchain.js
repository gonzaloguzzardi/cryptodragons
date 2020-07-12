const { collection, database, mongoUrl } = require('../config');
const { collectEventsFromSidechainGateway } = require('../mongo-utils');

function transferDragonsToMain(dragons) {
  console.log('TODO: FINALIZE TRANSFER TO MAIN', dragons);
}

function collectFromSidechainGatewayAndSendToMainchain() {
  collectEventsFromSidechainGateway(database, mongoUrl, collection)
    .then((result) => {
      const dragons = result.map((event) => event.returnValues);
      if (dragons.length > 0) {
        transferDragonsToMain(dragons);
      }
    })
    .catch((err) => console.error(err));
}

module.exports = collectFromSidechainGatewayAndSendToMainchain;
