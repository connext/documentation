---
sidebar_position: 1
---

# Introduction

Connext provides the simplest possible experience for building xchain applications (**xApps**).

Building a xApp requires only two straightforward steps:
1. Implement `xReceive` in the destination chain contract. This is the function that receives the payload you pass across chains.
2. Call `xcall` on the origin chain, passing in your payload and [relayer fees](./guides/estimating-fees).

[Get started with the Quickstart](./quickstart)

---

## Important Concepts With Guides

### Fast Path vs. Slow Path 

Take a moment to review the [Transaction Lifecycle](../concepts/how-it-works/transaction-flow). Here we introduce the concept of "fast path" and "slow path" (authenticated) transfers. The differentation is crucial to understand for any cross-chain project. Then, try it out with our Authentication guide.

[Authentication](./guides/authentication)

### Relayer Fees

Check out our guide on what these are and how to estimate them. 

[Estimating Fees](./guides/estimating-fees)

### Handling Failures

You should always build in contingency for failed calls.

[Handling Failed xCalls](./guides/handling-failures)

### Tracking xCalls

Dive into the current status of an `xcall`.

[Tracking xCalls](./guides/xcall-status)

### Nested xCalls

You can even chain `xcall`s across domains! :open_mouth:

[Nested xCalls](./guides/nested-xcalls)

---
## Help

Have questions or need support? Our core team and vibrant community members are highly active in our Discord server!

[Chat with us!](https://discord.gg/connext)
