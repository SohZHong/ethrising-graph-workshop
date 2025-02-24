import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { ResetTriggered } from "../generated/schema"
import { ResetTriggered as ResetTriggeredEvent } from "../generated/Counter2/Counter2"
import { handleResetTriggered } from "../src/counter-2"
import { createResetTriggeredEvent } from "./counter-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let oldNumber = BigInt.fromI32(234)
    let newResetTriggeredEvent = createResetTriggeredEvent(oldNumber)
    handleResetTriggered(newResetTriggeredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ResetTriggered created and stored", () => {
    assert.entityCount("ResetTriggered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ResetTriggered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldNumber",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
