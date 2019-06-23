pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract MainnetTransferableDragon is DragonFactory {
    address private _gateway;

    constructor(address gateway) DragonBase() public {
        _gateway = gateway;
    }

    // Setter to update who the gateway is
    function setGatewayAddress(address gateway) external onlyOwner {
        _gateway = gateway;
    }

    // Used to transfer tokens to the gateway and the transfer them to the sidechain
    function transferToGateway(uint256 _tokenId) public {
        Dragon storage dragon = dragons[_tokenId];
        bytes memory encodedDragon = _encodeDragonToBytes(dragon);
        safeTransferFrom(msg.sender, _gateway, _tokenId, encodedDragon);
    }

    function register(uint256 _uid) public {}
}