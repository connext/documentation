---
sidebar_position: 3
---

# Providing Liquidity

In order to provide liquidity, the router must be whitelisted by the Connext admins. Please contact the team to be whitelisted.

Once this is done, follow the following steps using the block explorer for the desired chain:

- Acquire assets for providing liquidity (assets are listed in [testnet](../Reference/testnet) or [mainnet]() - COMING SOON).
- Approve tokens for the Connext.sol contract address.
- Call the function `addLiquidityFor` on the Connext.sol contract using your router address and the asset address as `local`.