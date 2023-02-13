---
sidebar_position: 3
id: ping-pong
---

# Ping Pong

`Ping` is a contract on some domain and `Pong` is a contract on some other domain. The user sends a ping and a pong will be sent back!

This example demontrates how to use nested `xcall`s and a single direction emulating "callback" behavior.

## Ping Contract

The `Ping` contract contains an external `startPingPong` function that the user will call to initiate the flow. It *also* implements `IXReceiver` because it will act as the "target" of an `xcall` from `Pong`. The `xReceive` function here is essentially a callback function - we can verify that something happened in `Pong`'s domain and handle any results passed back.

```solidity showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

/**
 * @title Ping
 * @notice Ping side of a PingPong example.
 */
contract Ping is IXReceiver {
  // The Connext contract on this domain
  IConnext public immutable connext;

  // Number of pings this contract has received
  uint256 public pings;

  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  /** 
   * @notice Starts the ping pong s. equence.
   * @param destinationDomain The destination domain ID. 
   * @param target Address of the Pong contract on the destination domain.
   * @param relayerFee The fee offered to relayers.
   */
  function startPingPong(
    address target, 
    uint32 destinationDomain, 
    uint256 relayerFee
  ) external payable {
    require(
      msg.value == relayerFee,
      "Must send gas equal to the specified relayer fee"
    );

    // Include the relayerFee so Pong will use the same fee 
    // Include the address of this contract so Pong will know where to send the "callback"
    bytes memory callData = abi.encode(pings, address(this), relayerFee);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: domain ID of the destination chain
      target,            // _to: address of the target contract (Pong)
      address(0),        // _asset: use address zero for 0-value transfers
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      0,                 // _amount: 0 because no funds are being transferred
      0,                 // _slippage: can be anything between 0-10000 because no funds are being transferred
      callData           // _callData: the encoded calldata to send
    );
  }

  /** @notice The receiver function as required by the IXReceiver interface.
   * @dev The "callback" function for this example. Will be triggered after Pong xcalls back.
   */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external returns (bytes memory) {
    uint256 _pongs = abi.decode(_callData, (uint256));

    pings++;
  }
}
```

## Pong Contract

`Pong` will send a nested `xcall` back to `Ping`, including some information that can be acted on. 

```solidity showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

interface IPong {
  function sendPong(
    uint32 destinationDomain, 
    address target,
    uint256 relayerFee
  ) external payable;
}

/**
 * @title Pong
 * @notice Pong side of a PingPong example.
 */
contract Pong is IXReceiver {
  // The Connext contract on this domain
  IConnext public immutable connext;

  // Number of pongs this contract has received
  uint256 public pongs;

  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  /** 
   * @notice Sends a pong to the Ping contract.
   * @param destinationDomain The destination domain ID.
   * @param target Address of the Ping contract on the destination domain.
   * @param relayerFee The fee offered to relayers. 
   */
  function sendPong(
    uint32 destinationDomain, 
    address target,
    uint256 relayerFee
  ) internal {
    // Include some data we can use back on Ping
    bytes memory callData = abi.encode(pongs);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      target,            // _to: address of the target contract (Ping)
      address(0),        // _asset: use address zero for 0-value transfers
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      0,                 // _amount: 0 because no funds are being transferred
      0,                 // _slippage: can be anything between 0-10000 because no funds are being transferred
      callData           // _callData: the encoded calldata to send
    );
  }

  /** 
   * @notice The receiver function as required by the IXReceiver interface.
   * @dev The Connext bridge contract will call this function.
   */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external returns (bytes memory) {
    // Because this call is *not* authenticated, the _originSender will be the Zero Address
    // Ping's address was sent with the xcall so it can be decoded and used for the nested xcall
    (
      uint256 _pings, 
      address _pingContract, 
      uint256 _relayerFee
    ) = abi.decode(_callData, (uint256, address, uint256));
    
    pongs++;

    // This contract sends a nested xcall with the same relayerFee value used for Ping. That means
    // it must own at least that much in native gas to pay for the next xcall.
    require(
      address(this).balance >= _relayerFee,
      "Not enough gas to pay for relayer fee"
    );

    // The nested xcall
    sendPong(_origin, _pingContract, _relayerFee);
  }

  /** 
   * @notice This contract can receive gas to pay for nested xcall relayer fees.
   */
  receive() external payable {}
  
  fallback() external payable {}
}
```

An important note for `Pong` is that `sendPong` is *not* `payable` and neither is `xReceive`. So in order for the 2nd `xcall` to work with `relayerFees`, the someone has to send native gas on destination to `Pong`. In practice, this can take the form of a "gas tank" mechanism that can be filled by users or subsidized by protocols.

Connext is working on an upgrade that will soon allow nested relayer fees to be deducted from the transacting asset, eliminating the need to fund receivers in their native gas token.
