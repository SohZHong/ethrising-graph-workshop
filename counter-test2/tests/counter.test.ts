import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { CounterIncremented } from '../generated/schema';
import { CounterIncremented as CounterIncrementedEvent } from '../generated/Counter/Counter';
import { handleCounterIncremented } from '../src/counter';
import { createCounterIncrementedEvent } from './counter-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let user = Address.fromString('0x0000000000000000000000000000000000000001');
    let previousNum = BigInt.fromI32(234);
    let timestamp = BigInt.fromI32(234);
    let newCounterIncrementedEvent = createCounterIncrementedEvent(
      user,
      previousNum,
      timestamp
    );
    handleCounterIncremented(newCounterIncrementedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('CounterIncremented created and stored', () => {
    assert.entityCount('CounterIncremented', 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'CounterIncremented',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'user',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals(
      'CounterIncremented',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'previousNum',
      '234'
    );
    assert.fieldEquals(
      'CounterIncremented',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'timestamp',
      '234'
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
