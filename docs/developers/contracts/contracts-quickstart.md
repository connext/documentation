---
sidebar_position: 1
id: contracts-quickstart
---

# Contracts Quickstart

This quickstart will go through how to write smart contracts in Solidity that interact with Connext's deployed contracts.

These examples (and others) can be found in our xApp Starter Kit, under `src/contract-to-contract-interactions`.

[xApp Starter Kit](https://github.com/connext/xapp-starter/)

---

## Introduction

An `xcall` can be initiated from a smart contract to send funds and/or conduct arbitrary execution _across domains_. This allows Connext to be used as a base cross-chain layer that can be integrated into dApps, turning them into **xApps**.

For example, here are interesting use cases that the protocol enables:

- Hold a governance vote on one chain and execute the outcome of it on another (plus other DAO operations)
- Lock-and-mint or burn-and-mint token bridging
- Perform a swap and transfer the received tokens across chains
- Connecting DEX liquidity across chains in a single seamless transaction
- Crosschain vault zaps and vault strategy management
- Critical protocol operations such as replicating/syncing global constants (e.g. PCV) across chains
- Bringing UniV3 TWAPs to every chain without introducing oracles
- Chain-agnostic veToken governance
- Metaverse-to-metaverse interoperability

---

## Transfer

Let's start with a simple example of sending funds across domains. We can write a smart contract to demonstrate the interaction with Connext's `xcall`.

### Contract

First, we need to import the `IConnextHandler` interface along with `CallParams` and `XCallArgs`. We'll also use solmate's `ERC20` implementation to handle the token we intend to transfer.

```solidity title="Transfer.sol"
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";
import {ERC20} from "@solmate/tokens/ERC20.sol";
```

The contract will take the address of a deployed `ConnextHandler.sol` as a constructor argument.

```solidity
contract Transfer {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }
```

The `transfer` function will take some arguments to use in the `xcall`.

```solidity
  function transfer(
    address to, // the destination address (e.g. a wallet)
    address asset, // address of token on source domain 
    uint32 originDomain, // e.g. from Goerli (1735353714)
    uint32 destinationDomain, // to Optimism-Goerli (1735356532)
    uint256 amount // amount to transfer
  ) external {
```

Before interacting with this contract, the user must approve the amount to send. The `require` clause checks for this. The tokens will be transferred to this contract and then this contract itself must approve a transfer to `ConnextHandler.sol`.

So tokens will be sent from `User's wallet` -> `Transfer.sol` -> `ConnextHandler.sol` -> `to`.

```solidity
    ERC20 token = ERC20(asset);
    require(
      token.allowance(msg.sender, address(this)) >= amount,
      "User must approve amount"
    );

    token.transferFrom(msg.sender, address(this), amount);
    token.approve(address(connext), amount);
```

Finally, we construct the `XCallArgs` and call `xcall` on the Connext contract.

```solidity
    CallParams memory callParams = CallParams({
      to: to,
      callData: "", // empty here because we're only sending funds
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      agent: msg.sender, // address allowed to execute transaction on destination side in addition to relayers
      recovery: msg.sender, // fallback address to send funds to if execution fails on destination side
      forceSlow: false, // option to force slow path instead of paying 0.05% fee on fast liquidity transfers
      receiveLocal: false, // option to receive the local bridge-flavored asset instead of the adopted asset
      callback: address(0), // zero address because we don't expect a callback
      callbackFee: 0, // fee paid to relayers; relayers don't take any fees on testnet
      relayerFee: 0, // fee paid to relayers; relayers don't take any fees on testnet
      destinationMinOut: (amount / 100) * 97 // the minimum amount that the user will accept due to slippage from the StableSwap pool
    });

    XCallArgs memory xcallArgs = XCallArgs({
      params: callParams,
      transactingAsset: asset,
      transactingAmount: amount,
      originMinOut: (amount / 100) * 97 // the minimum amount that the user will accept due to slippage from the StableSwap pool
    });

    connext.xcall(xcallArgs);
  }
}
```

A detailed reference of all the `xcall` arguments can be found [here](../xcall-params.md).

---

## Unauthenticated

While simple transfers are technically unauthenticated, we'll treat cross-domain calls that send `calldata` a bit differently because they involve a target contract on the destination side.

### Target Contract

Suppose we have a target contract on the destination domain as follows.

```solidity title="Target.sol"
contract Target {
  uint256 public value;

  function updateValue(uint256 newValue) external {
    value = newValue;
  }
}
```

Our goal is to call the `updateValue` function, which is unauthenticated (i.e. callable by anyone), from a different domain.

### Source Contract

The source contract initiates the cross-chain interaction with Connext. There isn't much difference between this contract and the one from the transfer example above. The only major differences are:

- we aren't sending funds with the `xcall` so the entire approval dance isn't necessary
- we are sending `calldata` so we need to construct it

We have the same imports and constructor.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";

contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }
```

Then we define this source-side contract's `xChainUpdate` function, which requires a set of arguments necessary for the `xcall` later.

```solidity
  function xChainUpdate(
    address to, // the address of the target contract
    address asset, // address of token on source domain  
    uint32 originDomain, // e.g. from Goerli (1735353714)
    uint32 destinationDomain, // to Optimism-Goerli (1735356532)
    uint256 newValue // value to update to
  ) external payable {
```

We create the `calldata` by encoding the target contract's `updateValue` function with the correct arguments. Recall that the target function's signature is `updateValue(uint256 newValue)`.

```solidity
    bytes4 selector = bytes4(keccak256("updateValue(uint256)"));
    bytes memory callData = abi.encodeWithSelector(selector, newValue);
```

As before, we construct the `XCallArgs` and call `xcall` on the Connext contract.

```solidity
    CallParams memory callParams = CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      agent: msg.sender, // address allowed to execute transaction on destination side in addition to relayers
      recovery: msg.sender, // fallback address to send funds to if execution fails on destination side
      forceSlow: false, // option to force slow path instead of paying 0.05% fee on fast liquidity transfers
      receiveLocal: false, // option to receive the local bridge-flavored asset instead of the adopted asset
      callback: address(0), // zero address because we don't expect a callback
      callbackFee: 0, // fee paid to relayers for the callback; no fees on testnet
      relayerFee: 0, // fee paid to relayers for the forward call; no fees on testnet
      destinationMinOut: 0 // not sending funds so minimum can be 0
    });

    XCallArgs memory xcallArgs = XCallArgs({
      params: callParams,
      transactingAsset: asset, // even though this isn't used, we need a registered asset here
      transactingAmount: 0, // not sending funds with this calldata-only xcall
      originMinOut: 0 // not sending funds so minimum can be 0
    });

    connext.xcall(xcallArgs);
  }
}
```

Once these contracts are deployed, anyone can call `xChainUpdate` on the source contract of the origin domain to change the value stored in the target contract of the destination domain.

---

## Authenticated

The most interesting cross-chain use cases can only be accomplished through authenticated calls on the destination domain. With authentication requirements, a xapp developer must carefully implement authentication checks. We'll see how this is done in the following example.

Let's say our target contract contains a function that **_only our source contract should be able to call_**.

```solidity
  function updateValue(uint256 newValue) external onlyExecutor {
    value = newValue;
  }
