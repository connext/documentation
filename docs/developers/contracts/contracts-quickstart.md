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

An `xcall` can be initiated from a smart contract to send funds and/or conduct arbitrary execution *across domains*. This allows Connext to be used as a base cross-chain layer that can be integrated into dApps, turning them into **xApps**.

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

First, we need to import the `IConnextHandler` interface. We'll also use solmate's `ERC20` implementation to handle the token we intend to transfer.

```solidity title="Transfer.sol"
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";
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
    uint32 originDomain, // e.g. from Kovan (2111)
    uint32 destinationDomain, // to Rinkeby (1111)
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
    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams({
      to: to,
      callData: "",
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      recovery: to,
      callback: address(0), 
      callbackFee: 0,
      forceSlow: false,
      receiveLocal: false
    });

    IConnextHandler.XCallArgs memory xcallArgs = IConnextHandler.XCallArgs({
      params: callParams,
      transactingAssetId: asset,
      amount: amount,
      relayerFee: 0
    });
```

A few parameters to note: 
- `callData` is empty here because we're only sending funds
- `recovery` is a fallback address to send funds to if execution fails on destination side
- `callback` is the zero address because we don't expect a callback
- `callbackFee` is a fee paid to relayers; relayers don't take any fees on testnet so it's set to 0 
- `forceSlow` is an option that allows users to take the Nomad slow path (~30 mins) instead of paying routers a 0.05% fee on their transaction
- `receiveLocal` is an option for users to receive the local Nomad-flavored asset instead of the adopted asset on the destination side
- `relayerFee` is a fee paid to relayers; relayers don't take any fees on testnet so it's set to 0

A detailed reference of all the `xcall` arguments can be found [here](../xcall-params.md).

---

## Unpermissioned

While simple transfers are technically unpermissioned, we'll treat cross-domain calls that send `calldata` a bit differently because they involve a target contract on the destination side.

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

Our goal is to call the `updateValue` function, which is unpermissioned (i.e. callable by anyone), from a different domain.

### Source Contract

The source contract initiates the cross-chain interaction with Connext. There isn't much difference between this contract and the one from the transfer example above. The only major differences are:
- we aren't sending funds with the `xcall` so the entire approval dance isn't necessary
- we are sending `calldata` so we need to contruct it

Import the `IConnextHandler` interface.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";
```

The contract will take the address of a deployed `ConnextHandler.sol` as a constructor argument.

```solidity
contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }
```

Then we define this source-side contract's `updateValue` function, which requires a set of arguments necessary for the `xcall` later. 

```solidity
  function updateValue(
    address to, // the address of the target contract
    address asset, // address of token on source domain (needed for now)
    uint32 originDomain, // e.g. from Kovan (2111)
    uint32 destinationDomain, // to Rinkeby (1111)
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
    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      recovery: to,
      callback: address(0),
      callbackFee: 0,
      forceSlow: false,
      receiveLocal: false
    });

    IConnextHandler.XCallArgs memory xcallArgs = IConnextHandler.XCallArgs({
      params: callParams,
      transactingAssetId: asset,
      amount: 0,
      relayerFee: 0
    });

    connext.xcall(xcallArgs);
  }
}
```

---

## Permissioned

The most interesting cross-chain use cases can only be accomplished through permissioned calls on the destination domain. With permissioning requirements, a xapp developer must carefully implement permissioning checks. We'll see how this is done in the following example.

Let's say our target contract contains a function that ***only our source contract should be able to call***.

```solidity 
  function updateValue(uint256 newValue) external onlyExecutor {
    value = newValue;
  }
