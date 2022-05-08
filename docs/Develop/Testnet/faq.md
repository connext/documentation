---
sidebar_position: 1
---

# FAQ

### What chains are supported?

The list will be updated in [Supported Chains](../../Basics/chains.md/#supported-chains).

### What assets are supported?

Currently, only a test ERC20 “Test Token (TEST)”.

> Trying to send native ETH will not work at the moment because it requires a wrapped token on the receiving side which has not yet been whitelisted. This will be added shortly!

### What if I just want to test my receiving chain function?

If there’s no token transfer involved then just set 0 for the `amount`.

> Make sure you use the Test Token for `transactingAssetId` until the native token (above) has been whitelisted.

### Do I need to do anything with the Nomad contracts?

No, you do not need to deploy or even interact with Nomad contracts directly.

### How do I find the different domainIds?

See [Nomad Domaind IDs](./testing-against-testnet.md/#nomad-domain-ids).

### What are the Connext contracts addresses?

See [Deployed Contract Addresses](./testing-against-testnet.md/#deployed-contract-addresses).