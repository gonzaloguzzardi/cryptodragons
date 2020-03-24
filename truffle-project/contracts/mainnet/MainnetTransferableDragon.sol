pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract IMainnetGateway {
  function depositDragon(address from, address to, uint256 uid, bytes memory data) public {}
}

contract MainnetTransferableDragon is DragonFactory {
    address private _gateway;

    // map mainnet address to sidechain address
    mapping (address => address) private _sidechainMapping;

    constructor(address gateway) DragonBase() public {
        require(gateway != address(0), "Invalid gateway address");
        _gateway = gateway;
    }

    // Setter to update who the gateway is
    function setGatewayAddress(address gateway) external onlyOwner {
        _gateway = gateway;
    }

    function retrieveToken(address receiver, uint256 _tokenId, bytes memory _data) public {
        require(msg.sender == _gateway, "only the gateway is allowed to call this function");
        _mintDragon(receiver, _tokenId, _data);
    }

    function undoMapping(address owner, address sidechainAddress) external onlyOwner {
        require(owner != address(0), "Invalid owner address to be mapped");
        require(sidechainAddress != address(0), "Invalid sidechain address to be mapped");
        _sidechainMapping[owner] = sidechainAddress;
    }

    function mapContractToSidechain(address sidechainAddress) external {
        require(sidechainAddress != address(0), "Invalid sidechain address to be mapped");
        require(_sidechainMapping[msg.sender] == address(0), "Address already mapped. Request owner to undo the mapping");
        _sidechainMapping[msg.sender] = sidechainAddress;
    }

    function transferToGateway(uint256 _tokenId) public onlyDragonOwner(_tokenId) {
        Dragon storage dragon = dragons[_tokenId];
        bytes memory encodedDragon = _encodeDragonToBytes(dragon);
        transferFrom(msg.sender, _gateway, _tokenId);

        IMainnetGateway gateway = IMainnetGateway(_gateway);
        gateway.depositDragon(msg.sender, _sidechainMapping[msg.sender], _tokenId, encodedDragon);
    }

    function register(uint256 _uid) public pure {}
}