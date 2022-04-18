---
sidebar_position: 1
---

# Testing Against Testnet

Connext’s public testnet is currently available on Kovan ←→ Rinkeby. 

The Test Token mentioned in the [Testnet Reference](../../Routers/Reference/testnet.md) has an open mint function with the signature `mint(address account, uint256 amount)`. These test ERC20 tokens can be freely minted by anyone and they are collateralized by routers on the test network to enable swaps between them on the different chains.

Please ping the team to request for more testnet assets and swaps added!

## Connecting a Dapp to Testnets

There are a few ways to interact with Connext's cross-chain functionality. For a contract-to-contract flow, check out the [Contract-to-Contract Interactions](./contract-to-contract-interactions.md) section. For an sdk-based flow, check out the [SDK Interactions](./sdk-interactions.md) section.