```

You'll notice we have a custom modifier `onlyExecutor` on this function. This signals some kind of authentication requirement - we'll dig into that in a bit. For the authenticated flow, it's actually easier to consider the source contract first.

### Source Contract

This is the exact same contract as the source contract for the unauthenticated example above except that `forceSlow: true`. See the notes about this parameter [here](../xcall-params.md).

To recap: inside the `xChainUpdate` function, we simply create `calldata` to match the target function signature, construct the `XCallArgs`, and call `xcall` with it.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";

contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }

  function xChainUpdate(
    address to,
    address asset,
    uint32 originDomain,
    uint32 destinationDomain,
    uint256 newValue
  ) external payable {

    bytes4 selector = bytes4(keccak256("updateValue(uint256)"));
    bytes memory callData = abi.encodeWithSelector(selector, newValue);

    CallParams memory callParams = CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      agent: msg.sender, // address allowed to execute transaction on destination side in addition to relayers
      recovery: msg.sender, // fallback address to send funds to if execution fails on destination side
      //highlight-next-line
      forceSlow: true, // this must be true for authenticated calls
      receiveLocal: false, // option to receive the local bridge-flavored asset instead of the adopted asset
      callback: address(0), // zero address because we don't expect a callback
      callbackFee: 0, // fee paid to relayers for the callback; no fees on testnet
      relayerFee: 0, // fee paid to relayers for the forward call; no fees on testnet
      destinationMinOut: 0 // not sending funds so minimum can be 0
    });

    XCallArgs memory xcallArgs = XCallArgs({
      params: callParams,
      transactingAsset: asset, // even though this isn't used, we need a registered asset here
      transactingAmount: 0, // not sending funds with this calldata-only xcall
      originMinOut: 0 // not sending funds so minimum can be 0
    });

    connext.xcall(xcallArgs);
  }
}
```

### Target Contract

The target contract now has to be written carefully given our authentication requirements. Remember that **_only our source contract should be able to call_** the target function.

Import the `IConnextHandler` and `IExecutor` interfaces. We also need the `LibCrossDomainProperty` library which will allow us to check the origin domain and sender contract.

```solidity title="Target.sol"
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {IExecutor} from "nxtp/core/connext/interfaces/IExecutor.sol";
import {LibCrossDomainProperty} from "nxtp/core/connext/libraries/LibCrossDomainProperty.sol";
```

In the constructor, we pass the address of the origin-side contract and the Domain ID of the origin domain. We also pass in the address of the Connext Executor contract which should be the only allowed caller of the target function. These are crucial pieces of information that we will check against to uphold our authentication requirement.

