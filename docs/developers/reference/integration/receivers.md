---
sidebar_position: 1
title: Receivers
id: receivers
---

# Receivers

Receivers are contracts that implement the `IXReceiver` interface:

```solidity
interface IXReceiver {
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external returns (bytes memory);
}
```

These are the main contracts that integrators implement. Connext provides a few abstract receivers that should be inherited in order to gain the built-in security and error handling.

## ForwarderXReceiver

The `ForwarderXReceiver` is used for unauthenticated calls. The receiver has two virtual functions that the integrator should implement to 1) prepare and 2) forward the call.

### _prepare

```solidity
function _prepare(
  bytes32 _transferId,
  bytes memory _data,
  uint256 _amount,
  address _asset
) internal virtual returns (bytes memory)
```

Preparation steps should be performed in `_prepare`, which can include operations like swapping funds.

### _forwardFunctionCall

```solidity
function _forwardFunctionCall(
  bytes memory _preparedData,
  bytes32 _transferId,
  uint256 _amount,
  address _asset
) internal virtual returns (bool)
```

The `_forwardFunctionCall` should contain the logic that calls the destination target contract. 

## AuthForwarderXReceiver

The `AuthForwarderXReceiver` is used for authenticated calls. It follows the same two-step pattern as the `ForwarderXReceiver` (`_prepare` + `_forwardFunctionCall`).

### onlyOrigin

In addition, the `xReceive` method is guarded by an `onlyOrigin` modifier which ensures that:
 
  1. The originating call comes from a registered origin domain.
  2. The originating call comes from the expected origin contract of the origin domain.
  3. The call to this contract comes from Connext.

These checks guarantee that any successful call to an `AuthForwarderXReceiver` contains validated data. For more information on authentication, see the [Authentication](../../guides/authentication.md) section.

### originRegistry

This contract also holds an `originRegistry` which maps origin domain IDs to origin sender contracts. This registry is checked to uphold requirement #2 for the modifier above.

The contract is `Ownable` and only the owner can `addOrigin` and `removeOrigin`. All expected origins and senders should be registered in this mapping.