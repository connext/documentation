---
sidebar_position: 4
---

# Supported Chains

## Mainnets

| Chain Name          | ChainId    | Status  |
| ------------------- | ---------- | :-----: |
| Ethereum            | 1          |   ✅    |
| Optimism            | 10         |   ✅    |
| Binance Smart Chain | 56         |   ✅    |
| GnosisChain         | 100        |   ✅    |
| Fuse                | 122        |   ✅    |
| Polygon             | 137        |   ✅    |
| Fantom Opera        | 250        |   ✅    |
| Boba                | 288        |   ✅    |
| Moonbeam            | 1284       |   ✅    |
| Moonriver           | 1285       |   ✅    |
| Milkomeda           | 2001       |   ✅    |
| Evmos               | 9001       |   ✅    |
| Arbitrum One        | 42161      |   ✅    |
| Avalanche           | 43114      |   ✅    |
| Harmony             | 1666600000 |   ✅    |
| Celo                | 42220      | Planned |
| Aurora              | 1313161554 | Planned |
| Neon                | TBD        | Planned |
| Godwoken            | TBD        | Planned |
| zkSync              | TBD        | Planned |
| StarkNet            | TBD        | Planned |
| Metis Andromeda     | 1088       | Planned |

## Testnets

| Chain Name        | ChainId | Status |
| ----------------- | ------- | :----: |
| Ropsten           | 3       |   ✅   |
| Rinkeby           | 4       |   ✅   |
| Goerli            | 5       |   ✅   |
| Kovan             | 42      |   ✅   |
| BSC Chapel        | 97      |   ✅   |
| Polygon Mumbai    | 80001   |   ✅   |
| Arbitrum RinkArby | 421611  |   ✅   |
| Avalanche Fuji    | 43113   |   ✅   |

## Supporting Other Chains

In general, Connext is very easy to support on any EVM-compatible chain. Reach out to the team via [our discord](https://chat.connext.network) so we can deploy contracts to your chain. Note that while your chain may be supported in the network, users will not be able to connect to it unless routers choose to provide liquidity for your chain.

For non-EVM chains, it is possible to build support for Connext but would require porting the contracts and rewriting our txService. While the core team does not have bandwidth to do this at the moment, we are happy to give grants to teams that want to port to other systems such as Starkware's Cairo or Cosmos. Please reach out to us via the link above!
