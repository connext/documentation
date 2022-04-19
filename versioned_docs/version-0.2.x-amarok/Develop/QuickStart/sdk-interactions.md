---
sidebar_position: 2
---

# Interacting from the SDK

## SDK Base

Using the SDK Base, a user can obtain granular access to the transaction request object.

```
// TODO: example construction of xCallArgs

const txRequest = await sdkBase.xcall(
  xCallArgs
);
```

## SDK 

With the higher-level SDK, a user just initiates an xcall -- fire and forget.

```
const txResponse = await sdk.xcall(
  XCallArgs
)
```
