---
sidebar_position: 3
id: nested-xcalls
---

# Nested xcalls

## Introduction

One awesome feature we've introduced is the ability to use callbacks to respond to results of calls from the destination domain on the origin domain. You can read the [detailed spec here](https://github.com/connext/nxtp/discussions/883). This example will build on top of the Authenticated example.

---

### Source Contract

To enable callback handling, some contract on the origin domain must implement the `ICallback` interface. This could be a separate contract or the Source contract itself. 

We'll have our Source contract handle the callback. To do so, Source should import the `ICallback` interface and change the `callback` param to the address of the contract implementing this interface. It will also need a reference to the Connext PromiseRouter contract.

```solidity title="Source.sol"
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";
//highlight-next-line
import {ICallback} from "nxtp/core/promise/interfaces/ICallback.sol";

contract Source {
  event CallbackCalled(bytes32 transferId, bool success, uint256 newValue);

  IConnextHandler public immutable connext;
  address public immutable promiseRouter;

  // The callback-handling contract needs a reference to the Connext PromiseRouter similarly 
  // to how the Target contract needs a reference to the Connext Executor. The contract 
  // implementing `callback` should only allow the Connext PromiseRouter to call it.
  modifier onlyPromiseRouter () {
    require(
      msg.sender == address(promiseRouter),
      "Expected PromiseRouter"
    );
    _;
  }

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
      transactingAsset: address(0), // 0 address is the native gas token
      transactingAmount: 0, // not sending funds with this calldata-only xcall
      originMinOut: 0 // not sending funds so minimum can be 0
    });

    connext.xcall(xcallArgs);
  }

  // Required for contracts implementing the ICallback interface. 
  // This function is called to handle return data from the destination domain.
  //highlight-next-line
  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external onlyPromiseRouter {
    uint256 newValue = abi.decode(data, (uint256));
    emit CallbackCalled(transferId, success, newValue);
  }
```

The return data from the destination domain is sent with the callback so we can do whatever we want with it. In this case, we simply emit an event with the `newValue` we sent so that the callback can be used on the origin domain to verify a successful update on the destination domain.

### Target Contract

On the Target side, the function just needs to return some data.

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

  function updateValue(uint256 newValue) 
    external onlySource  
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