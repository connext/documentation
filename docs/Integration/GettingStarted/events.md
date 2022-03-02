---
sidebar_position: 3
---

# Events

The `NxtpSdk` emits events that can offer builders a better experience for their users by notifying them of things going on in the transfer flow.

## Listening to Events

The SDK supports the following methods to listen for events, heavily inspired by the [Evt](https://www.evt.land) library's interface. The methods can be called directly on the SDK instance:

- `.attach(eventName, callbackFn, filterFn)` - Listen for an event and run a handler on every instance of that event, with an optional filter function.
- `.attachOnce(eventName, callbackFn, filterFn)` - Listen for an event and run a handler on the first instance, with an optional filter function. Detaches the listener after.
- `.waitFor(eventName, timeoutMs, filterFn)` - Listen for an event and resolve a promise with the event payload on the first instance, with an optional filter function.
- `.detach(eventName)` - Detach listeners by event name or all events (if name isn't provided).

## Events

- `SenderTransactionPrepareTokenApproval`
- `SenderTokenApprovalMined`
- `SenderTransactionPrepareSubmitted`
- `SenderTransactionPrepared`
- `SenderTransactionFulfilled`
- `SenderTransactionCancelled`
- `ReceiverPrepareSigned`
- `ReceiverTransactionPrepared`
- `ReceiverTransactionFulfilled`
- `ReceiverTransactionCancelled`

The event payloads are fully typed, the callbacks will automatically be typed with the event that is listened for.

## Example

```ts title="Run callback on every request for specific transactionId"
sdk.attach(
  NxtpSdkEvents.SenderTransactionPrepared,
  (data) => {
    console.log("SenderTransactionPrepared:", data); // data is fully typed
  },
  (data) => data.txData.transactionId === transactionId
);
```

```ts title="Run callback on a single request for specific transactionId"
sdk.attachOnce(NxtpSdkEvents.SenderTransactionPrepared, (data) => {
  console.log("SenderTransactionPrepared:", data); // data is fully typed
});
```

```ts title="Wait for a specific event"
try {
  const data = await sdk.waitFor(
    NxtpSdkEvents.ReceiverTransactionPrepared,
    100_000,
    (data) => data.txData.transactionId === transactionId
  );
  console.log("ReceiverTransactionPrepared:", data); // data is fully typed
} catch (e) {
  // did not get event in time
}
```
