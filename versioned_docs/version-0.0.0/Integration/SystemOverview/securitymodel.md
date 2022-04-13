---
sidebar_position: 3
---

# Security Model

:::note

We assume below that you already have read the [How it works](./howitworks) section.

:::

In general, Connext adopts the same core security model as other locking systems such as HTLCs. Unlike other systems, Connext is less vulnerable to free options as all interactions across chains are with 1:1 assets (e.g. ETH on Optimism to ETH on Arbitrum).

## Risks

### Loss of Funds

Barring the possibility of a hack or user error, there is **no** way for users to lose funds in this system. To ensure that they are safe, users simply need to make sure that the corresponding `prepare` transaction on the destination chain has the same transaction data as what they sent on the origin chain.

There is a possibility that routers can lose funds if the chain is attacked or if a router goes completely offline for an extended duration while transfers are in progress. After a user `fulfill`s their transaction on the destination chain, routers have until the transaction's `expiry` to submit the corresponding `fulfill` tx on the origin chain to claim their funds. If routers fail to do this, the transaction on the origin chain is automatically reverted back to the user.

In practice, this is an acceptable risk so long as the duration of `expiry` is long enough to mitigate chain congestion attacks and to account for potential downtime. Routers are assumed to be automated/online actors with high reliability (similar to nodes and validators for other systems), and can gracefully shut down their operations without risk if they cease to accept new transactions and complete all pending ones.

### DoS and Griefing

It is possible for routers to grief users by locking up user liquidity for the duration of the `expiry`. This can happen if the router commits to making a transaction, the user submits a `prepare` tx on the origin chain, but the router never submits a corresponding `prepare` on the destination chain.

Note that this lockup explicitly only exists in malicious cases, as the router possesses the ability to `cancel` the sender's prepare on the origin chain.

In the short term, there is a whitelist for routers in the core contracts which the Connext team has the ability to update. The Connext team expects to work closely with an initial set of pilot routers that are trustworthy and reputationally disincentivized to attempt to grief users.

In the medium to long term, we are implementing a slashing mechanism to penalize routers that do not complete transactions that they have committed to. When this is implemented, the Connext team will burn their admin key for the router whitelist, enabling any router to join the system permissionlessly.