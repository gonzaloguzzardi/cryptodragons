const { collection, database, mongoUrl } = require('../config');
const { sideChainGatewayInstance } = require('./contracts-instances');
const { collectEventsFromMainchainGateway } = require('../mongo-utils');

function transferDragonsToSide(dragons) {
  console.log('TODO: FINALIZE TRANSFER TO SIDE', dragons);
  if (!!dragons && dragons.length > 0) {
    dragons.forEach((dragon) => {
      const senderAddress = '0xfee39fad945754831b59b92a1a8339f65358792d' || dragon.from;
      const receiverAddress = dragon.toSidechainAddress;
      const dragonId = dragon.uid;
      const dragonData = dragon.data;
        // Con este hardcode para senderAddress funciona, pero revisar que onda
        // REVISAR
				// senderAddress:  0xfee39fad945754831b59b92a1a8339f65358792d
        // dragon.from:  0x28863498efeDE12296888F7CA6Cf0B94974fBdbc
        // {
        //   '0': '0x28863498efeDE12296888F7CA6Cf0B94974fBdbc',
        //   '1': '1',
        //   '2': '0xfeE39FAD945754831B59b92A1a8339F65358792d',
        //   '3': '0x7ede1c64030000000000000000000000000000000000000000000000000000007465737420647261676f6e0000000000000000000000000000000000000000000100000000000000020000000200000000000000000032000700070007003c00ff',
        //   from: '0x28863498efeDE12296888F7CA6Cf0B94974fBdbc',
        //   uid: '1',
        //   toSidechainAddress: '0xfeE39FAD945754831B59b92A1a8339F65358792d',
        //   data: '0x7ede1c64030000000000000000000000000000000000000000000000000000007465737420647261676f6e0000000000000000000000000000000000000000000100000000000000020000000200000000000000000032000700070007003c00ff'
        // }
      sideChainGatewayInstance.methods
        .receiveDragon(receiverAddress, dragonId, dragonData)
        .send({ from: senderAddress, gas: 350000 });
    });
  }
}

function collectFromMainchainGatewayAndSendToSidechain() {
  collectEventsFromMainchainGateway(database, mongoUrl, collection)
    .then((result) => {
      const dragons = result.map((event) => event.returnValues);
      if (dragons.length > 0) {
        transferDragonsToSide(dragons);
      }
    })
    .catch((err) => console.error(err));
}

module.exports = collectFromMainchainGatewayAndSendToSidechain;
