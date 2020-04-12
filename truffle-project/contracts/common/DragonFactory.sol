pragma solidity ^0.5.0;

import "./DragonBase.sol";

contract DragonFactory is DragonBase {

    uint constant dnaDigits = 16;
    uint constant dnaModulus = 10 ** dnaDigits;

    uint8 internal _blockchainId = 0;

    // Maps other token ids from the other blockchain to token ids of this blockchain
    mapping(uint => uint) private  _foreignIdToLocalId;
    mapping(uint => uint) private  _localIdToForeignId;
    mapping(uint => bool) private _tokenMapped; // If we allow token destruction we should be careful with token ids reorder

    address internal _gateway;

    event NewDragon(uint dragonId, uint dna);

    constructor(address gateway, uint8 blockchainId) DragonBase() public {
        require(gateway != address(0), "Invalid gateway address");
        _gateway = gateway;
        _blockchainId = blockchainId;
    }

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

    //TODO implement burn function which should update mainchainToSidechainIds mapping

    // 
    /** Used by gateway to recreate a dragon from received data
        If has not been mapped, it means this token only exists on the other blockchain. We should recreate it and assign it a new local id mapped to its original
     */
    function _mintReceivedDragon(address to, uint _originalTokenId, bytes memory _data) internal {
        uint8 blockchainId =  _decodeBlockchainIdFromData(_data);
        bool originatedInThisBlockchain = blockchainId == _blockchainId;

        if (originatedInThisBlockchain) {
            safeTransferFrom(_gateway,  to, _originalTokenId, _data);
            _updateDragonFromData(_originalTokenId, _data);
        } else {
            // If token was created in other blockchain and never mapped. Recreated
            if (_tokenMapped[_originalTokenId] == false) {
                uint tokenId = _createDragonFromData(_data);
                 _foreignIdToLocalId[_originalTokenId] = tokenId;
                 _localIdToForeignId[tokenId] = _originalTokenId;
                _tokenMapped[_originalTokenId] = true;

                _mint(to, tokenId);

            // If token was mapped, it means it was already recreated in this blockchain. Update it!
            } else {
                uint tokenId = _foreignIdToLocalId[_originalTokenId];
                safeTransferFrom(_gateway,  to, tokenId, _data);
                _updateDragonFromData(tokenId, _data);
            }
        }
    }

    function _createDragon(bytes32 _name, uint64 _creationTime, uint256 _genes, uint32 _dadId, uint32 _motherId) private returns(uint256 id) {
        uint32 currentExperience = 0;
        uint16 actionCooldown = 0;
        uint16 health = 50;
        uint16 strength = 7;
        uint16 agility = 7;
        uint16 fortitude = 7;
        uint16 hatchTime = 60;
        id = _createDragonWithStats(_genes, _name, _creationTime, _dadId, _motherId, currentExperience,
                    actionCooldown, health, strength, agility, fortitude,hatchTime, _blockchainId);
    }

    function _createDragonFromData(bytes memory _data) private returns(uint256) {

        (uint _genes,
        bytes32 _name,
        uint64 _creationTime,
        uint32 _dadId,
        uint32 _motherId,
        uint32 _currentExperience) = _decodeFirstHalfOfDragonFromBytes(_data);

        (uint16 _actionCooldown,
        uint16 _health,
        uint16 _strength,
        uint16 _agility,
        uint16 _fortitude,
        uint16 _hatchTime,
        uint8 _blockchainOriginId) = _decodeSecondHalfOfDragonFromBytes(_data);

        uint id = _createDragonWithStats(_genes, _name, _creationTime, _dadId, _motherId, _currentExperience,
                    _actionCooldown, _health, _strength, _agility, _fortitude, _hatchTime, _blockchainOriginId);

        return id;
    }

    function _createDragonWithStats
        (uint256 _genes,
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
        uint16 _hatchTime,
        uint8 _blockchainOriginId) private returns(uint256 id) {

        id = dragons.push(
            Dragon({
                genes: 0,
                name: 0,

                creationTime: _creationTime,

                // level attributes
                currentExperience: _currentExperience,

                // parents information
                dadId: _dadId,
                motherId: _motherId,

                actionCooldown: _actionCooldown,

                health: _health,
                strength: _strength,
                agility: _agility,
                fortitude: _fortitude,

                hatchTime: _hatchTime,
                blockchainOriginId: _blockchainOriginId
            })
        ) - 1;

        // Assign genes in different function as a workaround to the stack too deep exception
        _assignGenesAndName(id, _genes, _name);
    }

    function _assignGenesAndName(uint256 _dragonId, uint256 _genes, bytes32 _name) private {
        Dragon storage dragon = dragons[_dragonId];
        dragon.genes = _genes;
        dragon.name = _name;
    }

    function _updateDragonFromData(uint _tokenId, bytes memory _data) private {
        (uint _genes,
        bytes32 _name,
        uint64 _creationTime,
        uint32 _dadId,
        uint32 _motherId,
        uint32 _currentExperience) = _decodeFirstHalfOfDragonFromBytes(_data);

        (uint16 _actionCooldown,
        uint16 _health,
        uint16 _strength,
        uint16 _agility,
        uint16 _fortitude,
        uint16 _hatchTime,
        uint8 _blockchainOriginId) = _decodeSecondHalfOfDragonFromBytes(_data);

        _updateDragonWithStats(_tokenId, _genes, _name, _creationTime, _dadId, _motherId, _currentExperience,
                    _actionCooldown, _health, _strength, _agility, _fortitude, _hatchTime, _blockchainOriginId);
    }

    function _updateDragonWithStats
        (uint _tokenId,
        uint _genes,
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
        uint16 _hatchTime,
        uint8 _blockchainOriginId) private {

        Dragon storage dragon = dragons[_tokenId];
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
        dragon.blockchainOriginId = _blockchainOriginId;
    }

    function _generateRandomDna(string memory _str) private pure returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function _getForeignTokenId(uint _localTokenId) internal pure returns (uint) {
        require (_tokenMapped[_localTokenId], "Cannot obtain foreign if token was never mapped");
        return _localIdToForeignId[_localTokenId];
    }
}