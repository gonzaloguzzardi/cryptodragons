// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './DragonApi.sol';

contract MainnetDragonApi is DragonApi {
    constructor(address dragonAddress, address genesLaboratory) DragonApi(dragonAddress, genesLaboratory)  {
	}
}