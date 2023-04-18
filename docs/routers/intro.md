---
sidebar_position: 1
id: routers-intro
---

# Basics

Routers are the active liquidity providers & nodes of the Connext network.

## How do routers work?

1. Before becoming active in the network, routers provide liquidity on each chain and for each asset they want to support. This liquidity is denominated in `nextAssets` - a Connext-specific unit-of-account that acts as an IOU of locked funds on Ethereum L1.

2. Routers observe all chains in the network. For `xcall`s involving their supported chains & assets, routers simulate the transaction on destination, create a **bid** (a signed transaction that executes the destination chain interaction), and submit that bid to the Connext **sequencer** .

3. The sequencer waits a fixed period of time to collect bids from routers and then randomly selects from among them. For every batch of transactions, the sequencer will send a corresponding batch of winning bids to a relayer network (e.g. Gelato) to submit the transaction to the destination chain.

4. For router transactions that are submitted by the sequencer immediately (see [fast path](../concepts/how-it-works/flow.md#fast-path)), the router effectively *fronts* the transaction funds and calldata on the destination, being repaid by the protocol after the [slow path](../concepts/how-it-works/flow.md#slow-path) completes *if they submitted the transaction with the parameters provided in the origin chain `xcall`*.

## Risks

Routers are largely designed to be as passive and safe for operators as possible. However, there are some risks to be aware of:

1. **Hot wallet:** Routers are effectively a "hot wallet" of funds owned by the router operator that can unilaterally spend owned funds in the protocol. This means that proper key management practices are a must for routers that want to operate in production.
2. **Misconfigured environments:** Router operators should also ensure that they are careful to not expose the router's private API as part of setting up their enviroment.
3. **Protocol security**: As with any protocol, router operators are ultimately exposed to the risk of Connext's underlying implementation. While this risk is never 0, Connext follows best practices for [auditing](https://github.com/connext/audits), [security bounties](https://immunefi.com/bounty/connext/), and operational practices to keep routers safe.

Refer to [security.md](./Guides/security.md) and [router community call](https://www.youtube.com/watch?v=rjNcdm1mjCQ) for best practices to mitigate these risks.

## Business Model

The router’s primary business model is to earn transaction fees for providing liquidity and relaying data across chains.

Routers earn a fee of 5 basis points (0.05%) on all liquidity that is provided for a user transaction. Router liquidity is then subsequently locked up until it can be claimed against the slow path. In effect, this is asa if the router is giving a protocol-level loan to the user for a period of up to 2 hours. In this model, router ROI scales with user demand - routers earn the highest returns if a high percentage of their capital is frequently locked up.

Routers currently do not take a fee for relaying data itself. There are future plans to implement an EIP-1559-style tip, that can supplement router income for data-only transactions.