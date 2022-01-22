// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import "../common/libraries/DragonLibrary.sol";

contract GenesLaboratory {
	address private _dragonContractAddress;
	uint256 private _randomNonce;

	constructor(address dragonAddress) {
		require(dragonAddress != address(0), 'Invalid dragon address address');
		_dragonContractAddress = dragonAddress;
	}

	modifier onlyFromDragonContract() {
		_;
	}

	function createNewDragonGenes()
		public
		onlyFromDragonContract
		returns (
			bytes32 genes,
			uint16 initialHealth,
			uint16 initialStrength,
			uint16 initialAgility,
			uint16 initialFortitude,
			uint16 actionCooldown,
			uint16 hatchTime
		)
	{
		(genes, initialHealth) = createInitialHealthValue(genes);
		genes = createMaxHealthValue(genes);
		(genes, initialStrength) = createInitialStrengthValue(genes);
		genes = createMaxStrengthValue(genes);
		(genes, initialAgility) = createInitialAgilityValue(genes);
		genes = createMaxAgilityValue(genes);
		(genes, initialFortitude) = createInitialFortitudeValue(genes);
		genes = createMaxFortitudeValue(genes);
		(genes, actionCooldown) = createActionCooldown(genes);
		(genes, hatchTime) = createHatchTime(genes);
		genes = createHead(genes);
		genes = createBody(genes);
		genes = createWings(genes);
		genes = createGeneration(genes);
	}

	function createChildGenes(bytes32 fatherGenes, bytes32 motherGenes)
		public
		onlyFromDragonContract
		returns (
			bytes32 childGenes,
			uint16 initialHealth,
			uint16 initialStrength,
			uint16 initialAgility,
			uint16 initialFortitude,
			uint16 actionCooldown,
			uint16 hatchTime
		)
	{
		(childGenes, initialHealth) = getChildInitialHealth(childGenes, fatherGenes, motherGenes);
		childGenes = getChildMaxHealth(childGenes, fatherGenes, motherGenes);
		(childGenes, initialStrength) = getChildInitialStrength(childGenes, fatherGenes, motherGenes);
		childGenes = getChildMaxStrength(childGenes, fatherGenes, motherGenes);
		(childGenes, initialAgility) = getChildInitialAgility(childGenes, fatherGenes, motherGenes);
		childGenes = getChildMaxAgility(childGenes, fatherGenes, motherGenes);
		(childGenes, initialFortitude) = getChildInitialFortitude(childGenes, fatherGenes, motherGenes);
		childGenes = getChildMaxFortitude(childGenes, fatherGenes, motherGenes);
		(childGenes, actionCooldown) = getChildActionCooldown(childGenes, fatherGenes, motherGenes);
		(childGenes, hatchTime) = getChildHatchTime(childGenes, fatherGenes, motherGenes);

		childGenes = getChildBodyType(childGenes, fatherGenes, motherGenes);
		childGenes = getChildBodyColor(childGenes, fatherGenes, motherGenes);
		childGenes = getChildBodyPatternType(childGenes, fatherGenes, motherGenes);
		childGenes = getChildBodyPatternColor(childGenes, fatherGenes, motherGenes);
		childGenes = getChildWingsType(childGenes, fatherGenes, motherGenes);
		childGenes = getChildWingsColor(childGenes, fatherGenes, motherGenes);
		childGenes = getChildHornsType(childGenes, fatherGenes, motherGenes);
		childGenes = getChildHornsColor(childGenes, fatherGenes, motherGenes);
		childGenes = getChildEyesType(childGenes, fatherGenes, motherGenes);
		childGenes = getChildEyesColor(childGenes, fatherGenes, motherGenes);
		childGenes = getChildTailType(childGenes, fatherGenes, motherGenes);
		childGenes = getChildTailColor(childGenes, fatherGenes, motherGenes);
	}

	function getVisualAttributes(bytes32 genes) external pure returns (DragonLibrary.DragonVisualAttributes memory) {
		DragonLibrary.DragonVisualAttributes memory visualAttributes = DragonLibrary.DragonVisualAttributes({
			bodyType: getBodyTypeFromBytes(genes),
			bodyColor: getBodyColorFromBytes(genes),
			bodyPatternType: getBodyPatternTypeFromBytes(genes),
			bodyPatternColor: getBodyPatternColorFromBytes(genes),
			wingsType: getWingsTypeFromBytes(genes),
			wingsColor: getWingsColorFromBytes(genes),
			hornsType: getHornsTypeFromBytes(genes),
			hornsColor: getHornsColorFromBytes(genes),
			eyesType: getEyesTypeFromBytes(genes),
			eyesColor: getEyesColorFromBytes(genes),
			tailType: getTailTypeFromBytes(genes),
			tailColor: getTailColorFromBytes(genes)
		});
		return visualAttributes;
	}

	/************************** Genes creation ***************************************** */

	function createInitialHealthValue(bytes32 genes) private returns (bytes32, uint16) {
		uint256 value = random(16, 22);
		uint256 shiftedValue = value << (30 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return (bytes32(result), uint16(value));
	}

	function createMaxHealthValue(bytes32 genes) private returns (bytes32) {
		uint256 value = random(175, 225);
		uint256 shiftedValue = value << (28 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createInitialStrengthValue(bytes32 genes) private returns (bytes32, uint16) {
		uint256 value = random(4, 6);
		uint256 shiftedValue = value << (26 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return (bytes32(result), uint16(value));
	}

	function createMaxStrengthValue(bytes32 genes) private returns (bytes32) {
		uint256 value = random(50, 75);
		uint256 shiftedValue = value << (24 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createInitialAgilityValue(bytes32 genes) private returns (bytes32, uint16) {
		uint256 value = random(4, 6);
		uint256 shiftedValue = value << (22 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return (bytes32(result), uint16(value));
	}

	function createMaxAgilityValue(bytes32 genes) private returns (bytes32) {
		uint256 value = random(50, 75);
		uint256 shiftedValue = value << (20 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createInitialFortitudeValue(bytes32 genes) private returns (bytes32, uint16) {
		uint256 value = random(4, 6);
		uint256 shiftedValue = value << (18 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return (bytes32(result), uint16(value));
	}

	function createMaxFortitudeValue(bytes32 genes) private returns (bytes32) {
		uint256 value = random(50, 75);
		uint256 shiftedValue = value << (16 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createActionCooldown(bytes32 genes) private pure returns (bytes32, uint16) {
		uint256 value = 180;
		uint256 shiftedValue = value << (14 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return (bytes32(result), uint16(value));
	}

	function createHatchTime(bytes32 genes) private pure returns (bytes32, uint16) {
		uint256 value = 360;
		uint256 shiftedValue = value << (12 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return (bytes32(result), uint16(value));
	}

	function createHead(bytes32 genes) private returns (bytes32) {
		uint256 headsAmount = 5;
		uint256 value = random(0, headsAmount);

		uint256 shiftedValue = value << (10 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createBody(bytes32 genes) private returns (bytes32) {
		uint256 bodyAmount = 5;
		uint256 value = random(0, bodyAmount);

		uint256 shiftedValue = value << (8 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createWings(bytes32 genes) private returns (bytes32) {
		uint256 wingsAmount = 5;
		uint256 value = random(0, wingsAmount);

		uint256 shiftedValue = value << (6 * 8);
		uint256 result = shiftedValue | uint256(genes);
		return bytes32(result);
	}

	function createGeneration(bytes32 genes) private pure returns (bytes32) {
		uint256 generation = 1;
		uint256 result = generation | uint256(genes);
		return bytes32(result);
	}

	/******************************* Genes propagation ****************************************************/

	function getChildInitialHealth(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32, uint16) {
		uint16 fatherInitialHealth = getInitialHealthFromBytes(fatherGenes);
		uint16 motherInitialHealth = getInitialHealthFromBytes(motherGenes);

		uint256 childInitialHealth = generateChildValue(fatherInitialHealth, motherInitialHealth);

		uint256 shiftedValue = childInitialHealth << (30 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return (bytes32(result), uint16(childInitialHealth));
	}

	function getChildMaxHealth(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherMaxHealth = getMaxHealthFromBytes(fatherGenes);
		uint16 motherMaxHealth = getMaxHealthFromBytes(motherGenes);

		uint256 childMaxHealth = generateChildValue(fatherMaxHealth, motherMaxHealth);

		uint256 shiftedValue = childMaxHealth << (28 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildInitialStrength(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32, uint16) {
		uint16 fatherInitialStrength = getInitialStrengthFromBytes(fatherGenes);
		uint16 motherInitialStrength = getInitialStrengthFromBytes(motherGenes);

		uint256 childInitialStrength = generateChildValue(fatherInitialStrength, motherInitialStrength);

		uint256 shiftedValue = childInitialStrength << (26 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return (bytes32(result), uint16(childInitialStrength));
	}

	function getChildMaxStrength(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherMaxStrength = getMaxStrengthFromBytes(fatherGenes);
		uint16 motherMaxStrength = getMaxStrengthFromBytes(motherGenes);

		uint256 childMaxStrength = generateChildValue(fatherMaxStrength, motherMaxStrength);

		uint256 shiftedValue = childMaxStrength << (24 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildInitialAgility(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32, uint16) {
		uint16 fatherInitialAgility = getInitialAgilityFromBytes(fatherGenes);
		uint16 motherInitialAgility = getInitialAgilityFromBytes(motherGenes);

		uint256 childInitialAgility = generateChildValue(fatherInitialAgility, motherInitialAgility);

		uint256 shiftedValue = childInitialAgility << (22 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return (bytes32(result), uint16(childInitialAgility));
	}

	function getChildMaxAgility(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherMaxAgility = getMaxAgilityFromBytes(fatherGenes);
		uint16 motherMaxAgility = getMaxAgilityFromBytes(motherGenes);

		uint256 childMaxAgility = generateChildValue(fatherMaxAgility, motherMaxAgility);

		uint256 shiftedValue = childMaxAgility << (20 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildInitialFortitude(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32, uint16) {
		uint16 fatherInitialFortitude = getInitialFortitudeFromBytes(fatherGenes);
		uint16 motherInitialFortitude = getInitialFortitudeFromBytes(motherGenes);

		uint256 childInitialFortitude = generateChildValue(fatherInitialFortitude, motherInitialFortitude);

		uint256 shiftedValue = childInitialFortitude << (18 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return (bytes32(result), uint16(childInitialFortitude));
	}

	function getChildMaxFortitude(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherMaxFortitude = getMaxStrengthFromBytes(fatherGenes);
		uint16 motherMaxFortitude = getMaxStrengthFromBytes(motherGenes);

		uint256 childMaxFortitude = generateChildValue(fatherMaxFortitude, motherMaxFortitude);

		uint256 shiftedValue = childMaxFortitude << (16 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildActionCooldown(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private pure returns (bytes32, uint16) {
		uint16 fatherHatchTime = getHatchTimeFromBytes(fatherGenes);
		uint16 motherHatchTime = getHatchTimeFromBytes(motherGenes);

		uint256 maxValue;
		if (fatherHatchTime > motherHatchTime) {
			maxValue = fatherHatchTime;
		} else {
			maxValue = motherHatchTime;
		}

		uint256 value = (uint256(maxValue) * 1100) / 1000;
		if (value > 65535) {
			value = 65535;
		}
		uint256 shiftedValue = value << (14 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return (bytes32(result), uint16(value));
	}

	function getChildHatchTime(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private pure returns (bytes32, uint16) {
		uint16 fatherHatchTime = getHatchTimeFromBytes(fatherGenes);
		uint16 motherHatchTime = getHatchTimeFromBytes(motherGenes);

		uint256 maxValue;
		if (fatherHatchTime > motherHatchTime) {
			maxValue = fatherHatchTime;
		} else {
			maxValue = motherHatchTime;
		}

		uint256 value = (uint256(maxValue) * 1100) / 1000;
		if (value > 65535) {
			value = 65535;
		}
		uint256 shiftedValue = value << (12 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return (bytes32(result), uint16(value));
	}

	function getChildBodyType(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherHead = getBodyTypeFromBytes(fatherGenes);
		uint16 motherHead = getBodyTypeFromBytes(motherGenes);

		uint256 childHead = generateChildVisualAttributeValue(fatherHead, motherHead);

		uint256 shiftedValue = childHead << (11 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildBodyColor(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherBody = getBodyColorFromBytes(fatherGenes);
		uint16 motherBody = getBodyColorFromBytes(motherGenes);

		uint256 childBody = generateChildVisualAttributeValue(fatherBody, motherBody);

		uint256 shiftedValue = childBody << (10 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildBodyPatternType(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherHead = getBodyPatternTypeFromBytes(fatherGenes);
		uint16 motherHead = getBodyPatternTypeFromBytes(motherGenes);

		uint256 childHead = generateChildVisualAttributeValue(fatherHead, motherHead);

		uint256 shiftedValue = childHead << (9 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildBodyPatternColor(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherBody = getBodyPatternColorFromBytes(fatherGenes);
		uint16 motherBody = getBodyPatternColorFromBytes(motherGenes);

		uint256 childBody = generateChildVisualAttributeValue(fatherBody, motherBody);

		uint256 shiftedValue = childBody << (8 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildWingsType(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherHead = getWingsTypeFromBytes(fatherGenes);
		uint16 motherHead = getWingsTypeFromBytes(motherGenes);

		uint256 childHead = generateChildVisualAttributeValue(fatherHead, motherHead);

		uint256 shiftedValue = childHead << (7 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildWingsColor(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherBody = getWingsColorFromBytes(fatherGenes);
		uint16 motherBody = getWingsColorFromBytes(motherGenes);

		uint256 childBody = generateChildVisualAttributeValue(fatherBody, motherBody);

		uint256 shiftedValue = childBody << (6 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildHornsType(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherHead = getHornsTypeFromBytes(fatherGenes);
		uint16 motherHead = getHornsTypeFromBytes(motherGenes);

		uint256 childHead = generateChildVisualAttributeValue(fatherHead, motherHead);

		uint256 shiftedValue = childHead << (5 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildHornsColor(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherBody = getHornsColorFromBytes(fatherGenes);
		uint16 motherBody = getHornsColorFromBytes(motherGenes);

		uint256 childBody = generateChildVisualAttributeValue(fatherBody, motherBody);

		uint256 shiftedValue = childBody << (4 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildEyesType(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherHead = getEyesTypeFromBytes(fatherGenes);
		uint16 motherHead = getEyesTypeFromBytes(motherGenes);

		uint256 childHead = generateChildVisualAttributeValue(fatherHead, motherHead);

		uint256 shiftedValue = childHead << (3 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildEyesColor(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherBody = getEyesColorFromBytes(fatherGenes);
		uint16 motherBody = getEyesColorFromBytes(motherGenes);

		uint256 childBody = generateChildVisualAttributeValue(fatherBody, motherBody);

		uint256 shiftedValue = childBody << (2 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildTailType(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherHead = getTailTypeFromBytes(fatherGenes);
		uint16 motherHead = getTailTypeFromBytes(motherGenes);

		uint256 childHead = generateChildVisualAttributeValue(fatherHead, motherHead);

		uint256 shiftedValue = childHead << (1 * 8);
		uint256 result = shiftedValue | uint256(childGenes);
		return bytes32(result);
	}

	function getChildTailColor(
		bytes32 childGenes,
		bytes32 fatherGenes,
		bytes32 motherGenes
	) private returns (bytes32) {
		uint16 fatherBody = getTailColorFromBytes(fatherGenes);
		uint16 motherBody = getTailColorFromBytes(motherGenes);

		uint256 childBody = generateChildVisualAttributeValue(fatherBody, motherBody);

		uint256 result = childBody | uint256(childGenes);
		return bytes32(result);
	}

	function generateChildValue(uint16 fatherValue, uint16 motherValue) private returns (uint16 value) {
		uint256 fatherFixedValue = uint256(fatherValue) * 10000;
		uint256 motherFixedValue = uint256(motherValue) * 10000;

		uint256 minimumValue;
		uint256 maximumValue;
		if (fatherFixedValue < motherFixedValue) {
			minimumValue = fatherFixedValue;
			maximumValue = motherFixedValue;
		} else {
			minimumValue = motherFixedValue;
			maximumValue = fatherFixedValue;
		}

		// Increase variance by 7500 to allow stats jump on lower values
		minimumValue = ((minimumValue * 95) / 100) - 7500;
		if (minimumValue < 10000) {
			minimumValue = 10000;
		}
		maximumValue = ((maximumValue * 105) / 100) + 7500;

		// adds 5000 to round positive integer value and clamp value to prevent int overflow
		uint256 randomValue = (random(minimumValue, maximumValue) + 5000) / 10000;
		if (randomValue > 65535) {
			randomValue = 65535;
		}
		return uint16(randomValue);
	}

	function generateChildVisualAttributeValue(uint16 fatherValue, uint16 motherValue) private returns (uint16 value) {
		uint256 roll = random(0, 10000);
		if (roll < 4000) {
			value = fatherValue;
		} else if (roll < 7500) {
			value = motherValue;
		} else {
			value = uint16(random(1, 4));
		}
	}

	/**************************** Getters *********************************************** */

	function getInitialHealthFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (30 * 8));
	}

	function getMaxHealthFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (28 * 8));
	}

	function getInitialStrengthFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (26 * 8));
	}

	function getMaxStrengthFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (24 * 8));
	}

	function getInitialAgilityFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (22 * 8));
	}

	function getMaxAgilityFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (20 * 8));
	}

	function getInitialFortitudeFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (18 * 8));
	}

	function getMaxFortitudeFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (16 * 8));
	}

	function getActionCooldownFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (14 * 8));
	}

	function getHatchTimeFromBytes(bytes32 genes) public pure returns (uint16) {
		return uint16(uint256(genes) >> (12 * 8));
	}

	/*********************** Visual Attributes *************************************** */
	function getBodyTypeFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (11 * 8));
	}

	function getBodyColorFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (10 * 8));
	}

	function getBodyPatternTypeFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (9 * 8));
	}

	function getBodyPatternColorFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (8 * 8));
	}

	function getWingsTypeFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (7 * 8));
	}

	function getWingsColorFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (6 * 8));
	}

	function getHornsTypeFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (5 * 8));
	}

	function getHornsColorFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (4 * 8));
	}

	function getEyesTypeFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (3 * 8));
	}

	function getEyesColorFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (2 * 8));
	}

	function getTailTypeFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes) >> (1 * 8));
	}

	function getTailColorFromBytes(bytes32 genes) public pure returns (uint8) {
		return uint8(uint256(genes));
	}


	/********************* Utils *************************************** */

	// This is vulnerable, but I don't think it is worth protecting for this use case.
	// A safer, more complex and expensive solution is using an oracle like Provable
	function random(uint256 start, uint256 end) private returns (uint256) {
		uint256 n = end - start + 1;
		uint256 randomnumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _randomNonce))) % n;
		randomnumber = randomnumber + start;
		_randomNonce++;
		return randomnumber;
	}
}
