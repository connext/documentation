---
sidebar_position: 4
id: nested-xcalls
---

# Nested xCalls

Cross-chain calls can easily be composed together by `xcall`ing within the `xReceive` function of a target contract. In effect, the target contract becomes the source contract of that nested `xcall`. 

## xCall in xReceive

```solidity
contract Target is IXReceiver {
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external returns (bytes memory) {
    // After handling the first xcall...
    ...

    // Send another xcall within the xReceive function!
    connext.xcall{value: relayerFee}(...);
  }
}
```

There are many ways to use nested `xcall`s to extend cross-chain functionality. With this technique, it's possible to:
- Emulate the behavior of a "callback" between chains to verify state changes and/or followup asynchronously 
- Disperse data to multiple different chains at once