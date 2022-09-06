---
sidebar_position: 1
id: intro
---

# 👋 Welcome!

Connext powers fast, trust-minimized communication between blockchains.

You can use Connext to build crosschain applications (**xapps**) like:
- Bridges to transfer ERC-20 tokens between blockchains
- Crosschain DeFi protocols
- Crosschain NFTs
and more!

Our goal is to create a world where:
1. Users never need to know what chain or rollup they're on (unless they want to!)
2. Developers can build applications that utilize resources from many chains/rollups simultaneously

## Contents

These docs are specifically for the interfaces introduced after our [Amarok network upgrade](https://blog.connext.network/announcing-the-amarok-network-upgrade-5046317860a4?source=collection_home---4------4-----------------------) which is currently on testnet. If you're looking for our legacy docs, switch to version 0.1.x in the navbar above.

If you're interested in contributing to the development of the system or curious about the ongoing progress of the Amarok network upgrade, check out the main branch of our [core implementation repo](https://github.com/connext/nxtp/tree/main).

### Modular Interoperability

Amarok introduces the concept of a crosschain communication **protocol stack** with NXTP as the liquidity layer, AMB bridges as the messaging layer, and Connext routers as the transport layer.

|         Layer         |                           Protocol/Stakeholders                            |
| :-------------------: | :------------------------------------------------------------------------: |
|   Application Layer   |                      Crosschain Applications (Xapps)                       |
|    Liquidity Layer    |                                    Nxtp                                    |
| Gateway/Routing Layer | Interchain Gateway Protocol (routes to the correct messaging protocol!)    |
|    Messaging Layer    |                       Rollup AMBs, IBC, XCMP, etc                          |
|    Transport Layer    |                              Connext Routers                               |

### Generalized Crosschain Messaging

We are working with a temporary solution that uses existing AMBs for rollups and sidechains to relay messages and a system of Connectors to plug those into one another. This solution will minimize release delays while still allowing us to move toward a fully optimistic bridge as soon as possible.

In tandem, the stack built on top of Connext and AMBs provides the same instant transfers where possible and also enables generalized crosschain operations, using an optimistic latency window of 60 minutes for _some_ calls.

More information on this solution can be found in this [blog post](https://blog.connext.network/amarok-amb-update-77f142c22db3).

### No More Offchain Auctioning / Signature Dependencies

An external proof mechanism is no longer needed. Instead, a Router can simply front capital on the destination chain, and then wait for data from the origin chain to be ported over the messaging layer to destination, where both the user and router transactions can be compared for validity (and the router can replenish their capital). This enables contract-only development processes which greatly simplifies devX.

### How do I add my chain to Connext?

Connext does not charge any fee to onboard new chains.
You can learn about our process for onboarding new chains in our [Chain Onboarding Guide](https://www.notion.so/connext/How-can-Connext-Bridge-add-my-Chain-fa8b43cac720467a88b5c94f81804091)

### What is our Fee model?

We consider connext a public good, and thus Connext does not charge end users for bridging tokens from one network to another.

A few different entities are involved in Connext’s cross-chain transactions and incentives are built into the system to motivate their participation. Like other systems, incentives are primarily in the form of service provider fees.

Liquidity providers, aka Routers, take a standard 0.05% fee over bridged amounts to reward them for providing liquidity, along with gas refunds to compensate for expenses they incur.

### Consensus Routing

To achieve offchain consensus between routers for completing transactions. This will eventually use Tendermint consensus and will start with a centralized sequencer in the first phase of launch.

## Start Building

Want to get started with crosschain interactions in your dApp? Start building and integrating Connext's cross-chain functionality into your project!

[Get Started](../developers/intro)
