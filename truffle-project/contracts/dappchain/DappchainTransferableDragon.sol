pragma solidity ^0.5.0;

import "../common/DragonFactory.sol";

contract IDappchainGateway {
  function depositDragon(address from, address to, uint256 uid, bytes memory data) public {}
}

contract DappchainTransferableDragon is DragonFactory {
    address private _gateway;

    // map sidechain address to mainchain address
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

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function retrieveToken(address receiver, uint256 _tokenId, bytes memory _data) public {
        require(msg.sender == _gateway, "only the gateway is allowed to call this function");
        _mintDragon(receiver, _tokenId, _data);
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

    function transferToGateway(uint256 _tokenId) public onlyDragonOwner(_tokenId) {
        Dragon storage dragon = dragons[_tokenId];
        bytes memory encodedDragon = _encodeDragonToBytes(dragon);
        transferFrom(msg.sender, _gateway, _tokenId);

        IDappchainGateway gateway = IDappchainGateway(_gateway);
        // @TODO: HAY QUE USAR LA LINEA COMENTADA, POR AHORA HARDCODEO EL USER DE GANACHE!!!
        gateway.depositDragon(msg.sender, _mainnetMapping[msg.sender], _tokenId, encodedDragon);
        //gateway.depositDragon(msg.sender, address(0x28863498efede12296888f7ca6cf0b94974fbdbc), _tokenId, encodedDragon);
    }
}