// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    event NumberSet(address indexed user, uint256 num);
    event CounterIncremented(address indexed user, uint256 previousNum);

    constructor(uint256 _initialNumber) {
        number = _initialNumber;
    }

    function setNumber(uint256 _number) public {
        number = _number;

        emit NumberSet(msg.sender, _number);
    }

    function increment() public {
        uint256 previousNum = number;
        number++;

        emit CounterIncremented(msg.sender, previousNum);
    }
}
