import {
  CounterIncremented as CounterIncrementedEvent,
  NumberSet as NumberSetEvent,
  ResetTriggered as ResetTriggeredEvent,
} from '../generated/Counter2/Counter2';
import {
  CounterIncremented,
  NumberSet,
  ResetTriggered,
} from '../generated/schema';

export function handleCounterIncremented(event: CounterIncrementedEvent): void {
  let entity = new CounterIncremented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.previousNum = event.params.previousNum;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNumberSet(event: NumberSetEvent): void {
  let entity = new NumberSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.user = event.params.user;
  entity.num = event.params.num;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleResetTriggered(event: ResetTriggeredEvent): void {
  let entity = new ResetTriggered(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.oldNumber = event.params.oldNumber;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
