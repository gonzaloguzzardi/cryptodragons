// SPDX-License-Identifier: GPL-3.0 License

pragma solidity ^0.8.0;

import "../../common/ownership/Ownable.sol";
import "../../common/security/ReentrancyGuard.sol";
import "../../common/utils/Counters.sol";

interface IERC721 {
	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId
	) external;
}

contract MainnetMarketplace is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIdsCounter;
    /*
     * @dev Maps listing id to listed item
     */
    mapping(uint256 => uint256) private _listingIdToIndex;
    mapping(uint256 => bool) private _listingIdToListingIsActive;
    ListingData[] private _activeListings;

    /************* Fees ****************/
    uint256 public teamFee = 2;
    address payable private _teamAddress;

    struct ListingData {
        uint256 listingId;
        uint256 tokenId;
        address nftContract;
        address payable seller;
        uint256 price;
    }

    event ItemListed(
        uint256 indexed listingId,
        uint256 indexed tokenId,
        address indexed nftContract,
        address seller,
        uint256 price
    );

    event ItemSold(
        uint256 indexed listingId,
        uint256 indexed tokenId,
        address indexed nftContract,
        address seller,
        address buyer,
        uint256 price
    );

    event ItemCancelled(uint256 listingId, address seller);

    /****************************** Restricted Functions **********************************************************/
    /**
     * @dev Function to change fees in case adjustments are needed or for special events
     */
    function setTeamFee(uint256 _teamFee) external onlyOwner {
        teamFee = _teamFee;
    }

    /**
     * @dev Change addresses where fees are deposited
     */
    function setFeeAccounts(address teamAddress) external onlyOwner {
        require(teamAddress != address(0), "Invalid tean address");
        _teamAddress = payable(teamAddress);
    }

    /****************************** External Functions **********************************************************/

    function listToken(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");

        _listingIdsCounter.increment();
        uint256 listingId = _listingIdsCounter.current();
        uint256 index = _activeListings.length;
        _listingIdToIndex[listingId] = index;
        _listingIdToListingIsActive[listingId] = true;

        _activeListings.push(ListingData(listingId, tokenId, nftContract, payable(msg.sender), price));

        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);

        emit ItemListed(listingId, tokenId, nftContract, msg.sender, price);
    }

    function buyListedToken(address nftContract, uint256 listingId) external payable nonReentrant {
        require(_listingIdToListingIsActive[listingId] == true, "Item no longer on sale");

        uint256 index = _listingIdToIndex[listingId];

        // Copy data to memory to keep the reference after listing is destroyed
        ListingData memory listedItem = _activeListings[index];
        uint256 price = listedItem.price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        // State changes
        _listingIdToListingIsActive[listingId] = false;
        removeListingAtIndex(index);

        // Transfer money charging 2% fee for team.
        uint256 teamFeeCharge = (price * teamFee) / 100;
        listedItem.seller.transfer(msg.value - teamFeeCharge);
        _teamAddress.transfer(teamFeeCharge);

        // Transfer NFT ownership
        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, listedItem.tokenId);

        emit ItemSold(listingId, listedItem.tokenId, nftContract, listedItem.seller, msg.sender, price);
    }

    function cancelListing(uint256 listingId) external {
        require(_listingIdToListingIsActive[listingId] == true, "Item not on sale");

        uint256 index = _listingIdToIndex[listingId];
        ListingData memory listedItem = _activeListings[index];

        require(msg.sender == listedItem.seller, "Only seller can cancel listing");

        _listingIdToListingIsActive[listingId] = false;
        removeListingAtIndex(index);

        IERC721(listedItem.nftContract).safeTransferFrom(address(this), msg.sender, listedItem.tokenId);

        emit ItemCancelled(listingId, listedItem.seller);
    }

    /************************************** View Functions ***************************************************/

    function getListedItem(uint256 listingId) external view returns (ListingData memory) {
        require(_listingIdToListingIsActive[listingId] == true, "Item not on sale");

        uint256 index = _listingIdToIndex[listingId];
        return _activeListings[index];
    }

    function getAllListedItems() external view returns (ListingData[] memory) {
        return _activeListings;
    }

    function getActiveListingsForAddress(address sellerAddress) external view returns (ListingData[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < _activeListings.length; i++) {
            if (
                _activeListings[i].seller == sellerAddress &&
                _listingIdToListingIsActive[_activeListings[i].listingId] == true
            ) {
                itemCount += 1;
            }
        }

        ListingData[] memory items = new ListingData[](itemCount);
        for (uint256 i = 0; i < _activeListings.length; i++) {
            if (
                _activeListings[i].seller == sellerAddress &&
                _listingIdToListingIsActive[_activeListings[i].listingId] == true
            ) {
                ListingData storage currentItem = _activeListings[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /************************************** Private Functions ***************************************************/

    function removeListingAtIndex(uint256 index) private {
        require(index < _activeListings.length, "Error removing listing");

        ListingData storage lastListing = _activeListings[_activeListings.length - 1];

        // Update index mapping
        _listingIdToIndex[lastListing.listingId] = index;

        // Move last element to index position and remove last element from listing array
        _activeListings[index] = _activeListings[_activeListings.length - 1];
        _activeListings.pop();
    }
}
