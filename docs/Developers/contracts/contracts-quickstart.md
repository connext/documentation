---
sidebar_position: 1
id: contracts-quickstart
---

# Contracts Quickstart

This quickstart will go through how to write smart contracts in Solidity that interact with Connext's deployed contracts. 

These examples (and others) can be found in our xApp Starter Kit, under `src/contract-to-contract-interactions`.

[xApp Starter Kit](https://github.com/connext/xapp-starter/)

---

An `xcall` can be initiated from a smart contract which allows arbitrary execution *across domains*. This allows Connext to be used as a base cross-chain layer that can be integrated into dApps, turning them into **xApps**.

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

## Unpermissioned

Let's break down a set of smart contracts that demonstrate unpermissioned cross-chain call flow.

### Target Contract

Consider we have a target contract on the destination domain as follows.

```solidity title="Target.sol"
import {ERC20} from "@solmate/tokens/ERC20.sol";

contract Target {
  mapping(address => mapping(address => uint256)) public balances;

  function deposit(
    address asset,
    uint256 amount,
    address onBehalfOf
  ) public payable returns (uint256) {
    ERC20 token = ERC20(asset);
    balances[asset][onBehalfOf] += amount;
    token.transferFrom(msg.sender, address(this), amount);

    return balances[asset][onBehalfOf];
  }
}
```

We want to call the `deposit` function via a smart contract on a different source domain. Anyone can call the `deposit` function to deposit funds on behalf of any address. This is where the term "unpermissioned" comes into play.

### Source Contract

The source contract initiates the cross-chain interaction with Connext.

First, we'll import the `IConnextHandler` interface and use solmate's `ERC20` implementation to handle the token that we intend to `deposit`.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";
import {ERC20} from "@solmate/tokens/ERC20.sol";
```

The contract will take the address of `ConnextHandler.sol` as a constructor argument.

```solidity
contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }
```

Then we define this source-side contract's function `deposit`, which requires a set of arguments necessary for the `xcall` later. 

```solidity
  function deposit(
    address to, // the address of the destination contract (UnpermissionedTarget.sol)
    address asset, // the address of the token to bridge and deposit
    uint32 originDomain, // from Kovan (2111)
    uint32 destinationDomain, // to Rinkeby (1111)
    uint256 amount // amount of tokens to deposit
  ) external payable {
```

In the body of `deposit`, we first make sure that the user has approved the amount to send to this contract. The tokens are transferred and then this contract itself  must approve a transfer to `ConnextHandler.sol`.

```solidity
    ERC20 token = ERC20(asset);
    require(
      token.allowance(msg.sender, address(this)) >= amount,
      "User must approve amount"
    );

    token.transferFrom(msg.sender, address(this), amount);
    token.approve(address(connext), amount);
```

We create the `calldata` by encoding the target contract's `deposit` function with the correct arguments. Recall that the target function's signature is `deposit(address asset, uint256 amount, address onBehalfOf)`

Here, we're specifying that we want to `deposit` some `amount` of tokens to the same wallet address that is initiating this call but on the destination domain. 

```solidity
    bytes4 selector = bytes4(keccak256("deposit(address,uint256,address)"));

    bytes memory callData = abi.encodeWithSelector(
      selector,
      asset,
      amount,
      msg.sender
    );
```

Finally, we construct the `XCallArgs` and call the `xcall` on the Connext contract.

```solidity
    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams({
      to: to,
      callData: callData,
      originDomain: originDomain,
      destinationDomain: destinationDomain,
      forceSlow: false,
      receiveLocal: false
    });

    IConnextHandler.XCallArgs memory xcallArgs = IConnextHandler.XCallArgs({
      params: callParams,
      transactingAssetId: asset,
      amount: amount,
      relayerFee: 0
    });

    connext.xcall(xcallArgs);
  }
}
```

## Permissioned

The most interesting cross-chain use cases can only be accomplished through permissioned calls on the destination domain. With permissioning requirements, a xapp developer must carefully implement permissioning checks. We'll see how this is done in the following example.

Let's say our target contract contains a function that ***only our source contract should be able to call***. For the sake of simplicity, we'll target a contrived function:

```solidity 
  function updateValue(uint256 newValue) external onlyExecutor {
    value = newValue;
  }
```

You'll notice we have a custom modifier `onlyExecutor` on this function. This signals some kind of permissioning requirement - we'll dig into that in a bit. For the permissioned flow, it's actually easier to consider the source contract first.

### Source Contract

There isn't much difference between this source contract and the one from the unpermissioned example. The only major note is that we aren't sending funds with the `xcall` so the approval dance isn't necessary.

Inside the `update` function, we simply create `calldata` to match the target function signature, construct the `XCallArgs`, and call `xcall` with it.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";

contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }

  function update(
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

### Target Contract

The target contract now has to be written carefully given our permissioning requirements. Remember that ***only our source contract should be able to call*** the target function.

With that in mind, let's dive in.

First, we import the same `IConnextHandler` and `ERC20` as before. Now we also need to import the `IExecutor` interface.

```solidity title="Target.sol"
import {IExecutor} from "nxtp/interfaces/IExecutor.sol";
import {IConnextHandler} from "nxtp/interfaces/IConnextHandler.sol";
import {ERC20} from "@solmate/tokens/ERC20.sol";
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

Here's the `onlyExecutor` modifier we saw earlier. In it, we use the `IExecutor` utility functions `originSender()` and `origin()` to check that the originating call came from the expected source contract and domain. As mentioned above, we also need to check that the `msg.sender` is the Connext Executor contract - otherwise, any calling contract could just return the contract and domain that we're expecting.

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

## Deploy and Experiment

To deploy these contracts and try out the `xcalls` yourself, clone the [xApp Starter Kit](https://github.com/connext/xapp-starter/) and see the README for full instructions!
