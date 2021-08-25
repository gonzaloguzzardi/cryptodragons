// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './DragonApi.sol';
import '../common/ownership/Ownable.sol';

interface IMarketplace {
	function createSellOrder(
		uint256 dragonId,
		string calldata title,
		string calldata description,
		uint256 price
	) external;
}

contract MainnetDragonApi is DragonApi, Ownable {
    address private _marketplaceAddress;

    constructor(address dragonAddress, address genesLaboratory, address marketplaceAddress) DragonApi(dragonAddress, genesLaboratory)  {
		require(marketplaceAddress != address(0), 'Invalid marketplace address');
		_marketplaceAddress = marketplaceAddress;
	}

    /*******************************************************************************************
        Modifiers
    ********************************************************************************************/
	/**
	 * @dev Throws if sender isn't the owner of the dragon in the parameter
	 */
	modifier onlyDragonOwner(uint256 _dragonId) {
		require(IERC721Enumerable(_dragonAddress).ownerOf(_dragonId) == msg.sender, 'Not owner');
		_;
	}

	/*******************************************************************************************
        Actions
    ********************************************************************************************/
    /**
	 * @dev set marketplace contract address
	 */
    function setMarketplace(address marketplaceAddress) external onlyOwner {
		require(marketplaceAddress != address(0), 'Invalid address');
		_marketplaceAddress = marketplaceAddress;
	}

    /**
	 * @dev Publish a dragon in the marketplace to be available for buyers
	 */
    function publishDragon(
		uint256 tokenId,
		string calldata title,
		string calldata description,
		uint256 price
	) external onlyDragonOwner(tokenId) {
		require(_marketplaceAddress != address(0), 'Unavailable marketplace');
		require(bytes(title).length > 0, 'Empty title');
		require(bytes(description).length > 0, 'Empty description');
		require(price > 0, 'Empty price');

		// Allow marketplace to transfer ownership
		IERC721Enumerable(_dragonAddress).approve(_marketplaceAddress, tokenId);

		IMarketplace(_marketplaceAddress).createSellOrder(tokenId, title, description, price);
	}
}