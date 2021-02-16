pragma solidity ^0.5.0;

import "./MainnetTransferableDragon.sol";

contract IMarketplace {
    function createOrder (
        uint256 dragonId,
        string memory title,
		string memory description,
		uint256 price external;
}

contract MainnetMerchantableDragon is MainnetTransferableDragon {

    address private marketplaceAddress;

    constructor(address gateway, uint8 blockchainId) MainnetTransferableDragon(gateway, blockchainId) public {}

    function setMarketplace(address _marketplaceAddress) external onlyOwner {
        require(_marketplaceAddress != address(0), 'The marketplace address cannot be empty');
        marketplaceAddress = _marketplaceAddress;
    }

    function publishDragon(
        uint256 _tokenId, 
        string memory _title, 
        string memory _description,
        uint256 _price) external onlyDragonOwner(_tokenId) {

        require(marketplaceAddress != address(0), 'The marketplace address needs to be initialized');

        // Allow marketplace to transfer ownership
        approve(marketplaceAddress, _tokenId);

        IMarketplace(marketplaceAddress).createOrder(_tokenId, _title, _description, _price)
    }
}