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

    function createChildGenes(bytes32 fatherGenes, bytes32 motherGenes) public onlyFromDragonContract {
        require(fatherGenes[0] != 0, "father genes should have value");
        require(motherGenes[0] != 0, "father genes should have value");

        bytes32 childGenes;

    }

    function getChildStrength(bytes32 childGenes, bytes32 fatherGenes, bytes32 motherGenes) private returns (bytes32) {
        uint16 fatherInitialHealth = getInitialHealthFromBytes(fatherGenes);
        uint16 motherInitialHealth = getInitialHealthFromBytes(motherGenes);
    }

    // This is vulnerable, but I don't think it is worth protecting for this use case.
    // A safer, more complex and expensive solution is using an oracle like Provable
    function random(uint start, uint endExclusive) private returns (uint) {
        uint randomnumber = uint(keccak256(abi.encodePacked(now, msg.sender, _randomNonce))) % endExclusive;
        randomnumber = randomnumber + start;
        _randomNonce++;
        return randomnumber;
    }

    function getInitialHealthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (30 * 8) );
    }

    function getMaxHealthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (28 * 8) );
    }

    function getInitialStrengthFromBytes(bytes32 genes) public pure returns (uint16) {
        return uint16(uint256(genes) >> (26 * 8) );
    }

    function getMaxAStrengthFromBytes(bytes32 genes) public pure returns (uint16) {
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
}