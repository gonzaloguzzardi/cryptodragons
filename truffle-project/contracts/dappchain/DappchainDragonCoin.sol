// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import '../common/DragonGoldERC20.sol';

/**
 * @title Dappchain ERC20 coin contract
 */
contract DappchainDragonCoin is DragonGoldERC20 {
	// Transfer Gateway contract address
	address public gateway;

	constructor(address _gateway) {
		gateway = _gateway;
	}

	// Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
	function mintToGateway(uint256 _amount) public {
		require(msg.sender == gateway, 'only the gateway is allowed to mint');
		_mint(gateway, _amount);
	}
}
