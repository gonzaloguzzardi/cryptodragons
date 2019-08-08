pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract IMainnetGateway {
  function onERC721Received(address operator, address _from, uint256 _uid, bytes memory data)public returns (bytes4) {}
  function onERC20Received(address _from, uint256 amount) public returns (bytes4) {}
}

contract MainnetTransferableDragon is DragonFactory {
    address private _gateway;

    constructor(address gateway) DragonBase() public {
        _gateway = gateway;
    }

    // Setter to update who the gateway is
    function setGatewayAddress(address gateway) external onlyOwner {
        _gateway = gateway;
    }

    function transferToGateway(uint256 _tokenId) public {
        Dragon storage dragon = dragons[_tokenId];
        bytes memory encodedDragon = _encodeDragonToBytes(dragon);
        transferFrom(msg.sender, _gateway, _tokenId);

        IMainnetGateway gateway = IMainnetGateway(_gateway);
        gateway.onERC721Received(msg.sender, msg.sender, _tokenId, encodedDragon);
    }

    function register(uint256 _uid) public pure {}
}