---
sidebar_position: 2
id: estimating-fees
---

# Estimating Fees

There are two types of fees paid to offchain agents for each applicable `xcall`. 

- **Router Fee**: 0.05% of the transferred asset will be levied by routers on destination for their service as fast liquidity providers. 
  - The 'fast path' is possible when routers have liquidity in the destination asset and are able to provide those assets to the user. This allows users to receive their desired destination assets almost *immediately*. 
  - Routers will take on the bridge delay and wait for the optimistic period to pass. Once complete, the bridge will 'reconcile' by minting the local destination assets to the routers, making them whole again. 
  - If an `xcall` goes through the 'slow path' ([authenticated](./authentication)), then users do not pay the router fee.
  - Note that routers always provide *and* receive minted assets of the local destination flavor - they never have to rebalance funds!

- **Relayer Fee**: A fee charged by relayers on top of normal gas costs in exchange for providing a meta-transaction service. 
  - Relayers execute transactions on the destination chain on behalf of users.
  - Users offer a fee bounty to incentivize relayers to execute their destination calls.
  - Relayer fees are paid in the origin native asset and need to be estimated when `xcall` is initiated. Some relayers provide endpoints that can help with estimation. 


Router fees are fixed and hardcoded into the Connext protocol. Relayer fees, on the other hand, can vary between chains and the service provider. 

## Estimating Relayer Fees

For now, we need to rely on offchain tools to estimate relayer fees. The [Connext SDK](./sdk-guides.md) abstracts away some of this complexity. 

The `SdkBase` class includes an `estimateRelayerFee` method that estimates total gas fees including a bump to account for Gelato relayer fees. The resulting estimate will be converted to the native origin asset.

```typescript
const {sdkBase} = await create(nxtpConfig);

const params = {
  originDomain: "<ORIGIN_DOMAIN>",
  destinationDomain: "<DESTINATION_DOMAIN>"
}

const relayerFee = await sdkBase.estimateRelayerFee(params);
```

The estimate should be used as the `relayerFee` param for an `xcall` using the SDK.

```typescript
const xcallTxReq = await sdkBase.xcall(
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

## Bumping Relayer Fees

Since gas conditions are impossible to predict, transactions can potentially stay pending on destination if fees aren't high enough. Connext allows the user (or anyone if they are feeling charitable) to increase the original fee until sufficient for relayers.

Anyone can call the Connext contract function `bumpTransfer` to increase the original relayer fee for an `xcall`. 

```solidity
function bumpTransfer(bytes32 _transferId) external payable;
```

To find the `transferId`, see [Tracking xCalls](./xcall-status).
