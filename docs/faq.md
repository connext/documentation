---
sidebar_position: 1
---

# FAQ

This is a list of Frequently Asked Questions for the Amarok public testnet.

## What chains are supported?

The list will be updated in [Supported Chains](./basics/chains#supported-chains).

### What assets are supported?

Currently, only a test ERC20 “Test Token (TEST)”.

> Trying to send native ETH will not work at the moment because it requires a wrapped token on the receiving side which has not yet been whitelisted. This will be added shortly!

## What if I just want to test my receiving chain function?

If there’s no token transfer involved then just set 0 for the `amount`.

> Make sure you use the Test Token for `transactingAssetId` until the native token (above) has been whitelisted.

## Do I need to do anything with the Nomad contracts?

No, you do not need to deploy or even interact with Nomad contracts directly.

## How do I find the different domainIds?

See [Nomad Domain IDs](./developers/testing-against-testnet#nomad-domain-ids).

## Where are the Connext contracts?

See [Deployed Contract Addresses](./developers/testing-against-testnet#deployed-contract-addresses).

## How do I take my token crosschain?

There are a few steps to take, so please reach out to us for assistance:

- The Connext team whitelists your asset (for now, this is required).
- You transfer some of the assets across the bridge.
- If the destination asset has the mad*asset as the adopted asset (there's no existing pool, no representative asset exists yet), then the Token Registry will deploy a new token and set it as canonical.

## Are there size limits to calldata?

Yes, this is limited by Nomad's (currently arbitrary) message size limit defined in the [Home contract](https://github.com/nomad-xyz/monorepo/blob/main/packages/contracts-core/contracts/Home.sol#L34).
