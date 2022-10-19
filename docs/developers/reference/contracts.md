---
sidebar_position: 1
title: Contracts
id: contracts-overview
---

# Introduction

Connext should be thought of as a “modular interoperability system”. The system consists of a liquidity layer on top of a verification layer with a time window for pausing in case of fraud on top of a system of connectors that abstract away the underlying transport mechanisms. Connext hides all this complexity behind a simple interface named xcall which allows seamless asset transfers with rich programmability.

## Contract Stack

<img src="/img/developers/AMB_Architecture.png" alt="connext contracts" width="750"/>

### Connext 

Dispatches and handles messages related to sending funds across chains. Custodies funds for canonical assets, fast liquidity, and stable swaps. Uses the Diamond architecture.

### Messaging 

The various contracts required to manage merkle roots containing hashed transfer data and send them through a hub-and-spoke architecture. The messaging architecture is made up of the following components:

- **Connector.** A connector is an abstraction around an underlying transport layer. The `IConnector` interface requires a `processMessage` method implemented for handling incoming messages. `Connector` is an abstract contract that is inherited by the following contracts:

  - **SpokeConnector.** The `SpokeConnector` is deployed on spoke domains and implements a `send` method to send the Merkle root of all the messages that originate from the spoke domain to the hub domain. For example, `ArbitrumSpokeConnector` is deployed on the Arbitrum L2.
  
  - **HubConnector.** The `HubConnector` is deployed on hub domains for each spoke and implements a `sendMessage` method to send the aggregated Merkle root of all the received spoke Merkle roots to the configured destination domain. For example `ArbitrumHubConnector` is deployed on Ethereum L1.

:::info
💡 Each AMB implementation requires us to create and deploy `HubConnector` and `SpokeConnector` contracts for that flavor of AMB, calling into the internal bridge infrastructure.
:::

## Facets

Following the EIP-2535 Diamond standard, the Connext contract contains a set of Facets that act as logical boundaries for groups of functions. Facets share contract storage and can be upgraded separately.

### TokenFacet

Manages asset enrollment, stores mappings of adopted <-> local assets, exposes liquidity caps functions, and specifies stableswaps for assets.

### BridgeFacet

Implements `xcall` and enables destination-side calldata execution.

### InboxFacet

Holds all the functionality needed for Connext's messaging layer to reconcile cross-chain transfers.

### ProposedOwnableFacet

Provides a basic access control mechanism.
### RelayerFacet

Manages whitelisting of relayers.
### RoutersFacet

Manages whitelisting of routers and keeps track of router owners/recipients.
### StableSwapFacet

A StableSwap implementation that custodies closely pegged assets (eg. group of stablecoins).

### SwapAdminFacet

Manages only-admin controls for the StableSwapFacet.

### DiamondCutFacet

Functions for adding, removing, and replacing facets.

### DiamondLoupeFacet

Required by the Diamond standard. Implements the DiamondLoupe interface which allows for inspection of a Diamond contract's various facets and their functions.