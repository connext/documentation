---
sidebar_position: 3
id: authentication
---

# Authentication

Authentication is a critical concept to understand when building xApps. In the context of smart contracts, an authenticated call is one that passes permissioning constraints set by the protocol developer. In most cases this manifests as a modifier that allows a certain set of addresses to call specific smart contract functions - in other words, we are talking about access control.

For example:
- Uniswap's `swap` [function](https://docs.uniswap.org/protocol/reference/core/UniswapV3Pool#swap) is **unauthenticated** because it is a public function that can be called by anyone.
- Uniswap's `setFeeProtocol` [function](https://docs.uniswap.org/protocol/reference/core/UniswapV3Pool#setfeeprotocol) is **authenticated** because it uses the `onlyFactoryOwner` modifier that prevents anyone but the owner of the contract factory from calling it. You can read more about this at [OpenZeppelin's Ownable contracts](https://docs.openzeppelin.com/contracts/2.x/api/ownership).

## Checking Origin Data

Suppose a target contract on the destination domain has a function that should only be callable by a specific source contract on a specific origin domain.

A custom modifier like `onlySource` below can conduct all the necessary checks to uphold this permissioning constraint.

```solidity
contract Target is IXReceiver {
  /** @notice A modifier for authenticated calls.
   *  This is an important security consideration. If the target contract
   *  function should be authenticated, it must check three things:
   *    1) The originating call comes from the expected origin domain.
   *    2) The originating call comes from the expected source contract.
   *    3) The call to this contract comes from Connext.
   */
  modifier onlySource(address _originSender, uint32 _origin) {
    require(
      _origin == <ORIGIN_DOMAIN> &&
        _originSender == <SOURCE_CONTRACT_ADDRESS> &&
        msg.sender == <CONNEXT_CONTRACT_ADDRESS>,
      "Expected source contract on origin domain called by Connext"
    );
    _;
  }

  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external onlySource(_originSender, _origin) returns (bytes memory) {
    // Do stuff that requires authentication
  }
}
```

You can find a full example of this at [Authenticated Hello](../examples/authenticated-hello).

## Caveats

Authenticated calls are a crucial feature for xApps but in order to validate data transferred between chains, Connext must allow *some* time to elapse before accepting messages as authenticated on destination chains. This latency is both a drawback and a security mechanism of [optimistic bridges](../../core-concepts/background#optimistic-bridges). 