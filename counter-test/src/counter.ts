import {
  CounterIncremented as CounterIncrementedEvent,
  NumberSet as NumberSetEvent
} from "../generated/Counter/Counter"
import { CounterIncremented, NumberSet } from "../generated/schema"

export function handleCounterIncremented(event: CounterIncrementedEvent): void {
  let entity = new CounterIncremented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.previousNum = event.params.previousNum
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNumberSet(event: NumberSetEvent): void {
  let entity = new NumberSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.num = event.params.num
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
