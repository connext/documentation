---
sidebar_position: 7
id: faq
---

# FAQ

This is a list of Frequently Asked Questions for the Amarok public testnet.

## What chains are supported?

An updated list can be found at [Supported Chains](../resources/supported-chains).

## What assets are supported?

See the deployed addresses for assets at [Deployed Contract Addresses](../resources/deployments).

## What are token "flavors"?

<img src="/img/faq/assets.png" alt="drawing" width="1000"/>

## How do I find the canonical details of a token?

The canonical domainId and tokenId of a token can be found by calling the [`getTokenId`](https://github.com/connext/monorepo/blob/3d0af2251b2d8d244d2617be6fb738c09a571022/packages/deployments/contracts/contracts/core/connext/helpers/TokenRegistry.sol#L176) function of `TokenRegistry`.

Example:
- The token of interest is TestERC20 (`0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1`) on Goerli. We want to figure out its canonical domainId and tokenId.
- Find the Connext contract address on Goerli from [here](../resources/deployments), click its link to open up the Diamond Inspector on Louper.
- Find the `TokenFacet` and click the "Read" button.
- Select the `getTokenId` method and input the TestERC20 address to obtain its canonical details.

  <img src="/img/faq/read_tokenId.png" alt="drawing" width="700"/>

- Alternatively, you can call `getTokenId` using a tool like Foundry's `cast` to read from the contract.

  ```bash
  cast call --chain goerli 0x99A784d082476E551E5fc918ce3d849f2b8e89B6 "getTokenId(address)(uint32,bytes32)" "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1" --rpc-url <goerli_rpc_url>
  ```

  Returns:

  ```bash
  1735353714 # the canonical domainId is Goerli
  0x0000000000000000000000007ea6ea49b0b0ae9c5db7907d139d9cd3439862a1 # the canonical bytes32 tokenId
  ```

## What if I just want to test the destination-side target function?

If there’s no token transfer involved then just set `transactingAssetId: address(0)` and `amount: 0`.

## Do I need to do anything with the AMB contracts?

No, you do not need to deploy or even interact with AMB contracts directly.

## How do I find the different domainIds?

See [Domain IDs](../resources/supported-chains).

## Where are the Connext contracts?

See [Deployed Contract Addresses](../resources/deployments).

## How do I take my token crosschain?

There are a few steps to take, so please reach out to us for assistance:

- The Connext team whitelists your asset (for now, this is required).
- You transfer some of the assets across the bridge.
- If the destination asset has the amb flavored asset as the adopted asset (there's no existing pool, no representative asset exists yet), then the Token Registry will deploy a new token and set it as canonical.

## Are there size limits to calldata?

Yes and the details will be posted soon.

## How do I add my chain to Connext?

Connext does not charge any fee to onboard new chains.
You can learn about our process for onboarding new chains in our [Chain Onboarding Guide](https://www.notion.so/connext/How-can-Connext-Bridge-add-my-Chain-fa8b43cac720467a88b5c94f81804091).
