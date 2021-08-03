// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './libraries/DragonLibrary.sol';
import './token/ERC721Enumerable.sol';
import './ownership/Ownable.sol';

contract DragonBase is ERC721Enumerable, Ownable {
	// Holds all dragons in game
	DragonLibrary.Dragon[] internal dragons;

	// Maps dragon index corresponding to the dragon position in dragons array, to his owner address
	mapping(uint256 => address) public dragonIndexToOwner;

	/**
	 * @dev Throws if sender isn't the owner of the dragon in the parameter
	 */
	modifier onlyDragonOwner(uint256 _dragonId) {
		require(ownerOf(_dragonId) == msg.sender, 'Not owner');
		_;
	}

	/*******************************************************************************************
        PUBLIC METHODS
    ********************************************************************************************/
	function getDragonById(uint256 _dragonId) external view returns (DragonLibrary.Dragon memory) {
		return dragons[_dragonId];
	}

	/*******************************************************************************************
        ONLY OWNER ACTIONS
    ********************************************************************************************/

	function setName(uint256 _dragonId, string calldata _name) external onlyDragonOwner(_dragonId) {
		DragonLibrary.Dragon storage dragon = dragons[_dragonId];
		bytes32 nameBytes = _stringToBytes32(_name);
		require(nameBytes != 0x0, 'Empty name');
		dragon.name = nameBytes;
	}

	/*******************************************************************************************
        UTILS
    ********************************************************************************************/

	/**
	 * @notice String to bytes 32
	 * @dev Helper to convert a string to a bytes32
	 * @param _string the string to convert
	 * @return result as bytes32
	 */
	function _stringToBytes32(string memory _string) internal pure returns (bytes32 result) {
		bytes memory tempEmptyStringTest = bytes(_string);
		if (tempEmptyStringTest.length == 0) {
			return 0x0;
		}

		assembly {
			result := mload(add(_string, 32))
		}
	}
}
