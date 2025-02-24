# Ethrising Graph Workshop

## Tracking multiple smart contracts

This guide explains how to track multiple smart contracts using The Graph by adding an additional contract and merging entities.

### 1. Add Another Contract Address

To start tracking a second smart contract, run the following command:

```sh
graph add 0xBF8E6ae1295F486dCc15125F8EDc44dAfB92340e --merge-entities
```

- `graph add [contract_address]` – Adds a new contract to your subgraph.
- `--merge-entities` – Ensures that similar event entities from both contracts are merged into a single dataset instead of creating separate tables.

### 2. Register entities (database tables) and event handlers under 2nd contract

Now, we need to register entities (database tables) and event handlers for the second contract.

#### 2.1 Modify schema.graphql

Open `schema.graphql`

Within the file you will see these newly added lines:
![Contract 2](/img/contract-2.png)

Under `entities`, add these two lines

```yaml
- CounterIncremented
- NumberSet
```

And your final result will look like this:
![Added entities](/img/add-entities.png)

#### 2.2 Add event handlers

Next, in your `subgraph.yaml` file, locate the `eventHandlers` section of the newly added code

Add these new event handlers for the second contract:

```yaml
- event: CounterIncremented(indexed address,uint256)
  handler: handleCounterIncremented
- event: NumberSet(indexed address,uint256)
  handler: handleNumberSet
```

The end result will look like this:
![Added event handlers](/img/add-event-handlers.png)

#### 2.3 Update Mapping files

Make sure the target file under `file` is set to `counter.ts` (not `counter-2.ts`):

```yaml
file: ./src/counter.ts
```

### 3. Combine Event Handlers into One File

Since we are now tracking multiple contracts, it is good practise we unify event handlers into a single file.

Steps:

1. Open `counter-2.ts`.
2. Copy all code from `counter-2.ts`.
3. Paste it at the bottom of `counter.ts`.
4. Save the file and delete `counter-2.ts` to avoid redundancy.

Now, all events from both contracts will be handled in one place.

### 4. Deploy Your Subgraph

After making these changes, update your subgraph by running the following commands:

```sh
graph codegen
graph build
graph deploy [your-subgraph-name]
```

- `graph codegen` – Generates TypeScript bindings based on the updated schema.
- `graph build` – Compiles the subgraph and checks for errors.
- `graph deploy [subgraph-name]` – Deploys your subgraph to The Graph’s hosted service.

Once deployed, you can query events from both contracts using GraphQL.
