pragma solidity ^0.5.0;

import "./MainnetTransferableDragon.sol";

contract MainnetMerchantableDragon is MainnetTransferableDragon {

    address private marketplaceAddress;

    constructor(address gateway, uint8 blockchainId) MainnetTransferableDragon(gateway, blockchainId) public {}

    function setMarketplace(address _marketplaceAddress) external onlyOwner {
        require(_marketplaceAddress != address(0), 'The marketplace address cannot be empty');
        marketplaceAddress = _marketplaceAddress;
    }
}