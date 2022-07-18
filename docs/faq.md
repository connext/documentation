---
sidebar_position: 1
---

# FAQ

This is a list of Frequently Asked Questions for the Amarok public testnet.

## What chains are supported?

The list will be updated in [Supported Chains](./basics/chains#supported-chains).

## What assets are supported?

Currently, only a test ERC20 “Test Token (TEST)”.

> Trying to send native ETH will not work at the moment because it requires a wrapped token on the receiving side which has not yet been whitelisted. This will be added shortly!

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
  0x26fe8a8f86511d678d031a022e48fff41c6a3e3b # the contract address of the canonical TestERC20
  ```

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
