pragma solidity ^0.5.0;

import "../Roles.sol";
import "../../ownership/Ownable.sol";

contract Spender is Ownable {
    using Roles for Roles.Role;

    Roles.Role private spenders;

    event SpenderAdded(address indexed account);
    event SpenderRemoved(address indexed account);

    modifier onlySpender() {
        require(isSpender(msg.sender), "Must have the spender roel to perform this action");
        _;
    }

    function isSpender(address account) public view returns (bool) {
        return spenders.has(account);
    }

    function addSpender(address account) public onlyOwner {
        _addSpender(account);
    }

    function renounceMinter() public {
        _removeSpender(msg.sender);
    }

    function _addSpender(address account) internal {
        spenders.add(account);
        emit SpenderAdded(account);
    }

    function _removeSpender(address account) internal {
        spenders.remove(account);
        emit SpenderRemoved(account);
    }
}