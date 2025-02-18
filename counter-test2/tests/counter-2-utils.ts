import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CounterIncremented,
  NumberSet,
  ResetTriggered,
  ThresholdReached
} from "../generated/Counter2/Counter2"

export function createCounterIncrementedEvent(
  user: Address,
  previousNum: BigInt,
  timestamp: BigInt
): CounterIncremented {
  let counterIncrementedEvent = changetype<CounterIncremented>(newMockEvent())

  counterIncrementedEvent.parameters = new Array()

  counterIncrementedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  counterIncrementedEvent.parameters.push(
    new ethereum.EventParam(
      "previousNum",
      ethereum.Value.fromUnsignedBigInt(previousNum)
    )
  )
  counterIncrementedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return counterIncrementedEvent
}

export function createNumberSetEvent(
  user: Address,
  num: BigInt,
  timestamp: BigInt
): NumberSet {
  let numberSetEvent = changetype<NumberSet>(newMockEvent())

  numberSetEvent.parameters = new Array()

  numberSetEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  numberSetEvent.parameters.push(
    new ethereum.EventParam("num", ethereum.Value.fromUnsignedBigInt(num))
  )
  numberSetEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return numberSetEvent
}

export function createResetTriggeredEvent(
  oldNumber: BigInt,
  timestamp: BigInt
): ResetTriggered {
  let resetTriggeredEvent = changetype<ResetTriggered>(newMockEvent())

  resetTriggeredEvent.parameters = new Array()

  resetTriggeredEvent.parameters.push(
    new ethereum.EventParam(
      "oldNumber",
      ethereum.Value.fromUnsignedBigInt(oldNumber)
    )
  )
  resetTriggeredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return resetTriggeredEvent
}

export function createThresholdReachedEvent(
  currentNumber: BigInt,
  threshold: BigInt,
  timestamp: BigInt
): ThresholdReached {
  let thresholdReachedEvent = changetype<ThresholdReached>(newMockEvent())

  thresholdReachedEvent.parameters = new Array()

  thresholdReachedEvent.parameters.push(
    new ethereum.EventParam(
      "currentNumber",
      ethereum.Value.fromUnsignedBigInt(currentNumber)
    )
  )
  thresholdReachedEvent.parameters.push(
    new ethereum.EventParam(
      "threshold",
      ethereum.Value.fromUnsignedBigInt(threshold)
    )
  )
  thresholdReachedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return thresholdReachedEvent
}
