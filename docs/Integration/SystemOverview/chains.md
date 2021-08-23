---
sidebar_position: 4
---

# Supported Chains

## Mainnets

Nxtp, the latest protocol iteration of Connext, is currently being audited and will be live on mainnet soon!

| Chain Name          | ChainId  |   Status  |
|---------------------|----------|:---------:|
|       Ethereum      |     1    | On launch |
|       Polygon       |    137   | On launch |
|     Arbitrum One    |   42161  | On launch |
|       Optimism      |    10    | On launch |
|         xDai        |    100   | On launch |
| Binance Smart Chain |    56    | On launch |
|     Fantom Opera    |    250   | On launch |

## Testnets

| Chain Name       | ChainId  |    Status   |
|------------------|----------|:-----------:|
|      Goerli      |     5    |      ✅      |
|      Rinkeby     |     4    |      ✅      |
|       Kovan      |    42    | Coming Soon |
| Arbitrum Testnet |  421611  |      ✅     |
| Optimism Testnet |    69    | Coming Soon |
|   Polygon Mumbai |   80001  |      ✅     |
|    BSC Testnet   |    97    |      ✅     |
|   Avalanche Fuji |   43113  | Coming Soon |

## Supporting Other Chains

In general, Connext is very easy to support on any EVM-compatible chain. Reach out to the team via [our discord](https://chat.connext.network) so we can deploy contracts to your chain. Note that while your chain may be supported in the network, users will not be able to connect to it unless routers choose to provide liquidity for your chain.

For non-EVM chains, it is possible to build support for Connext but would require porting the contracts and rewriting our txService. While the core team does not have bandwidth to do this at the moment, we are happy to give grants to teams that want to port to other systems such as Starkware's Cairo or Cosmos. Please reach out to us via the link above!
