// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './DragonApi.sol';

contract MainnetDragonApi is DragonApi {

    address private _marketplaceAddress;

    constructor(address dragonAddress, address genesLaboratory, address marketplaceAddress) DragonApi(dragonAddress, genesLaboratory)  {
        require(genesLaboratory != address(0), 'Invalid marketplace address');
		_marketplaceAddress = marketplaceAddress;
	}

    function isDragonOnSale(address dragonOwner) internal virtual override view returns (bool) {
		return dragonOwner == _marketplaceAddress;
	}
}