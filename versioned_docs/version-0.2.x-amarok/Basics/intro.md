---
sidebar_position: 1
id: intro
---

# Introduction

Connext is the interoperability protocol of L2 Ethereum.

You can use Connext to send transactions of value or calldata across chains and/or rollups. Unlike most other interoperability systems, Connext enables this *without* introducing any new trust assumptions or external validators.

## Contents

These docs contain information for developers integrating Connext and liquidity providers. If you're interested in contributing to the development of the system or curious about the ongoing progress of the Amarok network upgrade, check out the Amarok branch of our [core implementation repo](https://github.com/connext/nxtp/tree/amarok).

## Amarok Upgrade

Amarok is the first network upgrade for Connext which contains core protocol changes to improve the experience for end-users, developers, and router operators.

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

### Consensus Routing

To achieve offchain consensus between routers for completing transactions. This will eventually use Tendermint consensus and will start with a centralized sequencer in the first phase of launch.

## Start Building

Want to get started with crosschain interactions in your dApp? We step through several development flows in our [Quick Start](../Develop/QuickStart/) and [Guides](../Develop/Guides/). Starting building and integrating Connext's cross-chain functionality into your project!
