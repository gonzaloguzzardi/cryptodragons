pragma solidity ^0.5.0;

import "./DragonBase.sol";

contract DragonFactory is DragonBase {

    uint constant dnaDigits = 16;
    uint constant dnaModulus = 10 ** dnaDigits;

    event NewDragon(uint dragonId, uint dna);

    // TODO RESTRICT ACCESS
    /**
     Creates new Dragon and give it to its creator.
    */
    function createDragon(string memory _name, uint64 _creationTime, uint32 _dadId, uint32 _motherId) public {
        //Dragon storage father = dragons[_dadId];
       // Dragon storage mother = dragons[_motherId];

        uint256 newGenes = 14564515454;
        
        bytes32 nameInBytes = _stringToBytes32(_name);
        uint id = _createDragon(nameInBytes, _creationTime, newGenes, _dadId, _motherId);

        _mint(msg.sender, id);
        emit NewDragon(id, newGenes);
    }

    //TODO implement burn function which should update mainchainToSidechainIds mapping and avoid burning genesis token

    // Used by gateway to recreate a dragon from received data
    function _mintDragon(address to, uint _tokenId, bytes memory _data) internal {
        // Token with token id = 0 should be handle as a special token and have tokenId = 0 in both blockchains
        if ((mainchainToSidechainIds[_tokenId] > 0) && (_tokenId != 0)) {
            uint tokenId = _createDragonFromData(_data);
            mainchainToSidechainIds[_tokenId] = tokenId;
            _mint(to, tokenId);
        } else {
            _updateDragonFromData(_tokenId, _data);
        }
  
    }

    function _createDragon(bytes32 _name, uint64 _creationTime, uint256 _genes, uint32 _dadId, uint32 _motherId) private returns(uint256) {
        
        uint id = dragons.push(Dragon(
        {
            genes: _genes,
            name: _name,

            creationTime: _creationTime,

            // level attributes
            currentExperience: 0,

            // parents information
            dadId: _dadId,
            motherId: _motherId,

            actionCooldown: 0,
            
            health: 50,
            strength: 5,
            agility: 5,
            fortitude: 5,

            hatchTime: 60
            })) - 1;

        return id;
    }

    function _createDragonFromData(bytes memory _data) private returns(uint256) {
        
        (uint _genes, 
        bytes32 _name, 
        uint64 _creationTime, 
        uint32 _dadId, 
        uint32 _motherId, 
        uint32 _currentExperience,
        uint16 _actionCooldown,
        uint16 _health, 
        uint16 _strength,
        uint16 _agility, 
        uint16 _fortitude, 
        uint16 _hatchTime) = _decodeDragonFromBytes(_data);

        uint id = dragons.push(Dragon(
        {
            genes: _genes,
            name: _name,

            creationTime: _creationTime,

            // level attributes
            currentExperience: 0,

            // parents information
            dadId: _dadId,
            motherId: _motherId,

            actionCooldown: _actionCooldown,
            
            health: _health,
            strength: _strength,
            agility: _agility,
            fortitude: _fortitude,

            hatchTime: _hatchTime
            })) - 1;

        return id;
    }

    function _updateDragonFromData(uint _tokenId, bytes memory _data) private {
        (uint _genes, 
        bytes32 _name, 
        uint64 _creationTime, 
        uint32 _dadId, 
        uint32 _motherId, 
        uint32 _currentExperience,
        uint16 _actionCooldown,
        uint16 _health, 
        uint16 _strength,
        uint16 _agility, 
        uint16 _fortitude, 
        uint16 _hatchTime) = _decodeDragonFromBytes(_data);

        uint tokenId = mainchainToSidechainIds[_tokenId];
        Dragon storage dragon = dragons[tokenId];
        dragon.genes = _genes;
        dragon.name = _name;
        dragon.creationTime = _creationTime;
        dragon.dadId = _dadId;
        dragon.motherId = _motherId;
        dragon.currentExperience = _currentExperience;
        dragon.actionCooldown = _actionCooldown;
        dragon.health = _health;
        dragon.strength = _strength;
        dragon.agility = _agility;
        dragon.fortitude = _fortitude;
        dragon.hatchTime = _hatchTime;
    }


    function _generateRandomDna(string memory _str) private pure returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }
}