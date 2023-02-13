---
sidebar_position: 2
id: authenticated-hello
---

# Authenticated Greeter

The `DestinationGreeterAuthenticated` contract sets some permissioning constraints. It only allows its `greeting` to be updated from `SourceGreeterAuthenticated`. In order to enforce this, the contract checks that the caller is the original sender from the origin domain.

## Target Contract

The target contract must implement some checks to uphold its security constraints.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

/**
 * @title DestinationGreeterAuthenticated
 * @notice Example destination contract that stores a greeting and only allows source to update it.
 */
contract DestinationGreeterAuthenticated is IXReceiver {
  // The Connext contract on this domain
  address public immutable connext;

  // The domain ID where the source contract is deployed
  uint32 public immutable originDomain;

  // The address of the source contract
  address public immutable source;

  string public greeting;

  /** @notice A modifier for authenticated calls.
   * This is an important security consideration. If the target contract
   * function should be authenticated, it must check three things:
   *    1) The originating call comes from the expected origin domain.
   *    2) The originating call comes from the expected source contract.
   *    3) The call to this contract comes from Connext.
   */
  modifier onlySource(address _originSender, uint32 _origin) {
    require(
      _origin == originDomain &&
        _originSender == source &&
        msg.sender == connext,
      "Expected original caller to be source contract on origin domain and this to be called by Connext"
    );
    _;
  }

  constructor(
    uint32 _originDomain,
    address _source,
    address _connext
  ) {
    originDomain = _originDomain;
    source = _source;
    connext = _connext;
  }

  /** @notice Authenticated receiver function.
    * @param _callData Calldata containing the new greeting.
    */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external onlySource(_originSender, _origin) returns (bytes memory) {
    // Unpack the _callData
    string memory newGreeting = abi.decode(_callData, (string));

    _updateGreeting(newGreeting);
  }

  /** @notice Internal function to update the greeting.
    * @param newGreeting The new greeting.
    */
  function _updateGreeting(string memory newGreeting) internal {
    greeting = newGreeting;
  }
}
```

## Source Contract

Nothing special has to be accounted for on the source contract.

```solidity showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";

/**
 * @title SourceGreeterAuthenticated
 * @notice Example source contract that updates a greeting in DestinationGreeterAuthenticated.
 */
contract SourceGreeterAuthenticated {
  // The connext contract on the origin domain.
  IConnext public immutable connext;

  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  /** @notice Updates a greeting variable on the DestinationGreeterAuthenticated contract.
    * @param target Address of the DestinationGreeterAuthenticated contract.
    * @param destinationDomain The destination domain ID.
    * @param newGreeting New greeting to update to.
    * @param relayerFee The fee offered to relayers.
    */
  function xUpdateGreeting (
    address target, 
    uint32 destinationDomain,
    string memory newGreeting,
    uint256 relayerFee
  ) external payable {
    // Encode the data needed for the target contract call.
    bytes memory callData = abi.encode(newGreeting);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      target,            // _to: address of the target contract
      address(0),        // _asset: use address zero for 0-value transfers
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      0,                 // _amount: 0 because no funds are being transferred
      0,                 // _slippage: can be anything between 0-10000 because no funds are being transferred
      callData           // _callData: the encoded calldata to send
    );
  }
}
```

Note that `HelloSource` should be deployed before `HelloTargetAuthenticated` because the latter needs the address of the former in its constructor.

Now we've enforced that the greeting in `HelloTargetAuthenticated` can only be updated through `HelloSource`!
