// SPDX-License-Identifier: GPL-3.0 License

pragma solidity 0.8.4;

import '../common/token/IERC721Enumerable.sol';
import '../common/libraries/DragonLibrary.sol';

interface IDragonContract {
	function getDragonById(uint256 _dragonId) external view returns (DragonLibrary.Dragon memory);
}

interface IGenesLaboratory {
	function getVisualAttributes(bytes32 genes)
		external
		pure
		returns (
			uint16 head,
			uint16 body,
			uint16 wings
		);
}

contract DragonApi {

    address internal _dragonAddress;
	address internal _genesLaboratory;

    constructor(address dragonAddress, address genesLaboratory) {
		require(dragonAddress != address(0), 'Invalid dragon address');
		require(genesLaboratory != address(0), 'Invalid genes laboratory address');

		_dragonAddress = dragonAddress;
		_genesLaboratory = genesLaboratory;
	}

	/*******************************************************************************************
        Actions
    ********************************************************************************************/

	/*******************************************************************************************
        GETTERS
    ********************************************************************************************/

	/**
	 * @dev Get all dragons ids owned by owner address
	 */
	function getDragonsIdsByOwner(address owner) external view returns (uint256[] memory tokenIds) {
		IERC721Enumerable dragonContract = IERC721Enumerable(_dragonAddress);
		uint256 balance = dragonContract.balanceOf(owner);
		for (uint256 i = 0; i < balance; i++) {
			tokenIds[i] = dragonContract.tokenOfOwnerByIndex(owner, i);
		}
	}

	/**
	 * @dev Get dragon data by dragon id
	 */
	function getDragonById(uint256 dragonId) external view returns (DragonLibrary.Dragon memory) {
		return IDragonContract(_dragonAddress).getDragonById(dragonId);
	}

	/**
	 * @dev Get amount of dragons owned by owner address
	 */
	function getDragonsCountByOwner(address owner) external view returns (uint256) {
		return IERC721Enumerable(_dragonAddress).balanceOf(owner);
	}

	/**
	 * @dev return if dragon is in egg stage
	 */
	function isEgg(uint256 dragonId) public view returns (bool) {
		DragonLibrary.Dragon memory dragon = IDragonContract(_dragonAddress).getDragonById(dragonId);
		uint256 lifeTimeSinceCreation = (block.timestamp - dragon.creationTime) * 60;
		return (lifeTimeSinceCreation < dragon.hatchTime);
	}

	function getVisualAttributes(uint256 dragonId)
		external
		view
		returns (
			uint16 head,
			uint16 body,
			uint16 wings
		)
	{
		DragonLibrary.Dragon memory dragon = IDragonContract(_dragonAddress).getDragonById(dragonId);
		(head, body, wings) = IGenesLaboratory(_genesLaboratory).getVisualAttributes(dragon.genes);
	}
}