---
sidebar_position: 8
id: chain-abstraction
---

# Chain Abstraction
Chain abstraction is one of the flagship use cases of Connext. Chain abstraction allows any dapp to support deposits from any chain, without the user needing to send a transaction on the destination chain. This can be used at higher layers to fully abstract chains from the user, allowing them to interact with dapps without needing to know which chain they are on.

# Creating a Chain Abstraction Layer
Chain abstraction consists of two parts: swaps and "forward calls". Swaps are used to convert any asset into a bridgeable asset, and forward calls are used to call a function on a contract on a different chain. The following sections will walk through how to implement these two parts.

## Smart Contract Integration
This guide will cover a contract workspace that is using [Foundry](https://book.getfoundry.sh/).

### Installation
After your Foundry project is set up, you can add the Connext contracts to your project by running the following command:

```bash
forge install connext/connext-integration
```

The library will be installed to `lib/connext-integration`.

### xReceiver Target Contract 
The xReceiver target contract is the contract that will receive funds after swaps are completed. This contract will be deployed to the destination chain, and will be called by the router network for a ["fast path execution"](../guides/authentication). The contract simply has to inherit the `SwapForwarderXReceiver` contract and implement the `_forwardFunctionCall` method. A simple example is shown below.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {TransferHelper} from "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

import {SwapForwarderXReceiver} from "../../destination/xreceivers/Swap/SwapForwarderXReceiver.sol";

interface IGreeter {
  function greetWithTokens(address _token, uint256 _amount, string calldata _greeting) external;
}

contract XSwapAndGreetTarget is SwapForwarderXReceiver {
  IGreeter public immutable greeter;

  constructor(address _greeter, address _connext) SwapForwarderXReceiver(_connext) {
    greeter = IGreeter(_greeter);
  }

  /// INTERNAL
  function _forwardFunctionCall(
    bytes memory _preparedData,
    bytes32 /*_transferId*/,
    uint256 /*_amount*/,
    address /*_asset*/
  ) internal override returns (bool) {
    (bytes memory _forwardCallData, uint256 _amountOut, , address _toAsset) = abi.decode(
      _preparedData,
      (bytes, uint256, address, address)
    );

    // Decode calldata
    string memory greeting = abi.decode(_forwardCallData, (string));

    // Forward the call
    TransferHelper.safeApprove(_toAsset, address(greeter), _amountOut);
    greeter.greetWithTokens(_toAsset, _amountOut, greeting);
    return true;
  }
}
```

The `_forwardFunctionCall` function unwraps the encoded data which includes the calldata for the function call, the amount of tokens received after the swap, and the token contract address of the asset that was swapped to. The function then forwards the call to the `greeter` contract, which is a simple contract that just greets the user with a message while transferring some tokens in exchange.

## SDK Integration
The Connext SDK makes the process of creating the data for the swap very simple.

### Installation
For installing the SDK, use **Node.js v18**. You can install the SDK with the following command.

```bash npm2yarn
npm install @connext/chain-abstraction
```

### Usage
The SDK covers three major functions `getXCallCallData`, `prepareSwapAndXCall` and `getPoolFeeForUniV3`

- ### `getXCallCallData` 
  Details about above function
- ### `prepareSwapAndXCall`
  Details about above function
- ### `getPoolFeeForUniV3`
  Details about above function