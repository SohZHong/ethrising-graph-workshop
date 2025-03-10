import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { CounterIncremented, NumberSet } from "../generated/Counter/Counter"

export function createCounterIncrementedEvent(
  user: Address,
  previousNum: BigInt
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

  return counterIncrementedEvent
}

export function createNumberSetEvent(user: Address, num: BigInt): NumberSet {
  let numberSetEvent = changetype<NumberSet>(newMockEvent())

  numberSetEvent.parameters = new Array()

  numberSetEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  numberSetEvent.parameters.push(
    new ethereum.EventParam("num", ethereum.Value.fromUnsignedBigInt(num))
  )

  return numberSetEvent
}
