// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import '../common/DragonFactory.sol';
import '../common/libraries/DragonLibrary.sol';

interface IDappchainGateway {
	function depositDragon(
		address from,
		address to,
		uint256 uid,
		bytes calldata data
	) external;
}

contract DappchainTransferableDragon is DragonFactory {
	// map sidechain address to mainchain address
	mapping(address => address) private _sidechainAddressToMainchain;

	constructor(
		address gateway,
		address dragonDecoder,
		uint8 blockchainId
	) DragonFactory(gateway, dragonDecoder, blockchainId) {}

	// Setter to update who the gateway is
	function setGatewayAddress(address gateway) external onlyOwner {
		//TODO check address is a gateway
		require(gateway != address(0), 'gateway should have a valid address');
		_gateway = gateway;
	}

	// Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
	function retrieveToken(
		address receiver,
		uint256 _tokenId,
		bytes memory _data
	) public {
		require(msg.sender == _gateway, 'only the gateway is allowed to call this function');
		require(receiver != address(0), 'Receiver should be a valid address');
		_mintReceivedDragon(receiver, _tokenId, _data);
	}

	function undoMapping(address owner, address mainnetAddress) external onlyOwner {
		require(owner != address(0), 'Invalid owner address to be mapped');
		require(mainnetAddress != address(0), 'Invalid mainnet address to be mapped');
		_sidechainAddressToMainchain[owner] = mainnetAddress;
	}

	function mapContractToMainnet(address mainnetAddress) external {
		require(mainnetAddress != address(0), 'Invalid mainnet address to be mapped');
		require(
			_sidechainAddressToMainchain[msg.sender] == address(0),
			'Address already mapped. Request owner to undo the mapping'
		);
		_sidechainAddressToMainchain[msg.sender] = mainnetAddress;
	}

	function isMap(address mainnetAddress) external view returns (bool) {
		require(mainnetAddress != address(0), 'Invalid mainnet address');
		return _sidechainAddressToMainchain[msg.sender] == mainnetAddress;
	}

	function transferToGateway(uint256 _tokenId) public onlyDragonOwner(_tokenId) {
		require(
			_sidechainAddressToMainchain[msg.sender] != address(0),
			'Blockchains should be mapped to allow transferences'
		);
		require(_tokenId < dragons.length, 'Invalid token Id');

		DragonLibrary.Dragon memory dragon = dragons[_tokenId];
		bytes memory encodedDragon = IDragonSerializer(_dragonDecoderAddress).encodeDragonToBytes(dragon);

		// Transfer ownership
		transferFrom(msg.sender, _gateway, _tokenId);

		// Trigger trnsference in gateway
		IDappchainGateway gateway = IDappchainGateway(_gateway);
		uint256 originalTokenId = dragon.blockchainOriginId == _blockchainId ? _tokenId : _getForeignTokenId(_tokenId);
		gateway.depositDragon(msg.sender, _sidechainAddressToMainchain[msg.sender], originalTokenId, encodedDragon);
	}
}
