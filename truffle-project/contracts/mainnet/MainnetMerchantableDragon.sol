// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './MainnetTransferableDragon.sol';

interface IMarketplace {
	function createSellOrder(
		uint256 dragonId,
		string calldata title,
		string calldata description,
		uint256 price
	) external;
}

contract MainnetMerchantableDragon is MainnetTransferableDragon {
	address private marketplaceAddress;

	constructor(
		address gateway,
		address dragonDecoder,
		uint8 blockchainId
	) MainnetTransferableDragon(gateway, dragonDecoder, blockchainId) {}

	function setMarketplace(address _marketplaceAddress) external onlyOwner {
		require(_marketplaceAddress != address(0), 'Invalid address');
		marketplaceAddress = _marketplaceAddress;
	}

	function publishDragon(
		uint256 _tokenId,
		string calldata _title,
		string calldata _description,
		uint256 _price
	) external onlyDragonOwner(_tokenId) {
		require(marketplaceAddress != address(0), 'Invalid  address');
		require(bytes(_title).length > 0, 'Empty title');
		require(bytes(_description).length > 0, 'Empty desc');
		require(_price > 0, 'Empty price');

		// Allow marketplace to transfer ownership
		approve(marketplaceAddress, _tokenId);

		IMarketplace(marketplaceAddress).createSellOrder(_tokenId, _title, _description, _price);
	}
}
