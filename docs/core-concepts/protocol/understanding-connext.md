---
sidebar_position: 3
id: understanding-connext
---


# What is Connext?

Connext powers fast, trust-minimized communication between blockchains.

Our goal is to create a world where:

1. Users never need to know what chain or rollup they're on (unless they want to!)
2. Developers can build applications that utilize resources from many chains/rollups simultaneously

## Modular Interoperabilty

There is no monolithic architecture that will give bridges *all* of the desirable properties, but we can get close to the ideal outcome by modularizing the protocol stack:

| Layer                   | Protocol/Stakeholders             |
| ----------------------- | --------------------------------- |
| `Application Layer`     | `Crosschain Applications (xApps)` |
| `Liquidity Layer`       | `NXTP`                            |
| `Messaging Layer`       | `Rollup AMBs, IBC, XCMP, etc.`                       |
| `Transport Layer`       | `Connext Routers`                 |


Let's take a closer look at some of these:

1. xApps are applications built by developers like you!
2. NXTP is a *liquidity* layer and *developer interface* built by Connext on top of a messaging protocol.
3. The messaging layer uses a combination of an optimistic mechanism and rollup-native AMBs to pass data between evm domains.
4. Routers “short-circuit” delays in processing messages by immediately executing calls/providing liquidity on the destination chain. **This removes latency in all user-facing cases.**

A simple mental model is to think of Connext as the liquidity layer to an AMB messaging layer. Connext and AMBs, as well as optimistic bridges, together provide the two halves of the “ideal” solution for interoperability.

## What does the Connext flow look like?

![Connext Diagram](/img/core-concepts/Connext_quick_overview.png "Title")

In this diagram we can observe two domains, "origin" and "destination", and two paths, "fast" and "slow".

In this case, let’s assume the intention of the user is to bridge tokens from the origin to the destination domain, and have access to fast liquidity.
Unlike bridging through an AMB alone, which often comes with several hours or days of latency for the user, Connext shortcuts this by allowing its routers to front you the capital, thereby taking on the liquidity risk for you while they wait for the tokens to move through the slow path. In cases where the messaging system delivers a bridge asset (i.e. minted asset), routers will also manage that complexity for you.

It's important to note that if the user is bridging data, or if the call needs to be authenticated by the caller, the bridging operation will always go through the slow path. This maintains data integrity by allowing the AMB verification process to complete.

## What can you build with Connext?

Some example use cases:

- Execute the outcome of **DAO votes** across chains
- Lock-and-mint or burn-and-mint **token bridging**
- **Aggregate DEX liquidity** across chains in a single seamless transaction
- Crosschain **vault zaps** and **vault strategy management**
- **Lend funds** on one chain and borrow on another
- Bringing **UniV3 TWAPs** to every chain without introducing oracles
- **NFT bridging** and chain-agnostic NFT marketplaces
- **Store data on Arweave/Filecoin** directly from within an Ethereum smart contract

## How do I interact with Connext?

Developers can call `xCall`, and the protocol will then splits actions between a Liquidity Layer (Connext) and a Messaging Layer.

You can interact with xCall in ways described in the `Send your first xCall` section of this document

## How do I interact with the Connext community?

Find our discord at https://discord.gg/pef9AyEhNz and join the `dev-hub` channel
