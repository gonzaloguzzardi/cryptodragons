pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract DragonToken is ERC721Full, ERC721Mintable {
    mapping(address => bool) private registered;
    address public gateway;

    constructor(address _gateway) ERC721Full("DragonToken", "DTKN") public {
        gateway = _gateway;
    }

    function register(address user) external {
        for (uint8 j = 0; j < 1 ; j++) {
            create(user); // Give each new player 1 dragons
        }
    }

    // This function gives a user the token
    function create(address user) private {
        uint256 tokenId = 12345; // @TODO: hardcoded value, use mechanism for ID assignment
        _mint(user, tokenId);
    }

    // This function should be used to transfer a token from some user to another through gateway
    function depositToGateway(uint tokenId) public {
        safeTransferFrom(msg.sender, gateway, tokenId);
    }

}