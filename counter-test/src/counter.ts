import {
  CounterIncremented as CounterIncrementedEvent,
  NumberSet as NumberSetEvent,
} from '../generated/Counter/Counter';
import { CounterIncremented, NumberSet, User } from '../generated/schema';

/**
 * Handles the CounterIncremented event and stores data in The Graph.
 * Think of this like a journal entry—whenever the counter increases, we log who did it and what the previous number was.
 */
export function handleCounterIncremented(event: CounterIncrementedEvent): void {
  // Create a unique ID for the entity using the transaction hash and log index.
  let entity = new CounterIncremented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  // Load the user entity from storage, or create a new one if it doesn't exist.
  let user = User.load(event.params.user);
  if (!user) {
    user = new User(event.params.user);
  }
  user.save(); // Save the user into the database.

  // Associate this counter increment with the user who triggered it.
  entity.user = user.id;
  entity.previousNum = event.params.previousNum; // Store the previous number before increment.

  // Capture blockchain details for traceability.
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save(); // Save the data into The Graph.
}

/**
 * Handles the NumberSet event and records data.
 * This is like setting a new value in a spreadsheet, where we record the user and the new number they set.
 */
export function handleNumberSet(event: NumberSetEvent): void {
  // Generate a unique ID using transaction hash and log index.
  let entity = new NumberSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );

  // Store event details (user, number set, and blockchain metadata).
  entity.user = event.params.user;
  entity.num = event.params.num;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64(); // Convert timestamp to a long integer.
  entity.transactionHash = event.transaction.hash;

  entity.save(); // Save the data into The Graph.
}

// Add the code from the generated counter-2.ts under here and delete counter-2.ts
import {
  ResetTriggered as ResetTriggeredEvent,
  ThresholdReached as ThresholdReachedEvent,
} from '../generated/Counter2/Counter2';
import { ResetTriggered, ThresholdReached } from '../generated/schema';

export function handleResetTriggered(event: ResetTriggeredEvent): void {
  let entity = new ResetTriggered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldNumber = event.params.oldNumber;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleThresholdReached(event: ThresholdReachedEvent): void {
  let entity = new ThresholdReached(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.currentNumber = event.params.currentNumber;
  entity.threshold = event.params.threshold;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
