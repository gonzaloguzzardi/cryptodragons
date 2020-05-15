pragma solidity ^0.5.0;

contract GenesLaboratory {

    address private _dragonContractAddress;
    uint private _randomNonce;

    constructor(address dragonAddress) public {
        require(dragonAddress != address(0), "Invalid dragon address address");
        _dragonContractAddress = dragonAddress;
    }

    modifier onlyFromDragonContract() {
        require(msg.sender == _dragonContractAddress, "Only dragon contract can call this");
        _;
    }

    function createChildGenes(bytes32 fatherGenes, bytes32 motherGenes) public onlyFromDragonContract returns (bytes32 childGenes) {
        childGenes = getChildInitialHealth(childGenes, fatherGenes, motherGenes);
        childGenes = getChildMaxHealth(childGenes, fatherGenes, motherGenes);
        childGenes = getChildInitialStrength(childGenes, fatherGenes, motherGenes);
        childGenes = getChildMaxStrength(childGenes, fatherGenes, motherGenes);
        childGenes = getChildInitialAgility(childGenes, fatherGenes, motherGenes);
        childGenes = getChildMaxAgility(childGenes, fatherGenes, motherGenes);
        childGenes = getChildInitialFortitude(childGenes, fatherGenes, motherGenes);
        childGenes = getChildMaxFortitude(childGenes, fatherGenes, motherGenes);
        childGenes = getChildActionCooldown(childGenes, fatherGenes, motherGenes);
        childGenes = getChildHatchTime(childGenes, fatherGenes, motherGenes);
        childGenes = getChildHead(childGenes, fatherGenes, motherGenes);
        childGenes = getChildBody(childGenes, fatherGenes, motherGenes);
        childGenes = getChildWings(childGenes, fatherGenes, motherGenes);
        childGenes = getChildGeneration(childGenes, fatherGenes, motherGenes);
    }

    function getChildInitialHealth(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherInitialHealth = getInitialHealthFromBytes(fatherGenes);
        uint16 motherInitialHealth = getInitialHealthFromBytes(motherGenes);

        uint childInitialHealth = generateChildValue(fatherInitialHealth, motherInitialHealth);
        
        uint shiftedValue = childInitialHealth << (30 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildMaxHealth(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherMaxHealth = getMaxHealthFromBytes(fatherGenes);
        uint16 motherMaxHealth = getMaxHealthFromBytes(motherGenes);

        uint childMaxHealth = generateChildValue(fatherMaxHealth, motherMaxHealth);
        
        uint shiftedValue = childMaxHealth << (28 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildInitialStrength(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherInitialStrength = getInitialStrengthFromBytes(fatherGenes);
        uint16 motherInitialStrength = getInitialStrengthFromBytes(motherGenes);

        uint childInitialStrength = generateChildValue(fatherInitialStrength, motherInitialStrength);
        
        uint shiftedValue = childInitialStrength << (26 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildMaxStrength(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherMaxStrength = getMaxStrengthFromBytes(fatherGenes);
        uint16 motherMaxStrength = getMaxStrengthFromBytes(motherGenes);

        uint childMaxStrength = generateChildValue(fatherMaxStrength, motherMaxStrength);
        
        uint shiftedValue = childMaxStrength << (24 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildInitialAgility(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherInitialAgility = getInitialAgilityFromBytes(fatherGenes);
        uint16 motherInitialAgility = getInitialAgilityFromBytes(motherGenes);

        uint childInitialAgility = generateChildValue(fatherInitialAgility, motherInitialAgility);
        
        uint shiftedValue = childInitialAgility << (22 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildMaxAgility(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherMaxAgility = getMaxAgilityFromBytes(fatherGenes);
        uint16 motherMaxAgility = getMaxAgilityFromBytes(motherGenes);

        uint childMaxAgility = generateChildValue(fatherMaxAgility, motherMaxAgility);
        
        uint shiftedValue = childMaxAgility << (20 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildInitialFortitude(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherInitialFortitude = getInitialFortitudeFromBytes(fatherGenes);
        uint16 motherInitialFortitude = getInitialFortitudeFromBytes(motherGenes);

        uint childInitialFortitude = generateChildValue(fatherInitialFortitude, motherInitialFortitude);
        
        uint shiftedValue = childInitialFortitude << (18 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildMaxFortitude(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherMaxFortitude = getMaxStrengthFromBytes(fatherGenes);
        uint16 motherMaxFortitude = getMaxStrengthFromBytes(motherGenes);

        uint childMaxFortitude = generateChildValue(fatherMaxFortitude, motherMaxFortitude);
        
        uint shiftedValue = childMaxFortitude << (16 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildActionCooldown(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherActionCooldown = getActionCooldownFromBytes(fatherGenes);
        uint16 motherActionCooldown = getActionCooldownFromBytes(motherGenes);

        uint childActionCooldown = generateChildValue(fatherActionCooldown, motherActionCooldown);
        
        uint shiftedValue = childActionCooldown << (14 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildHatchTime(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherHatchTime = getHatchTimeFromBytes(fatherGenes);
        uint16 motherHatchTime = getHatchTimeFromBytes(motherGenes);

        uint childHatchTime = generateChildValue(fatherHatchTime, motherHatchTime);
        
        uint shiftedValue = childHatchTime << (12 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildHead(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherHead = getHeadAttributeFromBytes(fatherGenes);
        uint16 motherHead = getHeadAttributeFromBytes(motherGenes);

        uint childHead = generateChildHeadValue(fatherHead, motherHead);
        
        uint shiftedValue = childHead << (10 * 8);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildBody(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherBody = getBodyAttributeFromBytes(fatherGenes);
        uint16 motherBody = getBodyAttributeFromBytes(motherGenes);

        uint childBody = generateChildBodyValue(fatherBody, motherBody);
        
        uint shiftedValue = childBody << (10 * 6);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildWings(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherWings = getBodyAttributeFromBytes(fatherGenes);
        uint16 motherWings = getBodyAttributeFromBytes(motherGenes);

        uint childWings = generateChildWingsValue(fatherWings, motherWings);
        
        uint shiftedValue = childWings << (10 * 4);
        uint result = shiftedValue | uint(childGenes);
        return bytes32(result);
    }

    function getChildGeneration(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherGeneration = getGenerationAttributeFromBytes(fatherGenes);
        uint16 motherGeneration = getGenerationAttributeFromBytes(motherGenes);

        uint childGeneration = generateChildGeneration(fatherGeneration, motherGeneration);
        
        uint result = childGeneration | uint(childGenes);
        return bytes32(result);
    }

    function generateChildValue(uint16 fatherValue, uint16 motherValue) private returns (uint16 value) {
        uint fatherFixedValue = uint(fatherValue) * 10000;
        uint motherFixedValue = uint(motherValue) * 10000;

        uint minimumValue;
        uint maximumValue;
        if (fatherFixedValue < motherFixedValue) {
            minimumValue = fatherFixedValue;
            maximumValue = motherFixedValue;
        } else {
            minimumValue = motherFixedValue;
            maximumValue = fatherFixedValue;
        }

        // Increase variance by 7500 to allow stats jump on lower values
        minimumValue = (minimumValue * 95 / 100) - 7500;
        if (minimumValue < 10000) {
            minimumValue = 10000;
        }
        maximumValue = (maximumValue * 105 / 100) + 7500;

        // adds 5000 to round positive integer value and clamp value to prevent int overflow
        uint randomValue = (random(minimumValue, maximumValue) + 5000) / 10000;
        if (randomValue > 65535) {
            randomValue = 65535;
        }
        return uint16(randomValue);
    }

    function generateChildHeadValue(uint16 fatherValue, uint16 motherValue) private returns (uint16 value) {
        uint roll = random(0, 10000);
        if (roll < 4000) {
            value = fatherValue;
        } else if (roll < 7500) {
            value = motherValue;
        } else {
            value = uint16(random(1, 4));
        }
    }

    function generateChildBodyValue(uint16 fatherValue, uint16 motherValue) private returns (uint16 value) {
        uint roll = random(0, 10000);
        if (roll < 3750) {
            value = fatherValue;
        } else if (roll < 7500) {
            value = motherValue;
        } else {
            value = uint16(random(1, 4));
        }
    }

    function generateChildWingsValue(uint16 fatherValue, uint16 motherValue) private returns (uint16 value) {
        uint roll = random(0, 10000);
        if (roll < 3500) {
            value = fatherValue;
        } else if (roll < 7500) {
            value = motherValue;
        } else {
            value = uint16(random(1, 4));
        }
    }

    function generateChildGeneration(uint16 fatherValue, uint16 motherValue) private returns (uint16) {
        uint maxValue = (fatherValue > motherValue) ? fatherValue : motherValue;
        maxValue = maxValue + 1;
        if (maxValue > 65535) {
            maxValue = 65535;
        }
        return uint16(maxValue);
    }

    /**************************** Getters *********************************************** */

    function getInitialHealthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (30 * 8) );
    }

    function getMaxHealthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (28 * 8) );
    }

    function getInitialStrengthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (26 * 8) );
    }

    function getMaxStrengthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (24 * 8) );
    }

    function getInitialAgilityFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (22 * 8) );
    }

    function getMaxAgilityFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (20 * 8) );
    }

    function getInitialFortitudeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (18 * 8) );
    }

    function getMaxFortitudeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (16 * 8) );
    }

    function getActionCooldownFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (14 * 8) );
    }

    function getHatchTimeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (12 * 8) );
    }

    /*********************** Visual Attributes *************************************** */
    function getHeadAttributeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (10 * 8) );
    }

    function getBodyAttributeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (8 * 8) );
    }

    function getWingsAttributeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (6 * 8) );
    }

    function getGenerationAttributeFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes));
    }

    /********************* Utils *************************************** */

    // This is vulnerable, but I don't think it is worth protecting for this use case.
    // A safer, more complex and expensive solution is using an oracle like Provable
    function random(uint start, uint end) private returns (uint) {
        uint n = end - start + 1;
        uint randomnumber = uint(keccak256(abi.encodePacked(now, msg.sender, _randomNonce))) % n;
        randomnumber = randomnumber + start;
        _randomNonce++;
        return randomnumber;
    }
}