pragma solidity ^0.5.0;

import './token/ERC721Enumerable.sol';
import './ownership/Ownable.sol';

contract DragonBase is ERC721Enumerable, Ownable {
	uint256 constant dnaDigits = 16;
	uint256 constant dnaModulus = 10**dnaDigits;

	struct Dragon {
		bytes32 genes;
		bytes32 name; // maybe we can avoid saving the name in teh blockchain
		uint64 creationTime; // Initialzed at egg instantiation
		// parents information
		uint32 dadId;
		uint32 motherId;
		// level attributes
		uint32 currentExperience; // level will ve determined by exp
		uint16 actionCooldown; // time to be waited to perform an action
		// fighting attributes
		uint16 health;
		uint16 strength;
		uint16 agility;
		uint16 fortitude;
		uint16 hatchTime; // in minutes, capped to 45 days - Maybe it would be nice to reuse some variable like current exp
		uint8 blockchainOriginId;
	}

	// Holds all dragons in game
	Dragon[] internal dragons;

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

	function getDragonsIdsByOwner(address _owner) external view returns (uint256[] memory) {
		return _ownedTokens[_owner];
	}

	function getDragonsCountByOwner(address _owner) external view returns (uint256) {
		return balanceOf(_owner);
	}

	function getDragonOwner(uint256 _dragonId) external view returns (address) {
		return ownerOf(_dragonId);
	}

	function getParents(uint256 _dragonId) public view returns (uint256 motherId, uint256 dadId) {
		Dragon storage dragon = dragons[_dragonId];
		return (dragon.motherId, dragon.dadId);
	}

	function isEgg(uint256 _dragonId) public view returns (bool) {
		Dragon storage dragon = dragons[_dragonId];
		uint256 lifeTimeSinceCreation = (now - dragon.creationTime) * 60;
		return (lifeTimeSinceCreation < dragon.hatchTime);
	}

	function getDragonName(uint256 _dragonId) external view returns (bytes32) {
		return dragons[_dragonId].name;
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
		Dragon storage dragon = dragons[_dragonId];
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
		Dragon storage dragon = dragons[_dragonId];
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
	 * @return bytes32
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
	function _encodeDragonToBytes(Dragon memory _dragon) internal pure returns (bytes memory) {
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

	function _decodeFirstHalfOfDragonFromBytes(bytes memory _data)
		internal
		pure
		returns (
			bytes32 genes,
			bytes32 name,
			uint64 creationTime,
			uint32 dadId,
			uint32 motherId,
			uint32 currentExperience
		)
	{
		uint256 counter = 0;

		// Decode genes
		for (uint256 i = 0; i < 32; i++) {
			genes |= bytes32(_data[counter + i] & 0xFF) >> (i * 8);
			counter++;
		}

		// Decode name
		name = _decodeName(_data, counter);
		counter += 32;

		// Decode creation time
		for (uint256 i = 0; i < 8; i++) {
			uint64 temp = uint64(uint8(_data[counter]));
			temp <<= 8 * i;
			creationTime ^= temp;
			counter++;
		}

		// Decode dad id
		for (uint256 i = 0; i < 4; i++) {
			uint32 temp = uint32(uint8(_data[counter]));
			temp <<= 8 * i;
			dadId ^= temp;
			counter++;
		}

		// Decode mother id
		for (uint256 i = 0; i < 4; i++) {
			uint32 temp = uint32(uint8(_data[counter]));
			temp <<= 8 * i;
			motherId ^= temp;
			counter++;
		}

		// Decode current experience
		for (uint256 i = 0; i < 4; i++) {
			uint32 temp = uint32(uint8(_data[counter]));
			temp <<= 8 * i;
			currentExperience ^= temp;
			counter++;
		}
	}

	function _decodeSecondHalfOfDragonFromBytes(bytes memory _data)
		internal
		pure
		returns (
			uint16 actionCooldown,
			uint16 health,
			uint16 strength,
			uint16 agility,
			uint16 fortitude,
			uint16 hatchTime,
			uint8 blockchainOriginId
		)
	{
		uint256 counter = 84;

		// Decode action cooldown
		for (uint256 i = 0; i < 2; i++) {
			uint16 temp = uint16(uint8(_data[counter]));
			temp <<= 8 * i;
			actionCooldown ^= temp;
			counter++;
		}

		// Decode health
		for (uint256 i = 0; i < 2; i++) {
			uint16 temp = uint16(uint8(_data[counter]));
			temp <<= 8 * i;
			health ^= temp;
			counter++;
		}

		// Decode strength
		for (uint256 i = 0; i < 2; i++) {
			uint16 temp = uint16(uint8(_data[counter]));
			temp <<= 8 * i;
			strength ^= temp;
			counter++;
		}

		// Decode agility
		for (uint256 i = 0; i < 2; i++) {
			uint16 temp = uint16(uint8(_data[counter]));
			temp <<= 8 * i;
			agility ^= temp;
			counter++;
		}

		// Decode fortitude
		for (uint256 i = 0; i < 2; i++) {
			uint16 temp = uint16(uint8(_data[counter]));
			temp <<= 8 * i;
			fortitude ^= temp;
			counter++;
		}

		// Decode hatch time
		for (uint256 i = 0; i < 2; i++) {
			uint16 temp = uint16(uint8(_data[counter]));
			temp <<= 8 * i;
			hatchTime ^= temp;
			counter++;
		}

		// Decode blockchain origin id
		blockchainOriginId ^= uint8(_data[counter]);
		counter++;
	}

	function _decodeName(bytes memory _data, uint256 _dataIndex) private pure returns (bytes32 name) {
		for (uint256 i = 0; i < 32; i++) {
			name |= bytes32(_data[_dataIndex + i] & 0xFF) >> (i * 8);
		}
	}

	function _decodeBlockchainIdFromData(bytes memory _data) internal pure returns (uint8 blockchainId) {
		blockchainId = uint8(_data[96]);
	}
}
