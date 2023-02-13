---
sidebar_position: 1
id: simple-bridge
---

# Simple Bridge

The `SimpleBridge` just transfers tokens from a user to another wallet (could be themselves) on a different chain.

Since no calldata is involved, no target contract is needed.

The user will first have to approve a spending allowance of the token to the `SimpleBridge` contract. 


```solidity showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title SimpleBridge
 * @notice Example of a cross-domain token transfer.
 */
contract SimpleBridge {
  // The connext contract on the origin domain
  IConnext public immutable connext;

  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  /**
   * @notice Transfers funds from one chain to another.
   * @param token Address of the token on this domain.
   * @param amount The amount to transfer.
   * @param recipient The destination address (e.g. a wallet).
   * @param destinationDomain The destination domain ID.
   * @param slippage The maximum amount of slippage the user will accept in BPS.
   * @param relayerFee The fee offered to relayers.
   */
  function xTransfer(
    address token,
    uint256 amount,
    address recipient,
    uint32 destinationDomain,
    uint256 slippage,
    uint256 relayerFee
  ) external payable {
    IERC20 _token = IERC20(token);

    require(
      _token.allowance(msg.sender, address(this)) >= amount,
      "User must approve amount"
    );

    // User sends funds to this contract
    _token.transferFrom(msg.sender, address(this), amount);

    // This contract approves transfer to Connext
    _token.approve(address(connext), amount);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      recipient,         // _to: address receiving the funds on the destination
      token,             // _asset: address of the token contract
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      amount,            // _amount: amount of tokens to transfer
      slippage,          // _slippage: the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
      bytes("")          // _callData: empty bytes because we're only sending funds
    );  
  }
}
```