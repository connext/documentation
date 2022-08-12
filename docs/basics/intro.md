---
sidebar_position: 1
id: intro
---

# 👋 Welcome!

Connext powers fast, trust-minimized communication between blockchains.

You can use Connext to build crosschain applications (**xapps**) like:
- Bridges to transfer value between blockchains
- Interchain DeFi protocols
- Chain-agnostic NFTs
and more!

Our goal is to create a world where:
1. Users never need to know what chain or rollup they're on (unless they want to!)
2. Developers can build applications that utilize resources from many chains/rollups simultaneously

## Contents

:::note
These docs are a work in progress! Please bear with us as we work to fill them out.
:::

These docs are specifically for the interfaces introduced after our [Amarok network upgrade](https://blog.connext.network/announcing-the-amarok-network-upgrade-5046317860a4?source=collection_home---4------4-----------------------) which is currently on testnet. If you're looking for our legacy docs, switch to version 0.1.x in the navbar above.

If you're interested in contributing to the development of the system or curious about the ongoing progress of the Amarok network upgrade, check out the Amarok branch of our [core implementation repo](https://github.com/connext/nxtp/tree/amarok).

### Modular Interoperability

Amarok introduces the concept of a crosschain communication **protocol stack** with NXTP as the liquidity layer, Nomad as the messaging layer, and Connext routers as the transport layer.

|         Layer         |                           Protocol/Stakeholders                            |
| :-------------------: | :------------------------------------------------------------------------: |
|   Application Layer   |                      Crosschain Applications (Xapps)                       |
|    Liquidity Layer    |                                    Nxtp                                    |
| Gateway/Routing Layer | Interchain Gateway Protocol (routes to the correct messaging protocol!) |
|    Messaging Layer    |                       Nomad, IBC, XCMP, Rollup AMBs                        |
|    Transport Layer    |                              Connext Routers                               |

### Generalized Crosschain Messaging

We've partnered with Nomad, a crosschain communication protocol that uses ORU-style fraud proofs for security. In tandem, the stack built on top of Connext and Nomad provides the same instant transfers where possible and also enables generalized crosschain operations, using an optimistic latency window of 30 minutes for _some_ calls.

More information on this partnership can be found in this [Medium post](https://medium.com/connext/connext-has-partnered-with-nomad-e20cd8e62e31).

### No More Offchain Auctioning / Signature Dependencies

An external proof mechanism is no longer needed. Instead, a Router can simply front capital on the destination chain, and then wait for data from the origin chain to be ported over the messaging layer to destination, where both the user and router transactions can be compared for validity (and the router can replenish their capital). This enables contract-only development processes which greatly simplifies devX.

### What is our Fee model?

We consider connext a public good, and thus Connext does not charge end users for bridging tokens from one network to another.

A few different entities are involved in Connext’s cross-chain transactions and incentives are built into the system to motivate their participation. Like other systems, incentives are primarily in the form of service provider fees.

Liquidity providers, aka Routers, take a standard 0.05% fee over bridged amounts to reward them for providing liquidity, along with gas refunds to compensate for expenses they incur.

### Consensus Routing

To achieve offchain consensus between routers for completing transactions. This will eventually use Tendermint consensus and will start with a centralized sequencer in the first phase of launch.

## Start Building

Want to get started with crosschain interactions in your dApp? Start building and integrating Connext's cross-chain functionality into your project!

[Get Started](../developers/intro)
