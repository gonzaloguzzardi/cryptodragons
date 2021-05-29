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
}
