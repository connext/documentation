---
sidebar_position: 2
---

# Estimating Fees

For now, we need to rely on offchain tools to estimate fees, which can be done using the [Connext SDK](./sdk-guides.md). 

## Estimate Using SDK

The `NxtpSdkBase` class has an `estimateRelayerFee` method that estimates total gas fees including a bump to account for Gelato relayer fees. The resulting estimate will be converted to the native origin asset.

```typescript
const {nxtpSdkBase} = await create(nxtpConfig);

const params = {
  originDomain: "<ORIGIN_DOMAIN>",
  destinationDomain: "<DESTINATION_DOMAIN>"
}

const relayerFee = await nxtpSdkBase.estimateRelayerFee(params);
```

The estimate should be used for the `relayerFee` param for an `xcall` using the SDK.

```typescript
const xcallTxReq = await nxtpSdkBase.xcall(
  ...,
  relayerFee: relayerFee
);
```

Or passed in as the `value` for an `xcall` in a smart contract.

```solidity
contract Source {
  ...
  function crossChainCall() {
    ...
    connext.xcall{value: relayerFee}(...);
  }
}
```