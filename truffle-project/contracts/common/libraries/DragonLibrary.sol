// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

library DragonLibrary {
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

	struct DragonVisualAttributes {
		uint8 bodyType;
		uint8 bodyColor;
		uint8 bodyPatternType;
		uint8 bodyPatternColor;
		uint8 wingsType;
		uint8 wingsColor;
		uint8 hornsType;
		uint8 hornsColor;
		uint8 eyesType;
		uint8 eyesColor;
		uint8 tailType;
		uint8 tailColor;
	}

	struct DragonFetchPageData {
		uint256 dragonId;
		uint256 listedPrice;
		address owner;
		bool onSale;
	}
}
