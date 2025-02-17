// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter2 {
    uint256 public number = 0;
    uint256 public threshold = 10;

    event NumberSet(address indexed user, uint256 num, uint256 timestamp);
    event CounterIncremented(address indexed user, uint256 previousNum, uint256 timestamp);
    event ThresholdReached(uint256 currentNumber, uint256 threshold, uint256 timestamp);
    event ResetTriggered(uint256 oldNumber, uint256 timestamp);

    function setNumber(uint256 _number) public {
        number = _number;

        emit NumberSet(msg.sender, _number, block.timestamp);
    }

    function increment() public {
        uint256 previousNum = number;
        number++;

        emit CounterIncremented(msg.sender, previousNum, block.timestamp);

        // Emit event if threshold is reached
        if (number >= threshold) {
            emit ThresholdReached(number, threshold, block.timestamp);
        }
    }

    function reset() public {
        uint256 oldNumber = number;
        number = 0;

        emit ResetTriggered(oldNumber, block.timestamp);
    }
}