---
sidebar_position: 4 
---

# Parameters for xcall

This is a reference for builders to understand the uses for different parameters of `xcall`.

## XCallArgs

The `xcall` function takes a single `XCallArgs` argument.

```solidity
function xcall(XCallArgs calldata _args)
```

```solidity
struct XCallArgs {
  CallParams params;
  address transactingAssetId;
  uint256 amount;
  uint256 relayerFee;
}
```

### transactingAssetId

This refers to the contract address of the asset that is meant to be bridged, including any ERC20-compliant token. Usually, a xapp will have a higher-level function wrapping `xcall` in which the asset address will be passed-through as an argument to allow the user to specify which asset they want to work with.

### amount

The amount of tokens to bridge specified in standard format (i.e. to send 1 USDC, a token with 10^18 decimals, you must specify the amount as `1000000000000000000`).

### relayerFee

This is a fee paid to relayers for relaying the transaction to the other domain. The fee must be high enough to satisfy relayers’ cost conditions for relaying a transaction, which includes the gas fee plus a bit extra as incentive. This is paid in the origin domain’s native asset - it’s locked on the origin domain and eventually claimed by the relayer. 

Connext contracts will assert that the `relayerFee` matches what is sent in `msg.value` for the `xcall`. If, for any reason, the initial `relayerFee` is set too low, [BridgeFacet.sol](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/contracts/core/connext/facets/BridgeFacet.sol) has a `bumpTransfer` function that can be called on the origin domain to bump (increase) the initial fee until it’s sufficient for relayers.

On the Connext Amarok testnet, this can be set to `0` because relayers on testnet don’t take any fees.

## CallParams

The remaining argument for `XCallArgs` is `CallParams`. 

```solidity
struct CallParams {
  address to;
  bytes callData;
  uint32 originDomain;
  uint32 destinationDomain;
  address recovery;
  address callback;
  uint256 callbackFee;
  bool forceSlow;
  bool receiveLocal;
}
```

### to

This refers to an address on the destination chain. Whether it’s a user’s wallet address or the address of another contract depends on the desired use of `xcall`. 

If the `xcall` is meant to simply bridge funds, then the user should be able to specify this as their own wallet or perhaps another wallet address on the destination chain. 

If the `xcall` is meant to send arbitrary calldata to a target contract, then this address must be the address of that contract. 

### callData

In the case of bridging funds only, this should be empty. If arbitrary calldata is to be sent, then the encoded calldata must be passed here. 

### originDomain / destinationDomain

These refer to domain IDs that are mapped by Nomad. These domain IDs are not equivalent to “chain IDs”. See [Nomad Domain IDs](.testing-against-testnet#nomad-domain-ids).

### recovery

A recovery address on the destination side to send funds to if the execution fails. This ensures that funds sent with failed calls are still accessible.

### callback

The address of a contract that implements the [ICallback](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/contracts/core/promise/interfaces/ICallback.sol) interface. If the target contract doesn’t return anything, this field must be the Zero Address. See the [detailed spec](https://github.com/connext/nxtp/discussions/883) for callback interaction. 

### callbackFee

Similar to the relayerFee except this is for paying relayers on the callback execution. Again, this can be set to 0 on the Connext Amarok testnet. This fee is also bumpable from the origin domain!

### forceSlow

Setting this to true allows users to force the `xcall` through the Nomad slow path (~30 mins) and save on the 0.05% transaction fee levied by routers. Note that this only has an effect on fast path transfers since slow path `xcall`s will go through slow path regardless. This is simply an option for users who don’t care for speed to optimize on cost.

### receiveLocal

Setting this to true allows users to receive the local Nomad-flavored asset instead of the adopted asset on the destination domain. 