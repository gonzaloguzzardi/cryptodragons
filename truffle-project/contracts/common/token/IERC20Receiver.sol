// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title ERC20 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 *  from ERC20 asset contracts.
 */
abstract contract IERC20Receiver {
	bytes4 constant ERC20_RECEIVED = 0xbc04f0af;

	/**
	 * @dev Magic value to be returned upon successful reception of an NFT
	 *  Equals to `bytes4(keccak256("onERC20Received(address,uint256,bytes)"))`,
	 *  which can be also obtained as `ERC20Receiver(0).onERC20Received.selector`
	 */

	function onERC20Received(address _from, uint256 amount) public virtual returns (bytes4);
}
