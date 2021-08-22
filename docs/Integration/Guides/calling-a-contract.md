---
sidebar_position: 1
---

# Calling a Contract on the Receiving Chain

NXTP Routers are able to act as cross-chain meta transaction relayers. This means they are able to call contracts on the receiving chain using data passed in from the sending chain. This can greatly enhance user experience by allowing users to interact with the receiving chain without needing funds for gas on the receiver side. Also this can enable "money legos" types of interactions across chains.

:::note

It is not possible to atomically verify the result on the sending chain, due to the asynchornous nature of the cross-chain transaction.

:::

The flow is as follows:
- The sender prepares a transaction on the sending chain with the calldata and callTo address set on chain.
- The router prepares the same transaction on the receiver side.
- The sender signs the payload when it confirms the receiver's funds are locked.
- The relayer fulfills the transaction on the receiver side, sends the funds to the interpreter address, and calls the contract specified in `callTo` using the calldata.

## FulfillHelper Contract

The NXTP system uses a [FulfillHelper](https://github.com/connext/nxtp/blob/22f84b1bf3437231b064143026022df545a25855/packages/contracts/contracts/interpreters/FulfillInterpreter.sol) contract to enable cross-chain meta transactions. The following steps must be completed to call a contract on a receiving chain:

- Generate calldata for the contract call on the receiving chain.
- Pass in the `callData` (generated calldata above) and `callTo` (address of called contract on receiving chain) params to the `getTransferQuote` and `prepareTransfer` methods on the [NXTP SDK](../APIReference/sdkAPI).

The router and relayer will `prepare` and `fulfill` the transaction on the receiving chain with the `callData` and `callTo`.

:::caution

If the transaction reverts, the funds will be sent back the the provided `receivingAddress`.

:::

## Example Code

The [integration tests](https://github.com/connext/nxtp/blob/main/packages/contracts/test/interpreters/fulfillInterpreter.spec.ts#L119) in the contracts repo demonstrate the cross-chain meta transaction functionality as a full working example.

Here is a simplified code snippet:

```typescript
const callData = counter.interface.encodeFunctionData("incrementAndSend", [
  assetId,
  other.address,
  amount,
]); // encode data using ABI

const bid = await sdk.getTransferQuote({
  callData,
  sendingChainId,
  sendingAssetId,
  receivingChainId,
  receivingAssetId,
  callTo: counter.address,
  receivingAddress: user.address,
  amount: "1000000",
}); // get quote for transfer

// wait for receiver prepared event
const prepared = await sdk.waitFor(
  NxtpSdkEvents.ReceiverTransactionPrepared,
  100_000,
  (data) => data.txData.transactionId === transfer.transactionId // filter function
);

// sign the transfer
await sdk.fulfillTransfer(prepared);
// on completion, the contract will be called
```
