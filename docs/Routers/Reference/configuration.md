---
sidebar_position: 1
---

# Configuration

The router is accepts configuration using the config file `config.json` in the root directory of the [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose).

The JSON schema accepts the following keys:

- `adminToken`: _Required_. Secret token used to authenticate admin requests.
- `mnemonic`: _Required_. The mnemonic used to generate the private key.
- `chainConfig`: _Required_. The chain configuration. A JSON object with the following keyed by `chainId` with the following object schema as value:
  - `providers`: _Required_. An array of providers URLs for a chain. Use a minimum of 1 URL, but additional URLs provide more fallback protection against provider issues.
  - `confirmations`: _Optional_. The number of confirmations required for a transaction to be considered valid on a chain. Defaults to defined values [here](https://github.com/connext/chaindata/blob/29cc0250aff398cdf9326dcb7698d291f3e3015a/crossChain.json).
  - `minGas`: _Optional_. The minimum gas amount required to be held by the router's signer address in order to participate in auctions. Defaults to 0.1 Ether units.
- `swapPools`: _Required_. An array of swap pools. Each pool is a JSON object with the following keys:
  - `name`: _Optional_. The name of the swap pool.
  - `assets`: _Required_. An array of assets. Each asset is a JSON object with the following keys:
    - `assetId`: _Required_. The asset ID (ERC20 token address). For native assets, use `0x0000000000000000000000000000000000000000`.
    - `chainId`: _Required_. The chain ID.
- `logLevel`: _Optional_. The log level. One of `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`. Default is `info`.
- `port`: _Optional_. The port the router will listen on. Defaults to `8080`.
- `host`: _Optional_. The host the router will listen on. Defaults to `0.0.0.0`.
- `network`: _Optional_. The network to connect to (separate from blockchain network). One of `testnet`, `mainnet`, `local`. Defaults to `mainnet`.

## Example Configuration File

```json
{
  "adminToken": "blahblah",
  "chainConfig": {
    "4": {
      "providers": ["https://rinkeby.infura.io/v3/"],
    },
    "5": {
      "providers": ["https://goerli.infura.io/v3/"],
    }
  },
  "logLevel": "info",
  "mnemonic": "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
  "network": "mainnet",
  "swapPools": [
    {
      "name": "TEST",
      "assets": [
        { "chainId": 4, "assetId": "0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198" },
        { "chainId": 5, "assetId": "0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682" }
      ]
    }
  ]
}

```