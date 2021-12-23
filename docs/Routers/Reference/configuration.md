---
sidebar_position: 1
---

# Configuration

The router is accepts configuration using the config file `config.json` in the root directory of the [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose).

The JSON schema accepts the following keys:

- `adminToken`: _Required_. Secret token used to authenticate admin requests.
- `routerContractAddress`: _Recommended_. Address of the router contract. If not provided, the router sends transactions itself without a relay. This is deprecated behavior and the router contract should always be used. See the section on [Spinning-Up](../Guides/Spinning-Up) for more info.
- `web3SignerUrl`: _Recommended_. The URL for a running [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) instance. This is the recommended approach to private key storage.
- `mnemonic`: _Optional, Discouraged_. The mnemonic used to generate the private key. Using the mnemonic directly in the config file is unsafe and not recommended.
- `chainConfig`: _Required_. The chain configuration. A JSON object with the following keyed by `chainId` with the following object schema as value:
  - `providers`: _Required_. An array of providers URLs for a chain. Use a minimum of 1 URL, but additional URLs provide more fallback protection against provider issues.
  - `subgraph`: _Optional_. An array of subgraph URLs for a chain. Additional URLs provide more fallback protection against subgraph issues. If not provided, will default to Connext's hosted subgraphs.
  - `analyticsSubgraph`: _Optional_. An array of subgraph URLs for a chain. Additional URLs provide more fallback protection against subgraph issues. If not provided, will default to Connext's hosted subgraphs.
  - `transactionManagerAddress`: _Optional_. The address of the transaction manager contract. If not provided, will default to the latest deployed contracts.
  - `priceOracleAddress`: _Optional_. The address of the price oracle contract. If not provided, will default to the latest deployed contracts.
  - `multicallAddress`: _Optional_. The address of the multicall contract. If not provided, will default to the latest deployed contracts.
  - `confirmations`: _Optional_. The number of confirmations required for a transaction to be considered valid on a chain. Defaults to defined values [here](https://github.com/connext/chaindata/blob/29cc0250aff398cdf9326dcb7698d291f3e3015a/crossChain.json).
  - `minGas`: _Optional_. The minimum gas amount required to be held by the router's signer address in order to participate in auctions, specified in Wei. Defaults to `100000000000000000` (0.1 Ether).
  - `gasStations`: _Optional_. Array of gas station URLs, defaults to using the RPC's gas estimation.
  - `allowRelay`: _Optional_. Boolean to control whether this router will participate in relaying transactions on this chain. Defaults to `false`.
  - `relayerFeeThreshold`: _Optional_. Minimum threshold percentage that the relayer fee can be below the router's estimated amount. Defaults to `10`.
  - `subgraphSyncBuffer`: _Optional_. The number of blocks to allow the subgraph's latest block number to be behind the provider's latest block number.
- `swapPools`: _Required_. An array of swap pools. Each pool is a JSON object with the following keys:
  - `name`: _Optional_. The name of the swap pool.
  - `assets`: _Required_. An array of assets. Each asset is a JSON object with the following keys:
    - `assetId`: _Required_. The asset ID (ERC20 token address). For native assets, use `0x0000000000000000000000000000000000000000`.
    - `chainId`: _Required_. The chain ID.
- `logLevel`: _Optional_. The log level. One of `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`. Default is `info`.
- `port`: _Optional_. The port the router will listen on. Defaults to `8080`.
- `host`: _Optional_. The host the router will listen on. Defaults to `0.0.0.0`.
- `network`: _Optional_. The messaging network to connect to (separate from blockchain network). One of `testnet`, `mainnet`, `local`. Defaults to `mainnet`.
- `requestLimit`: _Optional_. The minimal period in milliseconds users can request an auction for a particular swap to each router to avoid spam. Defaults to 500 (ms).
- `cleanUpMode`: _Optional_. Boolean to set mode to use to not accept new auctions and continue to handle in-progress auctions. Defaults to false.
- `diagnosticMode`: _Optional_. Boolean to set mode to use to not accept new auctions not run any subgraph loops/handlers for in-depth debugging. Defaults to false.

:::info

You must add a provider for chain 1 (Ethereum mainnet) even if you don't plan to support Ethereum assets. This is because of the price calculation for gas reimbursement.

:::

## Example Configuration File

_These are example RPC URLs. Please get your own RPC URLs!_

```json
{
  "adminToken": "supersecret",
  "chainConfig": {
    "10": {
      "providers": ["https://mainnet.optimism.io"],
      "defaultInitialGasPrice": "1000000",
      "routerContractRelayerAsset": "0x0000000000000000000000000000000000000000"
    },
    "56": {
      "providers": ["https://bscrpc.com/"]
    },
    "100": {
      "providers": [
        "https://foo.xdai.quiknode.pro/JFKJDKFJDKJ",
        "https://rpc.xdaichain.com/",
        "https://xdai.poanetwork.dev/",
        "https://dai.poa.network/"
      ]
    },
    "122": {
      "providers": ["https://rpc.fuse.io/"],
      "minGas": "100000000000000"
    },
    "137": {
      "providers": ["https://polygon-rpc.com/"],
      "minGas": "100000000000000"
    },
    "250": {
      "providers": [
        "https://rpcapi.fantom.network",
        "https://rpc.ftm.tools",
        "https://foo.fantom.quiknode.pro/JFKJDKFJDKJ/"
      ],
      "minGas": "100000000000000"
    },
    "42161": {
      "providers": ["https://arb-mainnet.g.alchemy.com/v2/FJDKJFDKJD"],
      "minGas": "100000000000000"
    },
    "43114": {
      "providers": ["https://api.avax.network/ext/bc/C/rpc"],
      "minGas": "100000000000000"
    },
    "1": {
      "providers": [
        "https://eth-mainnet.alchemyapi.io/v2/JFKJDKFJDKJ",
        "https://mainnet.infura.io/v3/JFKJDKFJDKJ",
        "https://cloudflare-eth.com"
      ]
    }
  },
  "cleanUpMode": false,
  "logLevel": "info",
  "network": "mainnet",
  "mnemonic": "test test test test test test test test test test test test",
  "swapPools": [
    {
      "name": "DAI",
      "assets": [
        {
          "chainId": 1,
          "assetId": "0x6B175474E89094C44Da98b954EedeAC495271d0F"
        },
        {
          "chainId": 10,
          "assetId": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
        },
        {
          "chainId": 56,
          "assetId": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
        },
        {
          "chainId": 100,
          "assetId": "0x0000000000000000000000000000000000000000"
        },
        {
          "chainId": 122,
          "assetId": "0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA"
        },
        {
          "chainId": 137,
          "assetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
        },
        {
          "chainId": 250,
          "assetId": "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e"
        },
        {
          "chainId": 42161,
          "assetId": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
        },
        {
          "chainId": 43114,
          "assetId": "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
        }
      ]
    },
    {
      "name": "USDC",
      "assets": [
        {
          "chainId": 1,
          "assetId": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          "chainId": 10,
          "assetId": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607"
        },
        {
          "chainId": 56,
          "assetId": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
        },
        {
          "chainId": 100,
          "assetId": "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83"
        },
        {
          "chainId": 122,
          "assetId": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5"
        },
        {
          "chainId": 137,
          "assetId": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        },
        {
          "chainId": 250,
          "assetId": "0x04068da6c83afcfa0e13ba15a6696662335d5b75"
        },
        {
          "chainId": 1285,
          "assetId": "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D"
        },
        {
          "chainId": 42161,
          "assetId": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
        },
        {
          "chainId": 43114,
          "assetId": "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
        }
      ]
    },
    {
      "name": "USDT",
      "assets": [
        {
          "chainId": 1,
          "assetId": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        },
        {
          "chainId": 10,
          "assetId": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
        },
        {
          "chainId": 56,
          "assetId": "0x55d398326f99059fF775485246999027B3197955"
        },
        {
          "chainId": 100,
          "assetId": "0x4ECaBa5870353805a9F068101A40E0f32ed605C6"
        },
        {
          "chainId": 122,
          "assetId": "0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10"
        },
        {
          "chainId": 137,
          "assetId": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
        },
        {
          "chainId": 250,
          "assetId": "0x049d68029688eabf473097a2fc38ef61633a3c7a"
        },
        {
          "chainId": 1285,
          "assetId": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C"
        },
        {
          "chainId": 42161,
          "assetId": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
        },
        {
          "chainId": 43114,
          "assetId": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
        }
      ]
    }
  ]
}
```
