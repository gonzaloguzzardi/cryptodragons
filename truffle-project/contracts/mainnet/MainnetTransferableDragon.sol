pragma solidity ^0.8.0;

// SPDX-License-Identifier: GPL-3.0 License

import '../common/DragonFactory.sol';

interface IMainnetGateway {
	function depositDragon(
		address from,
		address to,
		uint256 uid,
		bytes calldata data
	) external;
}

contract MainnetTransferableDragon is DragonFactory {
	// map mainnet address to sidechain address
	mapping(address => address) private _mainnetAddressToSidechain;

	constructor(
		address gateway,
		address dragonDecoder,
		uint8 blockchainId
	) DragonFactory(gateway, dragonDecoder, blockchainId) {}

	// Setter to update who the gateway is
	function setGatewayAddress(address gateway) external onlyOwner {
		require(gateway != address(0), 'gateway should have a valid address');
		_gateway = gateway;
	}

	function retrieveToken(
		address receiver,
		uint256 _tokenId,
		bytes memory _data
	) public {
		require(msg.sender == _gateway, 'only the gateway is allowed to call this function');
		require(receiver != address(0), 'Receiver should be a valid address');
		_mintReceivedDragon(receiver, _tokenId, _data);
	}

	function undoMapping(address owner, address sidechainAddress) external onlyOwner {
		require(owner != address(0), 'Invalid owner address to be mapped');
		require(sidechainAddress != address(0), 'Invalid sidechain address to be mapped');
		_mainnetAddressToSidechain[owner] = sidechainAddress;
	}

	function mapContractToSidechain(address sidechainAddress) external {
		require(sidechainAddress != address(0), 'Invalid sidechain address to be mapped');
		require(
			_mainnetAddressToSidechain[msg.sender] == address(0),
			'Address already mapped. Request owner to undo the mapping'
		);
		_mainnetAddressToSidechain[msg.sender] = sidechainAddress;
	}

	function isMap(address sidechainAddress) external view returns (bool) {
		require(sidechainAddress != address(0), 'Invalid sidechain address');
		return _mainnetAddressToSidechain[msg.sender] == sidechainAddress;
	}

	function transferToGateway(uint256 _tokenId) public onlyDragonOwner(_tokenId) {
		require(
			_mainnetAddressToSidechain[msg.sender] != address(0),
			'Blockchains should be mapped to allow transferences'
		);
		require(_tokenId < dragons.length, 'Invalid token Id');

		DragonLibrary.Dragon memory dragon = dragons[_tokenId];
		bytes memory encodedDragon = IDragonSerializer(_dragonDecoderAddress).encodeDragonToBytes(dragon);

		// Transfer ownership
		transferFrom(msg.sender, _gateway, _tokenId);

		// Trigger trnsference in gateway

		IMainnetGateway gateway = IMainnetGateway(_gateway);
		uint256 originalTokenId = dragon.blockchainOriginId == _blockchainId ? _tokenId : _getForeignTokenId(_tokenId);
		gateway.depositDragon(msg.sender, _mainnetAddressToSidechain[msg.sender], originalTokenId, encodedDragon);
	}
}
