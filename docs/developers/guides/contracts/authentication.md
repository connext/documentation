---
sidebar_position: 1
id: authentication
---

# Authentication

## Introduction

Authentication is a critical concept to understand when building xApps. In the context of smart contracts, an authenticated call is one that passes permissioning constraints set by the protocol developer. In most cases this manifests as a modifier that allows a certain subset of addresses to call specific smart contract functions - in other words, we are talking about access control.

A simple example of authentication is an `onlyOwner` modifier that allows only the owner of a smart contract to perform certain tasks. You can read more about this one at [OpenZeppelin's Ownable contracts](https://docs.openzeppelin.com/contracts/2.x/api/ownership).

---

## Unauthenticated

Cross-domain calls can target destination-side smart contract functions by sending encoded `calldata` in the `xcall`. With unauthenticated functions, they are open and callable by anyone.

### Target Contract

Suppose we have a target contract on the destination domain with an unauthenticated `updateValue` function.  

```solidity
contract Target {
  uint256 public value;

  function updateValue(uint256 newValue) external {
    value = newValue;
  }
}
```

### Source Contract

The source contract initiates the cross-chain interaction with Connext via `xcall`.

```solidity
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";

contract Source {
  IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }

  // The entry function that will update the value on the target contract.
  function xChainUpdate(
    address to, // the address of the target contract
    uint32 originDomain, // e.g. from Goerli (1735353714)
    uint32 destinationDomain, // to Optimism-Goerli (1735356532)
    uint256 newValue // value to update to
  ) external payable {

    // Encode the target function with its arguments
    bytes4 selector = bytes4(keccak256("updateValue(uint256)"));
    bytes memory callData = abi.encodeWithSelector(selector, newValue);

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
      transactingAsset: address(0), // 0 address is the native gas token
      transactingAmount: 0, // not sending funds with this calldata-only xcall
      originMinOut: 0 // not sending funds so minimum can be 0
    });

    connext.xcall(xcallArgs);
  }
}
```

Once these contracts are deployed, anyone can call `xChainUpdate` on the source contract from the origin domain to change the value stored in the target contract of the destination domain!

---

## Authenticated

With authenticated functions, xApp developer must carefully implement permissioning checks. Let's see how this works by making the target function **_only callable by the source contract_**.

```solidity
contract Target {
  uint256 public value;

  address public originContract; // the address of the source contract
  uint32 public originDomain; // the origin Domain ID
  address public executor; // the address of the Connext Executor contract

  // A modifier for authenticated functions.
  // Note: This is an important security consideration. If the target function
  //       is authenticated, it must check that the originating call is from
  //       the correct domain and contract. Also, the msg.sender must be the 
  //       Connext Executor address.
  modifier onlySource() {
    require(
      LibCrossDomainProperty.originSender(msg.data) == originContract &&
        LibCrossDomainProperty.origin(msg.data) == originDomain &&
        msg.sender == address(executor),
      "Expected origin contract on origin domain called by Executor"
    );
    _;
  }

  constructor(
    address _originContract, // address of the source contract
    uint32 _originDomain, // domain of the source contract
    IConnextHandler _connext // address of ConnextHandler
  ) {
    originContract = _originContract;
    originDomain = _originDomain;

    // Retrieve the address of the Connext Executor
    executor = _connext.executor();
  }

  function updateValue(uint256 newValue) external onlySource {
    value = newValue;
  }
}
```

Notice the custom modifier `onlyExecutor` on the target function. It checks that the `originSender` and the `origin` (domain) sent from the originating call matches the origin values set in the constructor. It also must ensure that `msg.sender` is the Connext Executor contract - otherwise, any calling contract could just spoof the origin information that we're expecting. The `xcall`'s origin information can be obtained by passing the `msg.data` into Connext's `LibCrossDomainProperty` library methods.

### Source Contract

The source contract is the exact same as the unauthenticated example above except that `forceSlow: true`. See the notes about this parameter [here](../xcall-params.md).

```solidity
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";

contract Source {
    IConnextHandler public immutable connext;

  constructor(IConnextHandler _connext) {
    connext = _connext;
  }

  // The entry function that will update the value on the target contract.
  function xChainUpdate(
    address to, // the address of the target contract
    uint32 originDomain, // e.g. from Goerli (1735353714)
    uint32 destinationDomain, // to Optimism-Goerli (1735356532)
    uint256 newValue // value to update to
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
      transactingAsset: address(0), // 0 address is the native gas token
      transactingAmount: 0, // not sending funds with this calldata-only xcall
      originMinOut: 0 // not sending funds so minimum can be 0
    });

    connext.xcall(xcallArgs);
  }
}
```

Now the target contract can only be updated by a cross-chain call from the source contract's `xChainUpdate` function!
