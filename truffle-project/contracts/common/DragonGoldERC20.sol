// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './token/ERC20.sol';
import './access/roles/Spender.sol';
import './access/roles/Minter.sol';

/**
 * @title DragonGold
 * @dev ERC20 with minting and burning logic so that it can be used as ingame virtual currency
 */
contract DragonGoldERC20 is ERC20, Spender, Minter {
	/**
	 * @dev Function to mint tokens
	 * @param to The address that will receive the minted tokens.
	 * @param value The amount of tokens to mint.
	 * @return A boolean that indicates if the operation was successful.
	 */
	function mint(address to, uint256 value) public onlyMinter returns (bool) {
		_mint(to, value);
		return true;
	}

	/**
	 * @dev Burns a specific amount of tokens from the target address and decrements allowance
	 * @param from address The address which you want to send tokens from
	 * @param value uint256 The amount of token to be burned
	 */
	function spendFrom(address from, uint256 value) public onlySpender {
		_burn(from, value);
	}
}
