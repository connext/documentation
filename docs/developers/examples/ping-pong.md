---
sidebar_position: 3
id: ping-pong
---

# Ping Pong

`Ping` is a contract on some domain and `Pong` is a contract on some other domain. The user sends a ping and a pong will be sent back!

This example demontrates how to use nested `xcall`s and a single direction emulating "callback" behavior.


## Ping Contract

The `Ping` contract contains an external `sendPing` function that the user will call to initiate the flow. It *also* implements `IXReceiver` because it will act as the "target" of an `xcall` from `Pong`. The `xReceive` function here is essentially a callback function - we can verify that something happened in `Pong`'s domain and handle any results passed back.

Note that the user will first have to approve a spending allowance of the token to the `Ping` contract.

```solidity showLineNumbers
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Ping
 * @notice Ping side of a PingPong example.
 */
contract Ping is IXReceiver {
  // Number of pongs this contract has received from the Pong contract
  uint256 public pongs;

  // The connext contract deployed on the same domain as this contract
  IConnext public immutable connext;

  constructor(IConnext _connext) {
    connext = _connext;
  }

  /** 
   * @notice Sends a ping to the Pong contract.
   * @param target Address of the Pong contract on the destination domain.
   * @param destinationDomain The destination domain ID. 
   * @param token Address of the token on this domain.
   * @param amount The amount to transfer.
   * @param relayerFee The fee offered to relayers. On testnet, this can be 0.
   */
  function sendPing(
    address target, 
    uint32 destinationDomain, 
    address token,
    uint256 amount, 
    uint256 relayerFee
  ) public payable {
    IERC20 _token = IERC20(token);

    require(
      _token.allowance(msg.sender, address(this)) >= amount,
      "User must approve amount"
    );

    // User sends funds to this contract
    _token.transferFrom(msg.sender, address(this), amount);

    // This contract approves transfer to Connext
    _token.approve(address(connext), amount);

    // Include the relayerFee so Pong will use the same fee 
    // Include the address of this contract so Pong will know where to send the "callback"
    bytes memory _callData = abi.encode(pongs, address(this), relayerFee);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      target,            // _to: address of the target contract (Pong)
      token,             // _asset: address of the token contract
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      amount,            // _amount: amount of tokens to transfer
      30,                // _slippage: the maximum amount of slippage the user will accept in BPS, in this case 0.3%
      _callData          // _callData: the encoded calldata to send
    );
  }

  /** 
   * @notice The receiver function as required by the IXReceiver interface.
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
    uint256 _pings = abi.decode(_callData, (uint256));

    pongs++;
  }
}
```

## Pong Contract

`Pong` will send a nested `xcall` back to `Ping`, including some information that can be acted on. 

```solidity showLineNumbers
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Pong
 * @notice Pong side of a PingPong example.
 */
contract Pong is IXReceiver {
  // Number of pings this contract has received from the Ping contract
  uint256 public pings;

  // The connext contract deployed on the same domain as this contract
  IConnext public immutable connext;

  constructor(IConnext _connext) {
    connext = _connext;
  }

  /** 
   * @notice Sends a pong to the Ping contract.
   * @param target Address of the Ping contract on the destination domain.
   * @param destinationDomain The destination domain ID.
   * @param token Address of the token on this domain.
   * @param amount The amount to transfer.
   * @param relayerFee The fee offered to relayers. On testnet, this can be 0.
   */
  function sendPong(
    address target,
    uint32 destinationDomain, 
    address token, 
    uint256 amount,
    uint256 relayerFee
  ) public payable {
    IERC20 _token = IERC20(token);
    
    // This contract approves transfer to Connext
    _token.approve(address(connext), amount);

    // Include some data we can use back on Ping
    bytes memory _callData = abi.encode(pings);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      target,            // _to: address of the target contract (Ping)
      token,             // _asset: address of the token contract
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      amount,            // _amount: amount of tokens to transfer
      30,                // _slippage: the maximum amount of slippage the user will accept in BPS, in this case 0.3%
      _callData          // _callData: the encoded calldata to send
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
    // Ping's address was sent with the xcall so it could be decoded and used for the nested xcall
    (uint256 _pongs, address _pingContract, uint256 _relayerFee) = abi.decode(_callData, (uint256, address, uint256));
    
    pings++;

    // The nested xcall
    sendPong(_pingContract, _origin, _asset, _amount, _relayerFee);
  }
}
```

