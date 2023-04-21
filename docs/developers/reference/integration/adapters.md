---
sidebar_position: 1
title: Adapters
id: adapters
---

# Adapters

Adapters are contracts that can hook into the normal flow of cross-chain transactions and augment their capabilities without requiring changes in existing contracts. The [connext/integration](https://github.com/connext/connext-integration) repository contains adapters that can be inherited for these purposes.

## SwapAdapter

This adapter contains the logic for swapping tokens. The `SwapAdapter` can be used on either the origin or the destination side to execute a swap.

### Using on Origin

`SwapAndXCall` is a contract that implements `SwapAdapter` and is meant to be used on the origin chain. It swaps the input tokens into desired output tokens before initiating the cross-chain transaction with `xcall`. This is useful in cases where you want users to be able to send any token to your contract and bridge them through Connext. 

### Using on Destination

`SwapForwarderXReceiver` also implements `SwapAdapter` but it's used on the destination chain. It swaps the tokens received from the bridge into desired output tokens before proceeding with the "forward call", which contains the rest of the logic that follows on the destination side. The `ForwarderXReceiver` that it implements is detailed in the next section for [Receivers](./receivers).

### Swappers

The `SwapAdapter` holds a registry of `allowedSwappers` which are contracts that implement the `ISwapper` interface:

```solidity
interface ISwapper {
  function swap(
    uint256 _amountIn,
    address _tokenIn,
    address _tokenOut,
    bytes calldata _swapData
  ) external payable returns (uint256 amountOut);
}
```

For example, the `UniV3Swapper` implements `swap` which internally calls Uniswap's `ISwapRouter.exactInputSingle` to execute the swap via Uniswap. 

Currently, Connext provides the following Swappers:

- `OneInchUniswapV3`
- `UniV2Swapper`
- `UniV3Swapper`
