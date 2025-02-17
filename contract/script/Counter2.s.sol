// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter2} from "../src/Counter2.sol";

contract CounterScript is Script {
    Counter2 public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        counter = new Counter2();

        vm.stopBroadcast();
    }
}