pragma solidity ^0.5.0;

import './DragonBase.sol';

contract IGenesLaboratory {
	function createNewDragonGenes()
		external
		returns (
			bytes32 genes,
			uint16 initialHealth,
			uint16 initialStrength,
			uint16 initialAgility,
			uint16 initialFortitude,
			uint16 actionCooldown,
			uint16 hatchTime
		);

	function createChildGenes(bytes32 fatherGenes, bytes32 motherGenes)
		external
		returns (
			bytes32 childGenes,
			uint16 initialHealth,
			uint16 initialStrength,
			uint16 initialAgility,
			uint16 initialFortitude,
			uint16 actionCooldown,
			uint16 hatchTime
		);
}

contract DragonFactory is DragonBase {
	uint256 constant dnaDigits = 16;
	uint256 constant dnaModulus = 10**dnaDigits;

	uint8 internal _blockchainId = 0;

	// Maps other token ids from the other blockchain to token ids of this blockchain
	mapping(uint256 => uint256) private _foreignIdToLocalId;
	mapping(uint256 => uint256) private _localIdToForeignId;
	mapping(uint256 => bool) private _tokenMapped; // If we allow token destruction we should be careful with token ids reorder

	address internal _gateway;
	address internal _genesLaboratory;

	event NewDragon(uint256 dragonId, uint256 genes);

	constructor(address gateway, uint8 blockchainId) public DragonBase() {
		require(gateway != address(0), 'Invalid gateway address');
		_gateway = gateway;
		_blockchainId = blockchainId;
	}

	function setGenesLaboratoryAddress(address genesLaboratoryAddress) external onlyOwner {
		require(genesLaboratoryAddress != address(0), 'address should have a valid value');
		_genesLaboratory = genesLaboratoryAddress;
	}

	// TODO RESTRICT ACCESS
	/**
     Creates new Dragon and give it to its creator.
    */
	function createDragon(
		string memory _name,
		uint64 _creationTime,
		uint32 _dadId,
		uint32 _motherId
	) public {
		//Dragon storage father = dragons[_dadId];
		// Dragon storage mother = dragons[_motherId];

		(
			bytes32 genes,
			uint16 initialHealth,
			uint16 initialStrength,
			uint16 initialAgility,
			uint16 initialFortitude,
			uint16 actionCooldown,
			uint16 hatchTime
		) = IGenesLaboratory(_genesLaboratory).createNewDragonGenes();

		bytes32 nameInBytes = _stringToBytes32(_name);

		uint256 id = _createDragonWithStats(
			genes,
			nameInBytes,
			_creationTime,
			_dadId,
			_motherId,
			0,
			actionCooldown,
			initialHealth,
			initialStrength,
			initialAgility,
			initialFortitude,
			hatchTime,
			_blockchainId
		);

		_mint(msg.sender, id);
		emit NewDragon(id, uint256(genes));
	}

	//TODO implement burn function which should update mainchainToSidechainIds mapping

	//
	/** Used by gateway to recreate a dragon from received data
        If has not been mapped, it means this token only exists on the other blockchain. We should recreate it and assign it a new local id mapped to its original
     */
	function _mintReceivedDragon(
		address to,
		uint256 _originalTokenId,
		bytes memory _data
	) internal {
		uint8 blockchainId = _decodeBlockchainIdFromData(_data);
		bool originatedInThisBlockchain = blockchainId == _blockchainId;

		if (originatedInThisBlockchain) {
			safeTransferFrom(_gateway, to, _originalTokenId, _data);
			_updateDragonFromData(_originalTokenId, _data);
		} else {
			// If token was created in other blockchain and never mapped. Recreated
			if (_tokenMapped[_originalTokenId] == false) {
				uint256 tokenId = _createDragonFromData(_data);
				_foreignIdToLocalId[_originalTokenId] = tokenId;
				_localIdToForeignId[tokenId] = _originalTokenId;
				_tokenMapped[_originalTokenId] = true;

				_mint(to, tokenId);

				// If token was mapped, it means it was already recreated in this blockchain. Update it!
			} else {
				uint256 tokenId = _foreignIdToLocalId[_originalTokenId];
				safeTransferFrom(_gateway, to, tokenId, _data);
				_updateDragonFromData(tokenId, _data);
			}
		}
	}

	function _createDragonFromData(bytes memory _data) private returns (uint256) {
		(
			bytes32 _genes,
			bytes32 _name,
			uint64 _creationTime,
			uint32 _dadId,
			uint32 _motherId,
			uint32 _currentExperience
		) = _decodeFirstHalfOfDragonFromBytes(_data);

		(
			uint16 _actionCooldown,
			uint16 _health,
			uint16 _strength,
			uint16 _agility,
			uint16 _fortitude,
			uint16 _hatchTime,
			uint8 _blockchainOriginId
		) = _decodeSecondHalfOfDragonFromBytes(_data);

		uint256 id = _createDragonWithStats(
			_genes,
			_name,
			_creationTime,
			_dadId,
			_motherId,
			_currentExperience,
			_actionCooldown,
			_health,
			_strength,
			_agility,
			_fortitude,
			_hatchTime,
			_blockchainOriginId
		);

		return id;
	}

	function _createDragonWithStats(
		bytes32 _genes,
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
		uint8 _blockchainOriginId
	) private returns (uint256 id) {
		id =
			dragons.push(
				Dragon({
					genes: 0,
					name: 0,
					creationTime: _creationTime,
					currentExperience: // level attributes
					_currentExperience,
					dadId: // parents information
					_dadId,
					motherId: _motherId,
					actionCooldown: _actionCooldown,
					health: _health,
					strength: _strength,
					agility: _agility,
					fortitude: _fortitude,
					hatchTime: _hatchTime,
					blockchainOriginId: _blockchainOriginId
				})
			) -
			1;

		// Assign genes in different function as a workaround to the stack too deep exception
		_assignGenesAndName(id, _genes, _name);
	}

	function _assignGenesAndName(
		uint256 _dragonId,
		bytes32 _genes,
		bytes32 _name
	) private {
		Dragon storage dragon = dragons[_dragonId];
		dragon.genes = _genes;
		dragon.name = _name;
	}

	function _updateDragonFromData(uint256 _tokenId, bytes memory _data) private {
		(
			bytes32 _genes,
			bytes32 _name,
			uint64 _creationTime,
			uint32 _dadId,
			uint32 _motherId,
			uint32 _currentExperience
		) = _decodeFirstHalfOfDragonFromBytes(_data);

		(
			uint16 _actionCooldown,
			uint16 _health,
			uint16 _strength,
			uint16 _agility,
			uint16 _fortitude,
			uint16 _hatchTime,
			uint8 _blockchainOriginId
		) = _decodeSecondHalfOfDragonFromBytes(_data);

		_updateDragonWithStats(
			_tokenId,
			_genes,
			_name,
			_creationTime,
			_dadId,
			_motherId,
			_currentExperience,
			_actionCooldown,
			_health,
			_strength,
			_agility,
			_fortitude,
			_hatchTime,
			_blockchainOriginId
		);
	}

	function _updateDragonWithStats(
		uint256 _tokenId,
		bytes32 _genes,
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
		uint8 _blockchainOriginId
	) private {
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

	function _generateRandomDna(string memory _str) private pure returns (uint256) {
		uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
		return rand % dnaModulus;
	}

	function _getForeignTokenId(uint256 _localTokenId) internal view returns (uint256) {
		return _localIdToForeignId[_localTokenId];
	}
}
