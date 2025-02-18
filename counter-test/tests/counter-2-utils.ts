import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  ResetTriggered,
  ThresholdReached
} from "../generated/Counter2/Counter2"

export function createResetTriggeredEvent(oldNumber: BigInt): ResetTriggered {
  let resetTriggeredEvent = changetype<ResetTriggered>(newMockEvent())

  resetTriggeredEvent.parameters = new Array()

  resetTriggeredEvent.parameters.push(
    new ethereum.EventParam(
      "oldNumber",
      ethereum.Value.fromUnsignedBigInt(oldNumber)
    )
  )

  return resetTriggeredEvent
}

export function createThresholdReachedEvent(
  currentNumber: BigInt,
  threshold: BigInt
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

  return thresholdReachedEvent
}
