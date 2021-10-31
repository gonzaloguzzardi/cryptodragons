// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import './DragonBase.sol';
import './libraries/DragonLibrary.sol';

interface IGenesLaboratory {
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

	function getVisualAttributes(bytes32 genes)
		external
		pure
		returns (
			uint16 head,
			uint16 body,
			uint16 wings
		);
}

interface IDragonSerializer {
	function encodeDragonToBytes(DragonLibrary.Dragon memory _dragon) external pure returns (bytes memory);
	function decodeDragonFromBytes(bytes calldata _data) external pure returns (DragonLibrary.Dragon memory dragon);
	function decodeBlockchainIdFromData(bytes calldata _data) external pure returns (uint8 blockchainId);
}

contract DragonFactory is DragonBase {
	uint8 internal _blockchainId = 0;

	// Maps other token ids from the other blockchain to token ids of this blockchain
	mapping(uint256 => uint256) private _foreignIdToLocalId;
	mapping(uint256 => uint256) private _localIdToForeignId;
	mapping(uint256 => bool) private _tokenMapped; // If we allow token destruction we should be careful with token ids reorder

	address internal _gateway;
	address internal _genesLaboratory;

	event NewDragon(uint256 dragonId, uint256 genes);

	address internal _dragonDecoderAddress;

	constructor(
		address gateway,
		address dragonDecoder,
		uint8 blockchainId
	) DragonBase() {
		require(gateway != address(0), 'Invalid gateway address');
		require(dragonDecoder != address(0), 'Invalid decoder address');
		_gateway = gateway;
		_dragonDecoderAddress = dragonDecoder;
		_blockchainId = blockchainId;
	}

	function setGenesLaboratoryAddress(address genesLaboratoryAddress) external onlyOwner {
		require(genesLaboratoryAddress != address(0), 'Invalid address');
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

		uint256 id =
			_createDragonWithStats(
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
		uint8 blockchainId = IDragonSerializer(_dragonDecoderAddress).decodeBlockchainIdFromData(_data);
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
		DragonLibrary.Dragon memory dragon = IDragonSerializer(_dragonDecoderAddress).decodeDragonFromBytes(_data);

		uint256 id = _createDragonWithStats(
			dragon.genes,
			dragon.name,
			dragon.creationTime,
			dragon.dadId,
			dragon.motherId,
			dragon.currentExperience,
			dragon.actionCooldown,
			dragon.health,
			dragon.strength,
			dragon.agility,
			dragon.fortitude,
			dragon.hatchTime,
			dragon.blockchainOriginId
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
		dragons.push(
			DragonLibrary.Dragon({
				genes: 0,
				name: 0,
				creationTime: _creationTime,
				currentExperience: _currentExperience,
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
		);
		id = dragons.length - 1;

		// Assign genes in different function as a workaround to the stack too deep exception
		_assignGenesAndName(id, _genes, _name);
	}

	function _assignGenesAndName(
		uint256 _dragonId,
		bytes32 _genes,
		bytes32 _name
	) private {
		DragonLibrary.Dragon storage dragon = dragons[_dragonId];
		dragon.genes = _genes;
		dragon.name = _name;
	}

	function _updateDragonFromData(uint256 _tokenId, bytes memory _data) private {
		DragonLibrary.Dragon memory dragon = IDragonSerializer(_dragonDecoderAddress).decodeDragonFromBytes(_data);

		_updateDragonWithStats(
			_tokenId,
			dragon.genes,
			dragon.name,
			dragon.creationTime,
			dragon.dadId,
			dragon.motherId,
			dragon.currentExperience,
			dragon.actionCooldown,
			dragon.health,
			dragon.strength,
			dragon.agility,
			dragon.fortitude,
			dragon.hatchTime,
			dragon.blockchainOriginId
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
		DragonLibrary.Dragon storage dragon = dragons[_tokenId];
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

	function _getForeignTokenId(uint256 _localTokenId) internal view returns (uint256) {
		return _localIdToForeignId[_localTokenId];
	}
}
