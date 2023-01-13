// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './DragonApi.sol';

interface IMarketplace {
	function cancelListing(uint256 listingId) external;
    function geListingId(uint256 tokenId) external view returns (uint256);
    function listToken(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable;
}

contract MainnetDragonApi is DragonApi {

    address private _marketplaceAddress;

    constructor(address dragonAddress, address genesLaboratory, address marketplaceAddress) DragonApi(dragonAddress, genesLaboratory)  {
        require(genesLaboratory != address(0), 'Invalid marketplace address');
		_marketplaceAddress = marketplaceAddress;
	}

    function listToken(uint256 tokenId, uint256 price) external payable {
        IMarketplace(_marketplaceAddress).listToken(_dragonAddress, tokenId, price);
	}

    function cancelListing(uint256 tokenId) external {
        IMarketplace marketplace = IMarketplace(_marketplaceAddress);
		uint256 listingId = marketplace.geListingId(tokenId);
        marketplace.cancelListing(listingId);
	}

    function isDragonOnSale(address dragonOwner) internal virtual override view returns (bool) {
		return dragonOwner == _marketplaceAddress;
	}
}