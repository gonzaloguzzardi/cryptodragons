// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import '../libraries/DragonLibrary.sol';

contract DragonSerializer {
	function decodeDragonFromBytes(bytes calldata _data) external pure returns (DragonLibrary.Dragon memory dragon) {
		(dragon.genes, dragon.name, dragon.creationTime, dragon.dadId) = decodeFirstThirdOfDragonFromBytes(_data);

		(
			dragon.motherId,
			dragon.currentExperience,
			dragon.actionCooldown,
			dragon.health,
			dragon.strength
		) = decodeSecondThirdOfDragonFromBytes(_data);

		(dragon.agility, dragon.fortitude, dragon.hatchTime, dragon.blockchainOriginId) = decodeThirdThirdOfDragonFromBytes(
			_data
		);
	}

	function decodeBlockchainIdFromData(bytes calldata _data) external pure returns (uint8 blockchainId) {
		blockchainId = uint8(_data[96]);
	}

	/**
        Packed dragon data in an array of bytes
    */
	function encodeDragonToBytes(DragonLibrary.Dragon memory _dragon) external pure returns (bytes memory) {
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

	/******************************************************************* */

	function decodeFirstThirdOfDragonFromBytes(bytes memory _data)
		private
		pure
		returns (
			bytes32 genes,
			bytes32 name,
			uint64 creationTime,
			uint32 dadId
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
	}

	function decodeSecondThirdOfDragonFromBytes(bytes memory _data)
		private
		pure
		returns (
			uint32 motherId,
			uint32 currentExperience,
			uint16 actionCooldown,
			uint16 health,
			uint16 strength
		)
	{
		uint256 counter = 76;

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
	}

	function decodeThirdThirdOfDragonFromBytes(bytes memory _data)
		private
		pure
		returns (
			uint16 agility,
			uint16 fortitude,
			uint16 hatchTime,
			uint8 blockchainOriginId
		)
	{
		uint256 counter = 90;

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

	/*************************************************** */
	function decodeFirstHalfOfDragonFromBytes(bytes calldata _data)
		external
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

	function decodeSecondHalfOfDragonFromBytes(bytes calldata _data)
		external
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
}
