const {
	writeFileSync
} = require('fs');

const DragonSerializer = artifacts.require('./common/serialization/DragonSerializer.sol');
const DragonToken = artifacts.require('./mainnet/MainnetMerchantableDragon.sol');
const Gateway = artifacts.require('./mainnet/gateway/MainnetGateway.sol');
const GenesLaboratory = artifacts.require('./genes/GenesLaboratory.sol');
const Marketplace = artifacts.require('./mainnet/marketplace/MainnetMarketplace.sol');

module.exports = function (deployer, network, accounts) {
	if (network !== 'rinkeby' && network !== 'ganache' && network !== 'bfa') {
		return;
	}

	console.log(`Deploying mainnet contracts to ${network}...`);

	const [_, user] = accounts;

	const validator = accounts[0];

	console.log(`VALIDATOR = ${validator}`);

	deployer.deploy(Gateway, accounts, 3, 4).then(async () => {
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
			128,
		);
		const dragonTokenInstance = await DragonToken.deployed();

		console.log(`DragonToken deployed at address: ${dragonTokenInstance.address}`);
		console.log(`DragonToken transaction at hash: ${dragonTokenContract.transactionHash}`);

		const genesContract = await deployer.deploy(GenesLaboratory, dragonTokenInstance.address);
		const genesContractInstance = await GenesLaboratory.deployed();

		console.log(`GenesLaboratory deployed at address: ${genesContractInstance.address}`);
		console.log(`GenesLaboratory transaction at hash: ${genesContract.transactionHash}`);

		const marketplaceContract = await deployer.deploy(Marketplace, dragonTokenInstance.address);
		const marketplaceContractInstance = await Marketplace.deployed();

		console.log(`Marketplace deployed at address: ${marketplaceContractInstance.address}`);
		console.log(`Marketplace transaction at hash: ${marketplaceContract.transactionHash}`);

		// await gatewayInstance.toggleToken(dragonTokenInstance.address, { from: validator })
		// await dragonTokenInstance.register(user)

		// map gateway and contract addresses
		await gatewayInstance.setERC721ContractAddress(dragonTokenInstance.address);

		// setup dragon contract
		await dragonTokenInstance.setGenesLaboratoryAddress(genesContractInstance.address);
		await dragonTokenInstance.setMarketplace(marketplaceContractInstance.address);

		writeFileSync('../mainnet_gateway_address', gatewayInstance.address);
		writeFileSync('../mainnet_dragon_token_address', dragonTokenInstance.address);
		writeFileSync('../mainnet_dragon_token_tx_hash', dragonTokenContract.transactionHash);
	});
};