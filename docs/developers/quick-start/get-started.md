---
sidebar_position: 1
id: get-started
---

# Get-Started

With connext you can make any dapp cross-chain abstracted.

- Simple integration would be integrate xcall() via sdk or contract to onboard users from Any chain to Any chain. (estimate time for integration 10 mins)
- Custom integration would be to implement custom logic in the contract to support swaps, defi, nft minting etc.  (estimate time for integration 1 day - couple of weeks)

## SDK

sdk is the easiest way to integrate with Connext. It is a wrapper around the contract that handles all the heavy lifting for you. It is also the most flexible way to integrate with Connext. You can use the SDK to integrate with Connext in any way you want. The SDK is written in Typescript and is available as an npm package.

Here is the quick-starter guide to make your DApp -> XApp.

## Contract

The contract is the most flexible way to integrate with Connext. Any custom logic can be implemented in the contract.

Pre-knowledge of execution layer:

- At origin/source: `xCall()` is the main function that is called by the user to make a cross-chain call.

- At destination/target: The standard workflow for a dest chain interaction looks like the following: 

1. The message that is passed through Connext is posted to an xReceive function with a fixed interface on the [target contract address on destination chain](https://docs.connext.network/developers/quickstart#target-contract).
2. The xReceive function is then responsible for unpacking the passed data and calling some destination contract. Typically, this would be the target DeFi protocol function.


Depending on the integration requirement, we can simplify the integration process by using the templates provided by Connext. The templates are available on [GitHub]().

### Templates

1. Source: Any custom logic at origin/source chain can be implemented in this contract. All kind of interaction are possible can support swaps, defi, nft minting etc.

2. Target: Any custom logic at destination/target chain can be implemented in this contract.

