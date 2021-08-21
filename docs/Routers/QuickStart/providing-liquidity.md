---
sidebar_position: 2
---

# Providing Liquidity

Router operators must provide liquidity to the network in order to operate. This is done by calling the `addLiquidityFor` method on the [`TransactionManager`](https://github.com/connext/nxtp/blob/main/packages/contracts/contracts/TransactionManager.sol) contract.

## Using the UI

Of course, you can always directly interact with the contracts to provide liquidity using Etherscan or other similar tools. To make things easier, we have provided the [NXTP Test UI](https://nxtp.connext.network) which allows you to view and add liquidity for your router. Navigate to the "Router" tab for convenient liquidity management functionality.

:::info

Testnets are freely open to routers to add liquidity. However, mainnet routers and assets are still permissioned temporarily. Please contact the Connext team to get your router and assets whitelisted!

:::

Add liquidity for both sides of the swap, based on your configured swap pools. Make sure to also add sufficient gas.

:::note

You do not need to use the router's private key to do this. The `addLiquidityFor` method will pull funds from your connected wallet and assign them to the specified router.

:::