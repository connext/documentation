---
sidebar_position: 5
id: faq
---

# FAQ

This is a list of Frequently Asked Questions for the Amarok public testnet.

## What chains are supported?

An updated list can be found at [Supported Chains](./info/chains#supported-chains).

## What assets are supported?

See the deployed addresses for assets at [Deployed Contract Addresses](./developers/testing-against-testnet#deployed-contract-addresses).

## What do "canonical", "representation", "adopted", and "local" assets mean?

<img src="/img/faq/assets.png" alt="drawing" width="1000"/>

## How do I find the canonical details of a token?

The canonical domainId and tokenId of a token can be found by calling the [`getTokenId`](https://github.com/connext/nxtp/blob/3d0af2251b2d8d244d2617be6fb738c09a571022/packages/deployments/contracts/contracts/core/connext/helpers/TokenRegistry.sol#L176) function of `TokenRegistry`.

Example:
- The token of interest is TestERC20 (`0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9`) on Rinkeby. We want to figure out its canonical domainId and tokenId.
- Find the TokenRegistry contract address on Rinkeby from [here](./developers/testing-against-testnet#deployed-contract-addresses).
- Call `getTokenId` (this example uses Foundry's `cast` to read from the contract)  

  ```bash
  cast call --chain rinkeby 0x1A3BA482D98CCB858AEacB3B839f952390099cE6 "getTokenId(address)(uint32,bytes32)" "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9" --rpc-url <rinkeby_rpc_url>
  ```

  Returns:

  ```bash
  3331 # the canonical domainId is Goerli
  0x00000000000000000000000026fe8a8f86511d678d031a022e48fff41c6a3e3b # the canonical bytes32 tokenId
  ```
- To get the address of the canonical token on Goerli, call the `getLocalAddress` function of Goerli's `TokenRegistry`
 
  ```bash
  cast call --chain goerli 0x51192fD98635FD32C2bfc0A2F4e362D864A4B8b1 "getLocalAddress(uint32,bytes32)(address)" "3331" "0x00000000000000000000000026fe8a8f86511d678d031a022e48fff41c6a3e3b" --rpc-url <goerli-rpc-url>
  ```

  Returns:

  ```bash
  0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1 # the contract address of the canonical TestERC20
  ```

## What if I just want to test the destination-side target function?

If there’s no token transfer involved then just set `transactingAssetId: address(0)` and `amount: 0`.

## Do I need to do anything with the AMB contracts?

No, you do not need to deploy or even interact with AMB contracts directly.

## How do I find the different domainIds?

See [Domain IDs](./developers/testing-against-testnet#domain-ids).

## Where are the Connext contracts?

See [Deployed Contract Addresses](./developers/testing-against-testnet#deployed-contract-addresses).

## How do I take my token crosschain?

There are a few steps to take, so please reach out to us for assistance:

- The Connext team whitelists your asset (for now, this is required).
- You transfer some of the assets across the bridge.
- If the destination asset has the amb flavored asset as the adopted asset (there's no existing pool, no representative asset exists yet), then the Token Registry will deploy a new token and set it as canonical.

## Are there size limits to calldata?

(TODO)

## How do I add my chain to Connext?

Connext does not charge any fee to onboard new chains.
You can learn about our process for onboarding new chains in our [Chain Onboarding Guide](https://www.notion.so/connext/How-can-Connext-Bridge-add-my-Chain-fa8b43cac720467a88b5c94f81804091).
