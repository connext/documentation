---
sidebar_position: 7 
---

# Parameters for xcall

This is a reference for builders to understand the different parameters of `xcall`.

```solidity
function xcall(XCallArgs calldata _args)
```

---

## XCallArgs

```solidity
struct XCallArgs {
  CallParams params;
  address transactingAsset;
  uint256 transactingAmount;
  uint256 originMinOut;
}
```
### `transactingAssetId`

Refers to the contract address of the asset that is to be bridged. This could be the adopted, local, or canonical asset (see [this](../faq#what-does-it-mean-when-referring-to-canonical-representation-and-adopted-assets) for an explanation of the different kinds of assets).

Usually a xApp will have a higher-level function wrapping `xcall` in which the asset will be passed as an argument. This allows users to specify which asset they want to work with.

If the `xcall` is calldata-only (e.g. doesn't bridge any funds), any registered asset can be used here as long as `amount: 0`.

### `amount`

The amount of tokens to bridge specified in standard format (i.e. to send 1 USDC, a token with 10^18 decimals, you must specify the amount as `1000000000000000000`).

### `originMinOut`

The minimum amount received after the swap from adopted -> local on the origin domain. This is the way to specify slippage due to the StableSwap Pool, if applicable. 

For example, to achieve 3% slippage tolerance this can be calculated as `(amount / 100) * 97`.

---

## `CallParams`

```solidity
struct CallParams {
  address to;
  bytes callData;
  uint32 originDomain;
  uint32 destinationDomain;
  address agent;
  address recovery;
  bool forceSlow;
  bool receiveLocal;
  address callback;
  uint256 callbackFee;
  uint256 relayerFee;
  uint256 destinationMinOut;
}
```

### `to`

Refers to an address on the destination chain. Whether it’s a user’s wallet or the address of another contract depends on the desired use of `xcall`. 

If the `xcall` is just used to bridge funds, then the user should be able to specify where the funds get sent to.

If the `xcall` is used to send calldata to a target contract, then this address must be the address of that contract. 

### `callData`

In the case of bridging funds only, this should be empty (""). If calldata is sent, then the encoded calldata must be passed here. 

### `originDomain / destinationDomain`

These refer to Domain IDs (*not* equivalent to “Chain IDs”).

### `agent`

The address that is allowed to execute transactions on behalf of `to` on the destination domain. Usually this is a relayer's job but the user can specify an address (including themselves) to do it as well.

This cannot be `address(0)` if `receiveLocal: false`. Some address must be able to call `forceReceiveLocal` on [BridgeFacet.sol](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/contracts/core/connext/facets/BridgeFacet.sol) in case transfers are facing unfavorable slippage conditions for extended periods.

### `recovery`

The address on destination domain that should receive funds if the execution fails. This ensures that funds are never lost with failed calls.

### `forceSlow`

Since Solidity doesn't allow for default parameters, integrators must explicitly set this to `true` when using authenticated (slow path) calls.

If the `xcall` is unauthenticated (e.g. bridging funds), setting this to `true` allows users to force the `xcall` through the slow path and save on the 0.05% transaction fee levied by routers. This is an option for users who don’t care for speed to optimize on cost.

### `receiveLocal`

Setting this to `true` allows users to receive the local bridge-flavored asset instead of the adopted asset on the destination domain. 

### `callback`

The address of a contract that implements the [ICallback](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/contracts/core/promise/interfaces/ICallback.sol) interface. See the [detailed spec](https://github.com/connext/nxtp/discussions/883) for callback interaction. 

If the target contract doesn’t return anything, this field must be `address(0)`. Otherwise, the specified address must be a contract.

### `callbackFee`

Similar to the relayerFee except this is for paying relayers on the callback execution. If `callback: address(0)`, then this must be `0`.

This fee is also bump-able from the origin domain.

### `relayerFee`

This is a fee paid to relayers for relaying the transaction to the destination domain. The fee must be high enough to satisfy relayers’ cost conditions for relaying a transaction, which includes the gas fee plus a bit extra as incentive. This is paid in the origin domain’s native asset - it’s locked on the origin domain and eventually claimed by the relayer. 

Connext contracts will assert that the `relayerFee` matches what is sent in `msg.value` for the `xcall`. If, for any reason, the initial `relayerFee` is set too low, [BridgeFacet.sol](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/contracts/core/connext/facets/BridgeFacet.sol) has a `bumpTransfer` function that can be called on the origin domain to bump (increase) the initial fee until it’s sufficient for relayers.

### `destinationMinOut`

The minimum amount received after the swap from local -> adopted on the destination domain. This is the way to specify slippage due to the StableSwap Pool, if applicable.

For example, to achieve 3% slippage tolerance this can be calculated as `(amount / 100) * 97`.
