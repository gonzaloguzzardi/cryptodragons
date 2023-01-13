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

    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address to, bool approved) external;
}

contract MainnetMarketplace is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemsCancelled;

    /*
     * @dev Maps listing id to listed item
     */
    mapping(uint256 => ListingData) private _idToListedItem;

    /*
     * @dev Maps token id to listing id
     */
    mapping(uint256 => uint256) private _tokenIdToListingId;

    /************* Fees ****************/
    uint256 public teamFee = 1;
    address payable private _teamAddress;

    enum ListingStatus {
        Active,
        Sold,
        Cancelled
    }

    struct ListingData {
        uint256 listingId;
        uint256 tokenId;
        address nftContract;
        address payable seller;
        uint256 price;
        ListingStatus status;
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
        require(teamAddress != address(0), "Invalid team address");
        _teamAddress = payable(teamAddress);
    }

    /**************************** View Functions ********************************************************/

    function geListedItem(uint256 listingId) external view returns (ListingData memory) {
        return _idToListedItem[listingId];
    }

    function geListingId(uint256 tokenId) external view returns (uint256) {
        return _tokenIdToListingId[tokenId];
    }

    function isOnSale(uint256 tokenId) external view returns (bool) {
        return _tokenIdToListingId[tokenId] != 0;
    }

    function getActiveListingsForAddress(address sellerAddress) external view returns (ListingData[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (_idToListedItem[i].seller == sellerAddress && _idToListedItem[i].status == ListingStatus.Active) {
                itemCount += 1;
            }
        }

        ListingData[] memory items = new ListingData[](itemCount);
        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (_idToListedItem[i].seller == sellerAddress && _idToListedItem[i].status == ListingStatus.Active) {
                uint256 currentId = _idToListedItem[i].listingId;
                ListingData storage currentItem = _idToListedItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMarketItems() external view returns (ListingData[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current() - _itemsCancelled.current();
        uint256 currentIndex = 0;

        ListingData[] memory items = new ListingData[](unsoldItemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (_idToListedItem[i].status == ListingStatus.Active) {
                uint256 currentId = _idToListedItem[i].listingId;
                ListingData storage currentItem = _idToListedItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    /**************************** External Functions ********************************************************/
    
    function listToken(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");

        _itemIds.increment();
        uint256 listingId = _itemIds.current();

        _idToListedItem[listingId] = ListingData(
            listingId,
            tokenId,
            nftContract,
            payable(msg.sender),
            price,
            ListingStatus.Active
        );
        _tokenIdToListingId[tokenId] = listingId;

        IERC721(nftContract).approve(address(this), tokenId);

        emit ItemListed(listingId, tokenId, nftContract, msg.sender, price);
    }

    function buyListedToken(address nftContract, uint256 listingId) external payable nonReentrant {
        ListingData storage listedItem = _idToListedItem[listingId];
        uint256 price = listedItem.price;
        uint256 tokenId = listedItem.tokenId;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        require(listedItem.status == ListingStatus.Active, "Item no longer on sale");

        // State changes
        _idToListedItem[listingId].status = ListingStatus.Sold;
        _tokenIdToListingId[tokenId] = 0;
        _itemsSold.increment();

        // Transfer money charging 5% fees: 4% to rewards treasury and 1% to team.
        uint256 teamFeeCharge = (price * teamFee) / 100;
        listedItem.seller.transfer(msg.value - teamFeeCharge);
        _teamAddress.transfer(teamFeeCharge);

        // Transfer NFT ownership
        IERC721(nftContract).safeTransferFrom(listedItem.seller, msg.sender, tokenId);

        emit ItemSold(listingId, tokenId, nftContract, listedItem.seller, msg.sender, price);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        ListingData storage listedItem = _idToListedItem[listingId];

        require(msg.sender == listedItem.seller, "Only seller can cancel listing");
        require(listedItem.status == ListingStatus.Active, "Item not on sale");

        listedItem.status = ListingStatus.Cancelled;
        _itemsCancelled.increment();
        _tokenIdToListingId[listedItem.tokenId] = 0;

        emit ItemCancelled(listingId, listedItem.seller);
    }
}
