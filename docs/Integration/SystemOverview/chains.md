---
sidebar_position: 4
---

# Supported Chains

## Mainnets

| Chain Name          | ChainId  |   Status  |
|---------------------|----------|:---------:|
|       Ethereum      |     1    |     ✅    |
| Binance Smart Chain |    56    |     ✅    |
|       Polygon       |    137   |     ✅    |
|         xDai        |    100   |     ✅    |
|     Fantom Opera    |    250   |     ✅    |
|     Arbitrum One    |   42161  |     ✅    |
|       Avalanche     |   43114  |     ✅    |
|       Optimism      |    10    |     ✅    |
|       Moonriver      |    1285    |     ✅    |
|       Fuse      |    122    |    ✅    |
|       Moonbeam      |    1284    |    ✅    |
|       Celo      |    42220    |    Planned    |
|       Aurora      |    1313161554    |    Planned    |
|       Harmony      |    1666600000    |    Planned    |
|       Evmos      |    9001    |    Planned    |
|       Neon      |    TBD    |    Planned    |
|       Godwoken      |    TBD    |    Planned    |
|       zkSync      |    TBD    |    Planned    |
|       StarkNet      |    TBD    |    Planned    |
|       Boba      |    288    |    Planned    |
|       Metis Andromeda    |    1088    |    Planned    |
|       Milkomeda      |    TBD    |    Planned    |

## Testnets

| Chain Name       | ChainId  |    Status   |
|------------------|----------|:-----------:|
|      Ropsten      |    3    |      ✅      |
|      Rinkeby     |     4    |      ✅      |
|      Goerli      |     5    |      ✅      |
|       Kovan      |    42    |      ✅      |
|    BSC Chapel   |    97    |      ✅     |
|   Polygon Mumbai |   80001  |      ✅     |
| Arbitrum RinkArby|  421611  |      ✅     |
|  Avalanche Fuji  |   43113  |      ✅     |


## Supporting Other Chains

In general, Connext is very easy to support on any EVM-compatible chain. Reach out to the team via [our discord](https://chat.connext.network) so we can deploy contracts to your chain. Note that while your chain may be supported in the network, users will not be able to connect to it unless routers choose to provide liquidity for your chain.

For non-EVM chains, it is possible to build support for Connext but would require porting the contracts and rewriting our txService. While the core team does not have bandwidth to do this at the moment, we are happy to give grants to teams that want to port to other systems such as Starkware's Cairo or Cosmos. Please reach out to us via the link above!
