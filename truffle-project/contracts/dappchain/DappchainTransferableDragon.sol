pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract IDappchainGateway {
  function depositERC721(address from, address to, uint256 uid, bytes memory data) public {}
}

contract DappchainTransferableDragon is DragonFactory {
    address private _gateway;
    mapping (address => address) private _mainnetMapping;

    constructor(address gateway) DragonBase() public {
        require(gateway != address(0), "Invalid gateway address");
        _gateway = gateway;
    }

    // Setter to update who the gateway is
    function setGatewayAddress(address gateway) external onlyOwner {
        //TODO check address is a gateway
        _gateway = gateway;
    }

    function undoMapping(address owner, address mainnetAddress) external onlyOwner {
        require(owner != address(0), "Invalid owner address to be mapped");
        require(mainnetAddress != address(0), "Invalid mainnet address to be mapped");
        _mainnetMapping[owner] = mainnetAddress;
    }

    function mapContractToMainnet(address mainnetAddress) external {
        require(mainnetAddress != address(0), "Invalid mainnet address to be mapped");
        require(_mainnetMapping[msg.sender] != address(0), "Address already mapped. Request owner to undo the mapping");
        _mainnetMapping[msg.sender] = mainnetAddress;
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
        gateway.depositERC721(msg.sender, _gateway, _tokenId, encodedDragon);
    }
}