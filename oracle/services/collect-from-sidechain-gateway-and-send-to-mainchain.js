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
					// Con este hardcode para senderAddress funciona, pero revisar que onda
					// REVISAR
					// senderAddress:  0x28863498efede12296888f7ca6cf0b94974fbdbc
					// dragon.from:  0xfeE39FAD945754831B59b92A1a8339F65358792d
					// {
					// 	'0': '0xfeE39FAD945754831B59b92A1a8339F65358792d',
					// 	'1': '1',
					// 	'2': '0x28863498efeDE12296888F7CA6Cf0B94974fBdbc',
					// 	'3': '0x7ede1c64030000000000000000000000000000000000000000000000000000007465737420647261676f6e0000000000000000000000000000000000000000000100000000000000020000000200000000000000000032000700070007003c00ff',
					// 	from: '0xfeE39FAD945754831B59b92A1a8339F65358792d',
					// 	uid: '1',
					// 	toMainchainAddress: '0x28863498efeDE12296888F7CA6Cf0B94974fBdbc',
					// 	data: '0x7ede1c64030000000000000000000000000000000000000000000000000000007465737420647261676f6e0000000000000000000000000000000000000000000100000000000000020000000200000000000000000032000700070007003c00ff'
					// }
				mainChainGatewayInstance.methods
					.receiveDragon(receiverAddress, dragonId, dragonData)
					.send({ from: senderAddress, gas: 450000 });
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
