---
sidebar_position: 5
---

# Configuration

The router is accepts configuration using the config file `config.json` in the root directory of the [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose).

See the [testnet](../developers/testing-against-testnet) or mainnet (coming soon) guides for addresses and URLs.

The JSON schema accepts the following keys:

- `sequencerUrl`: The URL of the sequencer.
- `redis`: _Requires_. Object containing the following keys to configure an external redis instance:
  - `host`: The hostname of the redis instance.
  - `port`: The port of the redis instance.
- `server`: _Required_. Object containing the following keys to configure the HTTP server:
  - `adminToken`: _Required_. Secret token used to authenticate admin requests.
  - `port`: _Optional_. The port the router will listen on. Defaults to `8080`.
  - `host`: _Optional_. The host the router will listen on. Defaults to `0.0.0.0`.
  - `requestLimit`: _Optional_. Unused.
- `web3SignerUrl`: _Recommended_. The URL for a running [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) instance. This is the recommended approach to private key storage.
- `mnemonic`: _Optional, Discouraged_. The mnemonic used to generate the private key. Using the mnemonic directly in the config file is unsafe and not recommended.
- `chains`: _Required_. The chain configuration. A JSON object with the following keyed by [`domain id`](https://docs.nomad.xyz/dev/domain-ids.html) with the following object schema as value:
  - `providers`: _Required_. An array of providers URLs for a chain. Use a minimum of 1 URL, but additional URLs provide more fallback protection against provider issues.
  - `assets`: _Required_. An array of assets. Each asset is a JSON object with the following keys:
    - `assetId`: _Required_. The asset ID (ERC20 token address). For native assets, use `0x0000000000000000000000000000000000000000`.
    - `name`: _Required_. The Asset Name.
    - `mainnetEquivalent`: _Optional_. The equivalent asset on ETH mainnet for price determinations. Defaults to Connext's configuration.
  - `subgraph`: _Optional_. An object containing the following keys to configure subgraphs.
    - `runtime`: _Optional_. An array of subgraph URLs for a chain. Additional URLs provide more fallback protection against subgraph issues. If not provided, will default to Connext's hosted subgraphs.
    - `analytics`: _Optional_. An array of subgraph URLs for a chain. Additional URLs provide more fallback protection against subgraph issues. If not provided, will default to Connext's hosted subgraphs.
    - `maxLag`: _Optional_. The number of blocks to allow the subgraph's latest block number to be behind the provider's latest block number. Defaults to the recommended value per chain.
  - `deployments`: _Optional_. An object containing the following keys to configure deployments.
    - `connext`: _Optional_. The address of the Connext.sol contract. If not provided, will default to the latest deployed contracts.
  - `confirmations`: _Optional_. The number of confirmations required for a transaction to be considered valid on a chain. Defaults to defined values [here](https://github.com/connext/chaindata/blob/29cc0250aff398cdf9326dcb7698d291f3e3015a/crossChain.json).
  - `minGas`: _Optional_. The minimum gas amount required to be held by the router's signer address in order to participate in auctions, specified in Wei. Defaults to `100000000000000000` (0.1 Ether).
  - `gasStations`: _Optional_. Array of gas station URLs, defaults to using the RPC's gas estimation.
- `subgraphPollInterval`: _Optional_. Control the subgraph poll interval in milliseconds. Defaults to 15_000 (15 seconds).
- `maxSlippage`: _Optional_. The maximum amount of slippage to allow in transfers.

## Example Configuration File

_These are example RPC URLs. Please get your own RPC URLs!_

```json
{
  "chains": {
    "1111": {
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ],
      "providers": ["https://rinkeby.infura.io/v3/...", "https://rpc.ankr.com/eth_rinkeby"]
    },
    "3331": {
      "providers": [
        "https://goerli.infura.io/v3/..."
      ],
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ]
    }
  },
  "logLevel": "debug",
  "web3signer": "http://signer:9000",
  "sequencerUrl": "https://sequencer.testnet.connext.ninja",
  "server": { "adminToken": "blahblahblah" },
  "redis": {
    "host": "redis",
    "port": 6379
  }
}
```
