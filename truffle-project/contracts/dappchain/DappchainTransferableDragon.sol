pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract IDappchainGateway {
  function onERC721Received(address operator, address _from, uint256 _uid, bytes memory data)public returns (bytes4) {}
  function onERC20Received(address _from, uint256 amount) public returns (bytes4) {}
}

contract DappchainTransferableDragon is DragonFactory {
    address private _gateway;

    constructor(address gateway) DragonBase() public {
        _gateway = gateway;
    }

    // Setter to update who the gateway is
    function setGatewayAddress(address gateway) external onlyOwner {
        //TODO check address is a gateway
        _gateway = gateway;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway(uint256 _tokenId, bytes memory _data) public {
        require(msg.sender == _gateway, "only the gateway is allowed to mint");
        _mintDragon(_gateway, _tokenId, _data);
    }

    function transferToGateway(uint256 _tokenId) public {
        Dragon storage dragon = dragons[_tokenId];
        bytes memory encodedDragon = _encodeDragonToBytes(dragon);
        transferFrom(msg.sender, _gateway, _tokenId);

        IDappchainGateway gateway = IDappchainGateway(_gateway);
        gateway.onERC721Received(msg.sender, msg.sender, _tokenId, encodedDragon);
    }
}