```

You'll notice we have a custom modifier `onlyExecutor` on this function. This signals some kind of permissioning requirement - we'll dig into that in a bit. For the permissioned flow, it's actually easier to consider the source contract first.

### Source Contract

This is the exact same contract as the source contract for the unpermissioned example above, except that `forceSlow: true` because permissioned calls must flow through the Nomad slow path.

To recap: inside the `updateValue` function, we simply create `calldata` to match the target function signature, construct the `XCallArgs`, and call `xcall` with it. 

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";

contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }

  function updateValue(
    address to,
    address asset,
    uint32 originDomain,
    uint32 destinationDomain,
    uint256 newValue
  ) external payable {

    bytes4 selector = bytes4(keccak256("updateValue(uint256)"));
    bytes memory callData = abi.encodeWithSelector(selector, newValue);

    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      recovery: to,
      callback: address(0),
      callbackFee: 0,
      //highlight-next-line
      forceSlow: true,
      receiveLocal: false
    });

    IConnextHandler.XCallArgs memory xcallArgs = IConnextHandler.XCallArgs({
      params: callParams,
      transactingAssetId: asset,
      amount: 0,
      relayerFee: 0
    });

    connext.xcall(xcallArgs);
  }
}
```

### Target Contract

The target contract now has to be written carefully given our permissioning requirements. Remember that ***only our source contract should be able to call*** the target function.

Import `IConnextHandler` and `IExecutor` interfaces.

```solidity title="Target.sol"
import {IExecutor} from "nxtp/interfaces/IExecutor.sol";
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";
```

In the constructor, we pass the address of the origin-side contract and the Domain ID of the origin domain. We also pass in the address of the Connext Executor contract which should be the only allowed caller of the target function. These are crucial pieces of information that we will check against to uphold our permissioning requirement. 

```solidity
contract Target {
  uint256 public value;
  address public originContract; // The address of Source.sol
  uint32 public originDomain; // The origin Domain ID
  address public executor; // The address of Executor.sol
  
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

Here's the `onlyExecutor` modifier we saw earlier. In it, we use the `IExecutor` utility functions `originSender()` and `origin()` to check that the originating call came from the expected source contract and domain. We also need to check that the `msg.sender` is the Connext Executor contract - otherwise, any calling contract could just return the contract and domain that we're expecting.

```solidity
  modifier onlyExecutor() {
    require(
      IExecutor(msg.sender).originSender() == originContract && 
      IExecutor(msg.sender).origin() == originDomain && 
      msg.sender == executor,
      "Expected origin contract on origin domain called by Executor"
    );
    _;
  } 
```

With the `onlyExecutor` modifier in place, our permissioned function is secured.

```solidity
  function updateValue(uint256 newValue) external onlyExecutor {
    value = newValue;
  }
}
```

---

## Callbacks

One awesome feature we've introduced is the ability to use JS-style callbacks to respond to results of calls from the destination domain on the origin domain. You can read the [detailed spec here](https://github.com/connext/nxtp/discussions/883).

Let's see how this works by building on the Permissioned example.

### Source Contract

All we need to do is implement the `ICallback` interface in a contract on the origin domain. This could be a separate contract or the Source contract itself. The important step is to change the `callback` parameter to the address of whichever contract is implementing this interface.

We'll have our Source contract handle the callback.

```solidity title="Source.sol"

    // function updateValue
    ...

    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      recovery: to,
      //highlight-next-line
      callback: address(this),
      callbackFee: 0,
      forceSlow: true,
      receiveLocal: false
    });

    ...
}
```

The return data from the execution of the function call on the destination domain is sent with the callback so we can do whatever we want with those results. To keep this simple, our `callback` function simply emits a `CallbackCalled` Event with the `newValue` we sent.


```solidity
...
import {ICallback} from "nxtp/core/promise/interfaces/ICallback.sol";

contract Source {
  event CallbackCalled(bytes32 transferId, bool success, uint256 newValue); 

  ...

  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external {
    uint256 newValue = abi.decode(data, (uint256));
    emit CallbackCalled(transferId, success, newValue);
  }
}
```

### Target Contract

On the Target side, the function must return some data. 

```solidity title="Target.sol"
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

To deploy these contracts and try out the `xcalls` yourself, clone the [xApp Starter Kit](https://github.com/connext/xapp-starter/) and see the README for full instructions!
