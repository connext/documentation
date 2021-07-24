---
sidebar_position: 2
---

# Connext vs XYZ

In general, Connext is the *only* EVM-focused interoperability system that is both trust-minimized (no new security assumptions) and highly capital efficient (low fees for users).

## Interoperability Approaches

The key question behind any interoperability system is to determine *who* is responsible for mirroring information across chains.

|       Approach      |                                                                     Mechanism                                                                    |                        Examples                       | Trust Minimized (No new security assumptions) | Generalized (Event data passing) | Cheap/fast, easy to build, & easy to extend to more systems |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------:|:---------------------------------------------:|:--------------------------------:|:-----------------------------------------------------------:|
| Natively verified   | Chain's own validator set verifies xchain data.  Typically done by running a light client of origin chain inside of the destination chain's VM.  | IBC, Near Rainbowbridge, BTC Relay, rollup entry/exit |                       ✅                       |                 ✅                |                              ❌                              |
| Externally verified | 3rd party validator set verifies data across chains. AKA PoS/MPC systems.                                                                        | Thorchain, Anyswap, Hyphen, many many others.         |                       ❌                       |                 ✅                |                              ✅                              |
| Locally verified    | N-party system is reduced to 1:1 interaction, which is very easy to keep trust-minimized.                                                        | Connext, Hop, simple atomic swaps.                    |                       ✅                       |                 ❌                |                              ✅                              |

## Connext vs Pos/MPC Systems

PoS/MPC systems are interoperability frameworks where some external set of validators or oracles is responsible for moving data/value between chains. They are **externally verified** systems as per the above taxonomy.

Externally verified systems are generalized and easy to build, but their security model is necessarily weaker than that of the underlying chains. Connext does not possess the same level of generality as MPC systems, but it does inherit its security from the base chains.

For this reason, we think that in cases where generality is not needed, or when a significant amount of value needs to be transferred/secured, Connext is the better option.

## Connext vs Hop

Hop is a locally verified mechanism for sending tokens across rollups. Hop leverages existing arbitrary messaging bridges to send funds between chains, with a *bonder* (liquidity provider) fronting the capital on L1 to make the process fast. To incentivize rebalancing, the protocol also utilizes AMMs on both sides to swap between the "canonical" asset for a chain, and hTokens, a representative asset used by the bonder.

We'd like to note that we have an immense amount of respect for the Hop team. While there are marginal differences between Connext and Hop, they are also very similar in many ways. As a locally verified system, Hop is theoretically trust-minimized similar to Connext. Hop does have a dependency on an arbitrary messaging bridge existing between Ethereum and a connected chain, however, which can be a source of trust assumptions. 

Hop has a slightly better integration flow for developers as the system is purely onchain. In contrast, Connext requires integrating a (very lightweight) SDK to run an offchain route auction prior to onchain interactions. Hop also has a slightly better UX as only one signature is needed for users to interact with the system. Connext, on the other hand, requires a signature to initiate the interaction on the source chain, and one to complete the interaction on the destination chain (note that no gas needs to be paid by the user on destination).

Hop is less capital efficient than Connext. Hop requires liquidity for both its source and destination AMMs *and* for its bonders. Additionally, bonders submit bridging transactions on L1 (though these can be batched at scale). Bonders take a capital lockup for funds that they front, as the original user transaction must complete through an existing arbitrary messaging bridge - in the case of rollups, this lockup is the duration of the rollup exit. Lastly, bonders compete against one another to send txs on L1. This makes Hop bonders vulnerable to frontrunning/MEV, reducing margins.

In contrast, only the liquidity for a *given transaction* is needed to operate Connext. Connext routers take no lockups of capital, and operate directly between source and destination chains (without needing to necessarily incur any L1 gas costs). Connext's offchain route auctioning also make it resistant to MEV as LP/price are negotiated upfront. The combination of the above properties means that Connext has lower fees and significantly better LP returns than Hop.

## Connext vs Optics

Optics is a protocol for passing generalized data between arbitrary chains. Optics explores a very interesting tradeoff between being a locally vs externally verified system. Optics targets slow/infrequent arbitrary message passing between chains, and does this with a bonded relayer that can be slashed for posting incorrect data.

We do not consider Optics to be competitive to Connext but instead to be a complementary part of the growing interoperability stack. In fact, we are investigating the use of Optics as a part of our own mechanism for penalizing routers that attempt to grief users.

## Connext vs simple atomic swaps

Atomic swaps, typically done using htlcs, are a model for crosschain swapping where funds are locked and unlocked atomically between two parties on different chains.

Connext aims to be a protocol for more generalized crosschain interactions, rather than for exchanging assets. As such it optimizes for high reliability/uptime and better generality, at the cost of absolute best price:
- Connext borrows its core locking mechanism from atomic swaps, but extends the principle to arbitrary contract interactions and transfers.
- Connext uses a route auction and AMM-based pricing mechanism to source liquidity from a network of routers. In contrast atomic swap systems typically use an orderbook mechanism with the goal of trading two assets with a counterparty.
- Connext explicitly only enables interactions of 1:1 assets across chains (e.g. USDC on Polygon to USDC on Arbitrum). This mitigates free options in the system.
- Connext builds external mechanisms to penalize LPs for griefing users.