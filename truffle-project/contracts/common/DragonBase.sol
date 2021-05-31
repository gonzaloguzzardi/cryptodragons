// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './libraries/DragonLibrary.sol';
import './token/ERC721Enumerable.sol';
import './ownership/Ownable.sol';

contract DragonBase is ERC721Enumerable, Ownable {
	uint256 constant dnaDigits = 16;
	uint256 constant dnaModulus = 10**dnaDigits;

	// Holds all dragons in game
	DragonLibrary.Dragon[] internal dragons;

	// Maps dragon index corresponding to the dragon position in dragons array, to his owner address
	mapping(uint256 => address) public dragonIndexToOwner;

	/**
	 * @dev Throws if sender isn't the owner of the dragon in the parameter
	 */
	modifier onlyDragonOwner(uint256 _dragonId) {
		require(ownerOf(_dragonId) == msg.sender, "You don't own this dragon");
		_;
	}

	/*******************************************************************************************
        PUBLIC METHODS
    ********************************************************************************************/

	function getDragonsIdsByOwner(address owner) external view returns (uint256[] memory tokenIds) {
		uint256 balance = balanceOf(owner);

		for (uint256 i = 0; i < balance; i++) {
			tokenIds[i] = tokenOfOwnerByIndex(owner, i);
		}
	}

	/************************ Commented out wrapper functions ***********************
	function getDragonsCountByOwner(address _owner) external view returns (uint256) {
		return balanceOf(_owner);
	}

	function getDragonOwner(uint256 _dragonId) external view returns (address) {
		return ownerOf(_dragonId);
	}
	************************************************************************** */

	function getParents(uint256 _dragonId) public view returns (uint256 motherId, uint256 dadId) {
		DragonLibrary.Dragon storage dragon = dragons[_dragonId];
		return (dragon.motherId, dragon.dadId);
	}

	function isEgg(uint256 _dragonId) public view returns (bool) {
		DragonLibrary.Dragon storage dragon = dragons[_dragonId];
		uint256 lifeTimeSinceCreation = (block.timestamp - dragon.creationTime) * 60;
		return (lifeTimeSinceCreation < dragon.hatchTime);
	}

	function getDragonById(uint256 _dragonId)
		external
		view
		returns (
			bytes32 name,
			uint32 dadId,
			uint32 motherId,
			uint32 currentExperience,
			uint16 health,
			uint16 strength,
			uint16 agility,
			uint16 fortitude
		)
	{
		DragonLibrary.Dragon storage dragon = dragons[_dragonId];
		name = dragon.name;
		dadId = dragon.dadId;
		motherId = dragon.motherId;
		currentExperience = dragon.currentExperience;
		health = dragon.health;
		strength = dragon.strength;
		agility = dragon.agility;
		fortitude = dragon.fortitude;
	}

	/*******************************************************************************************
        ONLY OWNER ACTIONS
    ********************************************************************************************/

	function setName(uint256 _dragonId, string calldata _name) external onlyDragonOwner(_dragonId) {
		DragonLibrary.Dragon storage dragon = dragons[_dragonId];
		bytes32 nameBytes = _stringToBytes32(_name);
		require(nameBytes != 0x0, 'Empty names are not acceptable');
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

	/**
        Packed dragon data in an array of bytes
    */
	function _encodeDragonToBytes(DragonLibrary.Dragon memory _dragon) internal pure returns (bytes memory) {
		// TODO update size in bytes whenever dragon struct is updated
		uint256 size = 97; //32 + 32 + 8 + 4 + 4 + 4 + 2 + 2 + 2 + 2 + 2 + 2 + 1;
		bytes memory encodedData = new bytes(size);

		uint256 counter = 0;

		// encode 32 bytes from genes
		for (uint256 i = 0; i < 32; i++) {
			encodedData[counter] = _dragon.genes[i];
			counter++;
		}

		// encode 32 bytes from name
		for (uint256 i = 0; i < 32; i++) {
			encodedData[counter] = _dragon.name[i];
			counter++;
		}

		// encode 8 bytes from creation time
		for (uint256 i = 0; i < 8; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.creationTime >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 4 bytes from dad id
		for (uint256 i = 0; i < 4; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.dadId >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 4 bytes from mother id
		for (uint256 i = 0; i < 4; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.motherId >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 4 bytes from current experience
		for (uint256 i = 0; i < 4; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.currentExperience >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 2 bytes from action cooldown
		for (uint256 i = 0; i < 2; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.actionCooldown >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 2 bytes from health
		for (uint256 i = 0; i < 2; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.health >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 2 bytes from strength
		for (uint256 i = 0; i < 2; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.strength >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 2 bytes from agility
		for (uint256 i = 0; i < 2; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.agility >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 2 bytes from fortitude
		for (uint256 i = 0; i < 2; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.fortitude >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode 2 bytes from hatch time
		for (uint256 i = 0; i < 2; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.hatchTime >> ((8 * i) & uint32(255))));
			counter++;
		}

		// encode  byte from blockchain origin id
		for (uint256 i = 0; i < 1; i++) {
			encodedData[counter] = bytes1(uint8(_dragon.blockchainOriginId >> ((8 * i) & uint32(255))));
			counter++;
		}
		return encodedData;
	}
}
