pragma solidity ^0.5.0;

// A template contract that is just a string-to-string map.
contract Blueprint {
    event ValueChanged(string key, string newValue);
    event ValueRemoved(string key);

    mapping (string => string) database;

    constructor() public {
    }

    function store(string memory key,string memory value) public {
        database[key] = value;
        emit ValueChanged(key, value);
    }

    function load(string memory key) public view returns(string memory) {
        return database[key];
    }

    function remove(string memory key) public {
        delete database[key];
        emit ValueRemoved(key);
    }
}
