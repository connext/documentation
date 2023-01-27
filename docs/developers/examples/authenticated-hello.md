---
sidebar_position: 2
id: authenticated-hello
---

# Authenticated Hello

## Target Contract

Suppose we have a target contract on the destination domain with an `_updateGreeting` function. We want to enforce that only the source contract on a specific origin domain can call it.

```solidity
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

contract HelloTargetAuthenticated is IXReceiver {
  string public greeting;

  // The Domain ID where the source contract is deployed
  uint32 public originDomain;

  // The address of the source contract
  address public source;

  // The address of the Connext contract on the destination domain
  IConnext public connext;

  /** @notice A modifier for authenticated calls.
   *  This is an important security consideration. If the target contract
   *  function should be authenticated, it must check three things:
   *    1) The originating call comes from the expected origin domain.
   *    2) The originating call comes from the expected source contract.
   *    3) The call to this contract comes from Connext.
   */
  modifier onlySource(address _originSender, uint32 _origin) {
    require(
      _origin == originDomain &&
        _originSender == source &&
        msg.sender == address(connext),
      "Expected source contract on origin domain called by Connext"
    );
    _;
  }

  // In the constructor we pass information that the modifier will check
  constructor(
    uint32 _originDomain,
    address _source,
    IConnext _connext
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
    * @param _callData Calldata containing the new greeting.
    */
  function _updateGreeting(string memory newGreeting) internal {
    greeting = newGreeting;
  }
}
```

## Source Contract

Nothing special has to be accounted for on the source contract. This is the exact same contract as the (unauthenticated) Hello example in the Quickstart.

```solidity showLineNumbers
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";

/**
 * @title HelloSource
 * @notice Example of cross-domain messaging.
 */
contract HelloSource {
  // The connext contract on the origin domain.
  IConnext public immutable connext;

  constructor(IConnext _connext) {
    connext = _connext;
  }

  /** @notice Updates a greeting variable on the HelloTarget contract.
    * @param target Address of the HelloTarget contract.
    * @param destinationDomain The destination domain ID.
    * @param newGreeting New greeting to update to.
    * @param relayerFee The fee offered to relayers.
    */
  function updateGreeting (
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
