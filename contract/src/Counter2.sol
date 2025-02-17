// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter2 {
    uint256 public number = 0;
    uint256 public threshold = 10;

    event NumberSet(address indexed user, uint256 num);
    event CounterIncremented(address indexed user, uint256 previousNum);
    event ThresholdReached(uint256 currentNumber, uint256 threshold);
    event ResetTriggered(uint256 oldNumber);

    function setNumber(uint256 _number) public {
        number = _number;

        emit NumberSet(msg.sender, _number);
    }

    function increment() public {
        uint256 previousNum = number;
        number++;

        emit CounterIncremented(msg.sender, previousNum);

        // Emit event if threshold is reached
        if (number >= threshold) {
            emit ThresholdReached(number, threshold);
        }
    }

    function reset() public {
        uint256 oldNumber = number;
        number = 0;

        emit ResetTriggered(oldNumber);
    }
}