---
sidebar_position: 4
id: "architecture"
---

# Connext Architecture

The Connext protocol is composed of a set of smart contracts and offchain agents.

## Smart Contracts

Connext's smart contracts are the interfaces between the protocol and the wide gamut of different users in the ecosystem. There are contracts for handling `xcall`, managing asset registration, and provisioning liquidity for routers and stableswap LPs. 

More details are available in the [Smart Contract Overview](../developers/reference/contracts/contracts-overview.md).

## Offchain Agents

### Routers

Routers are liquidity providers that enable instant liquidity for the user on the destination chain in return for a fee. Anybody can participate in the protocol as a router and there is no minimum liquidity required!

More details are available in the [Routers Section](../routers/intro.md).

### Sequencer

The sequencer collects bids from all chains and randomly selects router(s) to fulfill them. Any number of routers can fulfill a single transaction, which is especially useful for large transfers. The sequencer will post batches of these bids to a relayer network to submit them to chain.

### Relayers

Relayers are a decentralized network of infrastructure operators that can execute smart contract transactions on behalf of a user in exchange for a small fee. Because the last leg of a cross-chain transaction requires execution on the destination domain, relayers play an important role in completing the full flow.

We are currently using [Gelato](gelato.network) as our relayer service.