```solidity
contract Target {
  uint256 public value; // the value we want to update from origin
  address public originContract; // the address of Source.sol
  uint32 public originDomain; // the origin Domain ID
  address public executor; // the address of Executor.sol

  constructor(
    address _originContract,
    uint32 _originDomain,
    address payable _connext
  ) {
    originContract = _originContract;
    originDomain = _originDomain;
    executor = ConnextHandler(_connext).getExecutor();
  }
```

Here's the `onlyExecutor` modifier we saw earlier. In it, we use the `LibCrossDomainProperty` library functions `originSender()` and `origin()` to check that the originating call came from the expected origin contract and domain. We also need to check that the `msg.sender` is the Connext Executor contract - otherwise, any calling contract could just spoof the origin contract and domain that we're expecting.

```solidity
  modifier onlyExecutor() {
    require(
      LibCrossDomainProperty.originSender(msg.data) == originContract &&
        LibCrossDomainProperty.origin(msg.data) == originDomain &&
        msg.sender == address(executor),
      "Expected origin contract on origin domain called by Executor"
    );
    _;
  }
```

With the `onlyExecutor` modifier in place, our authenticated function is secured.

```solidity
  function updateValue(uint256 newValue) external onlyExecutor {
    value = newValue;
  }
}
```

Now the target contract can only be updated by a cross-chain call from the source contract!

---

## Callbacks

One awesome feature we've introduced is the ability to use JS-style callbacks to respond to results of calls from the destination domain on the origin domain. You can read the [detailed spec here](https://github.com/connext/nxtp/discussions/883).

Let's see how this works by building on the Authenticated example.

### Source Contract

To enable callback handling, some contract on the origin domain must implement the `ICallback` interface. This could be a separate contract or the Source contract itself. 

We'll have our Source contract handle the callback. To do so, Source should import the `ICallback` interface and change the `callback` param to the address of the contract implementing this interface. It will also need a reference to the Connext PromiseRouter contract so we add that to the constructor.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";
//highlight-next-line
import {ICallback} from "nxtp/core/promise/interfaces/ICallback.sol";

contract Source {
  IConnextHandler public immutable connext;
  address public immutable promiseRouter;

  constructor(
    IConnextHandler _connext, 
    //highlight-next-line
    address _promiseRouter
  ) {
    connext = _connext;
    //highlight-next-line
    promiseRouter = _promiseRouter;
  }

  function xChainUpdate(
    address to,
    address asset,
    uint32 originDomain,
    uint32 destinationDomain,
    uint256 newValue
  ) external payable {

    bytes4 selector = bytes4(keccak256("updateValue(uint256)"));
    bytes memory callData = abi.encodeWithSelector(selector, newValue);

    CallParams memory callParams = CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      agent: msg.sender, // address allowed to execute transaction on destination side in addition to relayers
      recovery: msg.sender, // fallback address to send funds to if execution fails on destination side
      forceSlow: true, // this must be true for authenticated calls
      receiveLocal: false, // option to receive the local bridge-flavored asset instead of the adopted asset
      //highlight-next-line
      callback: address(this), // this contract implements the callback
      callbackFee: 0, // fee paid to relayers for the callback; no fees on testnet
      relayerFee: 0, // fee paid to relayers for the forward call; no fees on testnet
      destinationMinOut: 0 // not sending funds so minimum can be 0
    });

    XCallArgs memory xcallArgs = XCallArgs({
      params: callParams,
      transactingAsset: asset, // even though this isn't used, we need a registered asset here
      transactingAmount: 0, // not sending funds with this calldata-only xcall
      originMinOut: 0 // not sending funds so minimum can be 0
    });

    connext.xcall(xcallArgs);
  }
```

The callback-handling contract needs a reference to the Connext PromiseRouter similarly to how the Target contract needs a reference to the Connext Executor. The contract implementing `callback` should have a modifier that only allows the Connext PromiseRouter to execute the callback.

```solidity
  modifier onlyPromiseRouter () {
    require(
      msg.sender == address(promiseRouter),
      "Expected PromiseRouter"
    );
    _;
  }
```

Now we'll implement the `callback` function. 

The return data from the destination domain is sent with the callback so we can do whatever we want with it. In this case, we'll simply emit an event with the `newValue` we sent so that the callback can be used on the origin domain to verify a successful update on the destination domain.

```solidity
  event CallbackCalled(bytes32 transferId, bool success, uint256 newValue);

  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external onlyPromiseRouter {
    uint256 newValue = abi.decode(data, (uint256));
    emit CallbackCalled(transferId, success, newValue);
  }
}
```

### Target Contract

On the Target side, the function just needs to return some data.

```solidity title="Target.sol"
...
  function updateValue(uint256 newValue)
    external onlyExecutor
    //highlight-next-line
    returns (uint256)
  {
    value = newValue;
    //highlight-next-line
    return newValue;
  }
}
```

That's it! Connext will now send the callback execution back to the origin domain to be processed by relayers.

**Note**: Origin-side relayers have not been set up to process callbacks yet. This will be added shortly!

## Deploy and Experiment

To deploy these contracts and try out the `xcalls` yourself, clone the [xApp Starter Kit](https://github.com/connext/xapp-starter/) and see the README for full instructions.
