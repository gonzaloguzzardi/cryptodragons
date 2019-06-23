pragma solidity ^0.5.0;

import "../Roles.sol";
import "../../ownership/Ownable.sol";

contract Minter is Ownable{
    using Roles for Roles.Role;

    Roles.Role private minters;

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    constructor() internal {
        _addMinter(msg.sender);
    }

    modifier onlyMinter() {
        require(isMinter(msg.sender), "Must have the minter roler to perform this action");
        _;
    }

    function isMinter(address account) public view returns (bool) {
        return minters.has(account);
    }

    function addMinter(address account) public onlyOwner {
        _addMinter(account);
    }

    function renounceMinter() public {
        _removeMinter(msg.sender);
    }

    function _addMinter(address account) internal {
        minters.add(account);
        emit MinterAdded(account);
    }

    function _removeMinter(address account) internal {
        minters.remove(account);
        emit MinterRemoved(account);
    }
}