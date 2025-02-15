# Ethrising Graph Workshop

## 📌 Prerequisites

- A crypto wallet
- A smart contract address on [supported network](https://thegraph.com/docs/en/supported-networks/).
- [Node.js](https://nodejs.org/) installed (v20.0.0 above)
- Package manager of your choice (`npm`, `pnpm`, `yarn`)

## 🛠️ How to Build a Subgraph

### 1. Create a subgraph in Subgraph Studio

Go to [Subgraph Studio](https://thegraph.com/studio/) and connect your wallet.

Subgraph Studio lets you create, manage, deploy, and publish subgraphs, as well as create and manage API keys.

Click "Create a Subgraph". It is recommended to name the subgraph in Title Case: "Subgraph Name Chain Name".

### 2. Install the Graph CLI

On your local machine, run one of the following commands:

Using [npm](https://www.npmjs.com/):

```sh
npm install -g @graphprotocol/graph-cli@latest
```

Using [yarn](https://yarnpkg.com/):

```sh
yarn global add @graphprotocol/graph-cli
```

### 3. Initialize your subgraph

> You can find commands for your specific subgraph on the subgraph page in [Subgraph Studio](https://thegraph.com/studio/).

The `graph init` command will automatically create a scaffold of a subgraph based on your contract's events.

The following command initializes your subgraph from an existing contract:

```sh
graph init
```

If your contract is verified on the respective blockscanner where it is deployed (such as [Etherscan](https://etherscan.io/)), then the ABI will automatically be created in the CLI.

When you initialize your subgraph, the CLI will ask you for the following information:

- **Network**: Choose the network your subgraph will be indexing data from.
- **Subgraph slug**: Create a name for your subgraph. Your subgraph slug is an identifier for your subgraph.
- **Directory**: Choose a directory to create your subgraph in.
- **Contract address**: Locate the smart contract address you’d like to query data from.
- **ABI**: If the ABI is not auto-populated, you will need to input it manually as a JSON file.
- **Start Block**: You should input the start block to optimize subgraph indexing of blockchain data. Locate the start block by finding the block where your contract was deployed.
- **Contract Name**: Input the name of your contract.
- **Index contract events as entities**: It is suggested that you set this to true, as it will automatically add mappings to your subgraph for every emitted event.

See the following screenshot for an example for what to expect when initializing your subgraph:
![Subgraph command](/img/graph-init-command.png)

### 4. Edit your subgraph

The `init` command in the previous step creates a scaffold subgraph that you can use as a starting point to build your subgraph.

When making changes to the subgraph, you will mainly work with three files:

- Manifest (`subgraph.yaml`) - defines what data sources your subgraph will index.
- Schema (`schema.graphql`) - defines what data you wish to retrieve from the subgraph.
- AssemblyScript Mappings (`mapping.ts`) - translates data from your data sources to the entities defined in the schema.

### 5. Deploy your subgraph

When you **deploy** a subgraph, you push it to [Subgraph Studio](https://thegraph.com/studio/), where you can test, stage and review it.

Once your subgraph is written, run the following commands:

```sh
graph codegen && graph build
```

Authenticate and deploy your subgraph. The deploy key can be found on the subgraph's page in Subgraph Studio.

![Deploy key](/img/deploy-key.png)

```sh
graph auth <DEPLOY_KEY>

graph deploy <SUBGRAPH_SLUG>
```

The CLI will ask for a version label. It's strongly recommended to use [semantic versioning](https://semver.org/), e.g. `0.0.1`.

### 6. Review your subgraph

If you’d like to test your subgraph before publishing it, you can use [Subgraph Studio](https://thegraph.com/studio/) to do the following:

- Run a sample query.
- Analyze your subgraph in the dashboard to check information.
