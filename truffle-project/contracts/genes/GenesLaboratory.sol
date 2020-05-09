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
        require(motherGenes[0] != 0, "father genes should have valu");

        bytes32 childGenes;
    }

    // This is vulnerable, but I don't think it is worth protecting for this use case.
    // A safer, more complex and expensive solution is using an oracle like Provable
    function random(uint start, uint endExclusive) internal returns (uint) {
        uint randomnumber = uint(keccak256(abi.encodePacked(now, msg.sender, _randomNonce))) % endExclusive;
        randomnumber = randomnumber + start;
        _randomNonce++;
        return randomnumber;
    }
}