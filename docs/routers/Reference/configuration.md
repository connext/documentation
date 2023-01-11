---
sidebar_position: 5
---

# Configuration

The router is accepts configuration using the config file `config.json` in the root directory of the [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose).

See the [testnet](../../developers/testing-against-testnet.md) or mainnet (coming soon) guides for addresses and URLs.

The JSON schema accepts the following keys:

- `redis`: _Required_. Object containing the following keys to configure an external redis instance:
  - `host`: _Required_. The hostname of the redis instance.
  - `port`: _Required_. The port of the redis instance.
- `server`: _Required_. Object containing the following keys to configure the HTTP server:
  - `adminToken`: _Required_. Secret token used to authenticate admin requests.
  - `port`: _Optional_. The port the router will listen on. Defaults to `8080`.
  - `host`: _Optional_. The host the router will listen on. Defaults to `0.0.0.0`.
- `web3SignerUrl`: _Recommended_. The URL for a running [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) instance. This is the recommended approach to private key storage.
- `mnemonic`: _Optional, Discouraged_. The mnemonic used to generate the private key. Using the mnemonic directly in the config file is unsafe and not recommended.
- `chains`: _Required_. The chain configuration. A JSON object with the following keyed by [Domain IDs](./developers/testing-against-testnet#domain-ids) with the following object schema as value:
  - `providers`: _Required_. An array of providers URLs for a chain. Use a minimum of 1 URL, but additional URLs provide more fallback protection against provider issues.
  - `assets`: _Required_. An array of assets. Each asset is a JSON object with the following keys:
    - `assetId`: _Required_. The asset ID (ERC20 token address). This needs to represent the "local" asset which is the Connext bridge minted asset.
    - `name`: _Required_. The Asset Name.
- `network`: _Required_. `mainnet` or `testnet`.
- `environment`: _Optional_. `production` or `staging`. `mainnet` network config will always be `production`.
- `logLevel`: _Optional_. The log level. Defaults to `info`. Accepts `debug`, `info`, `warn`, `error`, `fatal`, `trace`, `silent`.
- `sequencerUrl`: _Optional_. The URL for the sequencer. Only used to override defaults.
- `cartographerUrl`: _Optional_. The URL for the cartographer. Only used to override defaults.

## Example Configuration File

_These are example RPC URLs. Please get your own RPC URLs!_

```json
{
  "chains": {
    "1634886255": {
      "assets": [
        {
          "address": "0x85fb8e2903ad92a2ab0c6a725806636666ee2ab4",
          "name": "USDC"
        },
        {
          "address": "0xfd5c16a50b717338cbcb44e34e10d735709e9cb9",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://arb-mainnet.g.alchemy.com/v2/...",
        "https://rpc.ankr.com/arbitrum"
      ]
    },
    "1869640809": {
      "assets": [
        {
          "address": "0x85FB8e2903Ad92A2ab0C6a725806636666ee2Ab4",
          "name": "USDC"
        },
        {
          "address": "0xfD5C16a50b717338Cbcb44e34e10d735709E9Cb9",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://opt-mainnet.g.alchemy.com/v2/...",
        "https://rpc.ankr.com/optimism"
      ]
    },
    "1886350457": {
      "assets": [
        {
          "address": "0x2ABe2d4F09ea3124DE56AD91ae0950A3B71eCD11",
          "name": "USDC"
        },
        {
          "address": "0x2BD5B3cfB2b16F2B10e7BA41dc1cb93d61B36bB8",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://polygon-mainnet.g.alchemy.com/v2/...",
        "https://rpc.ankr.com/polygon"
      ]
    },
    "6450786": {
      "assets": [
        {
          "address": "0xe4f1ce2dc807084a874e957d5d2ac6502820bc15",
          "name": "USDC"
        },
        {
          "address": "0x6b205aeaae9de574d76d4e45af92998aefca205b",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://rpc.ankr.com/bsc"
      ]
    },
    "6648936": {
      "assets": [
        {
          "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          "name": "USDC"
        },
        {
          "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "name": "WETH"
        }
      ],
      "providers": ["https://eth-mainnet.alchemyapi.io/v2/...", "https://rpc.ankr.com/eth"]
    },
    "6778479": {
      "assets": [
        {
          "address": "0x67e79CC8d6b7C164Da28864875242b9210BFeb15",
          "name": "USDC"
        },
        {
          "address": "0x735c7e2035ff902EC8F7115355191Cabb05D86fd",
          "name": "WETH"
        }
      ],
      "providers": ["https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis"]
    }
  },
  "environment": "production",
  "logLevel": "debug",
  "messageQueue": {
    "uri": "amqp://guest:guest@rabbitmq:5672"
  },
  "redis": {
    "host": "redis",
    "port": 6379
  },
  "server": {
    "adminToken": "supersecret"
  },
  "web3signer": "http://signer:9000",
  "network": "mainnet"
}
```
