const { collection, database, mongoUrl } = require('../config');
const { mainChainGatewayInstance } = require('./contracts-instances');
const { collectEventsFromSidechainGateway } = require('../mongo-utils');

function transferDragonsToMain(dragons) {
  console.log('TODO: FINALIZE TRANSFER TO MAIN', dragons);
  if (!!dragons && dragons.length > 0) {
    dragons.forEach((dragon) => {
      const senderAddress = '0x28863498efede12296888f7ca6cf0b94974fbdbc' || dragon.from;
      const receiverAddress = dragon.toMainchainAddress;
      const dragonId = dragon.uid;
      const dragonData = dragon.data;

      try {
        mainChainGatewayInstance.methods
          .receiveDragon(receiverAddress, dragonId, dragonData)
          .send({ from: senderAddress, gas: 35000 });
      } catch (err) {
        console.error(err);
      }
    });
  }
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
