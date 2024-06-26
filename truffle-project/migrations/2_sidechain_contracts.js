const {
	writeFileSync
} = require('fs');

const DragonSerializer = artifacts.require('./common/serialization/DragonSerializer.sol');
const DragonToken = artifacts.require('./dappchain/DappchainTransferableDragon.sol');
const DragonCoin = artifacts.require('./dappchain/DappchainDragonCoin.sol');
const Gateway = artifacts.require('./dappchain/gateway/DappchainGateway.sol');
const GenesLaboratory = artifacts.require('./genes/GenesLaboratory.sol');
const DragonApi = artifacts.require('./public/DragonApi.sol');

module.exports = function (deployer, network, accounts) {
	if (network === 'rinkeby' || network === 'ganache' || network === 'bfa') {
		return;
	}

	console.log(`Deploying sidechain contracts to ${network}...`);

	const [_, user] = accounts;
	const validator = accounts[0];
	deployer.deploy(Gateway, [validator], 3, 4).then(async () => {
		const gatewayInstance = await Gateway.deployed();

		console.log(`Gateway deployed at address: ${gatewayInstance.address}`);

		const dragonSerializerContract = await deployer.deploy(DragonSerializer);
		const dragonSerializerInstance = await DragonSerializer.deployed();
		console.log(`DragonSerializer deployed at address: ${dragonSerializerInstance.address}`);
		console.log(`DragonSerializer transaction at hash: ${dragonSerializerContract.transactionHash}`);

		const dragonTokenContract = await deployer.deploy(
			DragonToken,
			gatewayInstance.address,
			dragonSerializerInstance.address,
			255,
		);
		const dragonTokenInstance = await DragonToken.deployed();

		console.log(`DragonToken deployed at address: ${dragonTokenInstance.address}`);
		console.log(`DragonToken transaction at hash: ${dragonTokenContract.transactionHash}`);

		const genesContract = await deployer.deploy(GenesLaboratory, dragonTokenInstance.address);
		const genesContractInstance = await GenesLaboratory.deployed();

		console.log(`GenesLaboratory deployed at address: ${genesContractInstance.address}`);
		console.log(`GenesLaboratory transaction at hash: ${genesContract.transactionHash}`);

		const dragonCoinContract = await deployer.deploy(DragonCoin, gatewayInstance.address);
		const dragonCoinInstance = await DragonCoin.deployed();

		console.log(`DragonCoin deployed at address: ${dragonCoinInstance.address}`);
		console.log(`DragonCoin transaction at hash: ${dragonCoinContract.transactionHash}`);

		const dragonApiContract = await deployer.deploy(DragonApi, dragonTokenInstance.address, genesContractInstance.address);
		const dragonApiInstance = await DragonApi.deployed();

		console.log(`DragonApi deployed at address: ${dragonApiInstance.address}`);
		console.log(`DragonApi transaction at hash: ${dragonApiContract.transactionHash}`);

		// map gateway and contract addresses
		await gatewayInstance.setERC721ContractAddress(dragonTokenInstance.address);

		// setup dragon contract
		await dragonTokenInstance.setGenesLaboratoryAddress(genesContractInstance.address);

		// await gatewayInstance.toggleToken(dragonTokenInstance.address, { from: validator })
		// await dragonTokenInstance.register(user)

		writeFileSync('../loom_gateway_address', gatewayInstance.address);
		writeFileSync('../loom_dragon_token_address', dragonTokenInstance.address);
		writeFileSync('../loom_dragon_token_tx_hash', dragonTokenContract.transactionHash);
		writeFileSync('../loom_dragon_coin_address', dragonCoinInstance.address);
		writeFileSync('../loom_dragon_coin_tx_hash', dragonCoinContract.transactionHash);
	});
};