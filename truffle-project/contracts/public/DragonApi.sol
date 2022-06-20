// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import '../common/token/IERC721Enumerable.sol';
import '../common/token/IERC721.sol';
import '../common/libraries/DragonLibrary.sol';

interface IDragonContract {
	function getDragonById(uint256 _dragonId) external view returns (DragonLibrary.Dragon memory);
}

interface IGenesLaboratory {
	function getVisualAttributes(bytes32 genes)
		external
		pure
		returns (DragonLibrary.DragonVisualAttributes memory);
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
	 * @dev Return dragons with pagination
	 * @param pageNumber page starting with value 1. Page 1 will return dragons with id 0 to pageSize
	 * @param pageSize amount of dragons that will be returned in each page
	 * @return totalPages amount of pages that can be fetched
	 * @return dragonPagesData all dragon ids contain in the resulting page
	 */
	function getDragonsByPage(uint256 pageNumber, uint256 pageSize) external view returns (uint256 totalPages, DragonLibrary.DragonFetchPageData[] memory dragonPagesData) {
		require(pageSize > 0, "pageSize cannot be zero");
		
		uint256 cursor = (pageNumber - 1) * pageSize;
		uint256 totalDragons = IERC721Enumerable(_dragonAddress).totalSupply();

		require(cursor <= totalDragons, "Out of range page");

		uint256 length = pageSize;
		if (length > totalDragons - cursor) {
			length = totalDragons - cursor;
		}

		dragonPagesData = new DragonLibrary.DragonFetchPageData[](length);
		for (uint256 i = 0; i < length; i++) {
			uint256 tokenId = cursor + i;
			address dragonOwner = IERC721(_dragonAddress).ownerOf(tokenId);
			dragonPagesData[i] = DragonLibrary.DragonFetchPageData( {
				dragonId: tokenId,
				owner: dragonOwner,
				onSale: isDragonOnSale(dragonOwner)
			});
		}

		uint256 pages = (totalDragons / pageSize);
		if (totalDragons - (pages * pageSize) > 0) {
			pages += 1;
		}
		return (pages, dragonPagesData);
    }

	/**
	 * @dev Get all dragons ids owned by owner address
	 */
	function getDragonsIdsByOwner(address owner) external view returns (uint256[] memory) {
		IERC721Enumerable dragonContract = IERC721Enumerable(_dragonAddress);
		uint256 balance = dragonContract.balanceOf(owner);
		uint[] memory tokensOfOwner = new uint[](balance);
		for (uint256 i = 0; i < balance; i++) {
			tokensOfOwner[i] = dragonContract.tokenOfOwnerByIndex(owner, i);
		}
		return tokensOfOwner;
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
		returns (DragonLibrary.DragonVisualAttributes memory)
	{
		DragonLibrary.Dragon memory dragon = IDragonContract(_dragonAddress).getDragonById(dragonId);
		return IGenesLaboratory(_genesLaboratory).getVisualAttributes(dragon.genes);
	}

	function isDragonOnSale(address dragonOwner) internal virtual view returns (bool) {
		return false;
	}
}