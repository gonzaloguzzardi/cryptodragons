pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract DappchainTransferableDragon is DragonFactory {
    address private _gateway;

    constructor(address gateway) DragonBase() public {
        _gateway = gateway;
    }

    // Setter to update who the gateway is
    function setGatewayAddress(address gateway) external onlyOwner {
        _gateway = gateway;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway(uint256 _tokenId, bytes memory _data) public {
        require(msg.sender == _gateway, "only the gateway is allowed to mint");
        _mintDragon(_gateway, _tokenId, _data);
    }
}