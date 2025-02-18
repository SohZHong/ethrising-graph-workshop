import {
  CounterIncremented as CounterIncrementedEvent,
  NumberSet as NumberSetEvent,
} from '../generated/Counter/Counter';
import { ResetTriggered as ResetTriggeredEvent } from '../generated/Counter2/Counter2';
import {
  CounterIncremented,
  NumberSet,
  ResetTriggered,
  User,
} from '../generated/schema';

export function handleCounterIncremented(event: CounterIncrementedEvent): void {
  let user = User.load(event.params.user);
  if (!user) {
    user = new User(event.params.user);
  }
  user.save();
  let entity = new CounterIncremented(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.user = user.id;
  entity.previousNum = event.params.previousNum;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNumberSet(event: NumberSetEvent): void {
  let user = User.load(event.params.user);
  if (!user) {
    user = new User(event.params.user);
  }
  user.save();
  let entity = new NumberSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.user = user.id;
  entity.num = event.params.num;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleResetTriggered(event: ResetTriggeredEvent): void {
  let entity = new ResetTriggered(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.oldNumber = event.params.oldNumber;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
