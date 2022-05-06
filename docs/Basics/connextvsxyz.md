# Connext vs XYZ

In general, Connext is the *only* EVM-focused interoperability system that is both trust-minimized (no new security assumptions) and highly capital efficient (low fees for users).

## Interoperability Approaches

The key question behind any interoperability system is to determine *who* is responsible for mirroring information across chains. You can learn more about this in our [Interoperability Trilemma blog post](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17).

|       Approach      |                                                                     Mechanism                                                                    |                        Examples                       | Trust Minimized (No new security assumptions) | Generalized (Event data passing) | Cheap/fast, easy to build, & easy to extend to more systems |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------:|:---------------------------------------------:|:--------------------------------:|:-----------------------------------------------------------:|
| Natively verified   | Chain's own validator set verifies xchain data.  Typically done by running a light client of origin chain inside of the destination chain's VM.  | IBC, Near Rainbowbridge, BTC Relay, rollup entry/exit |                       ✅                       |                 ✅                |                              ❌                              |
| Externally verified | 3rd party validator set verifies data across chains. AKA PoS/MPC systems.                                                                        | Thorchain, Anyswap, Synapse, Hyphen, many many others.         |                       ❌                       |                 ✅                |                              ✅                              |
| Locally verified    | N-party system is reduced to 1:1 interaction, which is very easy to keep trust-minimized.                                                        | Connext, Hop, simple atomic swaps.                    |                       ✅                       |                 ❌                |                              ✅                              |

## Connext vs Pos/MPC Systems

PoS/MPC systems are interoperability frameworks where some external set of validators or oracles is responsible for moving data/value between chains. They are **externally verified** systems as per the above taxonomy.

Externally verified systems are generalized and easy to build, but their security model is necessarily weaker than that of the underlying chains. Connext does not possess the same level of generality as MPC systems, but it does inherit its security from the base chains.

For this reason, we think that in cases where generality is not needed, or when a significant amount of value needs to be transferred/secured, Connext is the better option.

## Connext vs Hop

Hop is a locally verified mechanism for sending tokens across rollups. Hop leverages existing arbitrary messaging bridges (AMBs) to send funds between chains, with a *bonder* (liquidity provider) fronting the capital on L1 to make the process fast. To incentivize rebalancing, the protocol also utilizes AMMs on both sides to swap between the "canonical" asset for a chain, and hTokens, a representative asset used by the bonder.

Because the "proof" of a transfer is passed between chains using an AMB, Hop bypasses the need for users to run offchain code (unlike Connext). However, this pattern presents some tradeoffs:

- **Security:** Hop is less economically secure than Connext. The dependency on an AMB for Hop means that one needs to be created if none exists which has the same trust model as an externally verified system. In the case of optimistic rollups, Hop passes their messages through the rollup exit after one day instead of waiting for the full seven day exit, which also reduces security.
- **Capital Efficiency:** Hop requires not only the exit liquidity for user provided by a Bonder (similar to Connext), but also liquidity for AMMs on both the sending and receiving chains. Additionally, the Hop Bonder's liquidity is fully locked up while the tx is passed through the AMB (1 day for rollups). In contrast, Connext routers *only* need exit liquidity and incur no liquidity lockup, achieving 10x+ better capital usage. The effect of this is that Hop will be either more expensive for the user or less profitable for the LP.
- **Speed and Cost:** All txs through Hop need to be bonded on the Ethereum L1. This means incurring L1 gas costs as a Bonder. Bonders can batch transactions, but that necessarily means adding latency as Bonders need to wait for more txs. In Connext, transactions go *directly* from L2 -> L2.
- **MEV:** Hop Bonders are highly susceptible to MEV and gas price griefing. Hop Bonders race each other to submit txs to chain, implying that margins for Bonder fees will be squeezed away as Bonders (and/or frontrunning bots) bid up the gas price for a given transaction. In Connext, users negotiate offchain on route and pricing, making it impossible for 3rd parties to frontrun the crosschain transaction.

Functionally, Hop and Connext both support the same level of contract-contract interactions across chains. While it is true that Connext users would need to run some (very lightweight) offchain code to negotiate routes, we are working on building this directly into the wallet layer - this way it is completely invisible to both the developer and user.

## Connext vs Optics

Optics is a protocol for passing generalized data between arbitrary chains. Optics explores a very interesting tradeoff between being a locally vs externally verified system. Optics targets slow/infrequent arbitrary message passing between chains, and does this with a bonded relayer that can be slashed for posting incorrect data.

We do not consider Optics to be competitive to Connext but instead to be a complementary part of the growing interoperability stack. In fact, we are investigating the use of Optics as a part of our own mechanism for penalizing routers that attempt to grief users.

## Connext vs simple atomic swaps

Atomic swaps, typically done using htlcs, are a model for crosschain swapping where funds are locked and unlocked atomically between two parties on different chains.

Connext aims to be a protocol for more generalized crosschain interactions, rather than for exchanging assets. As such it makes tradeoffs for high reliability/uptime and better generality, at the cost of absolute best price:
- Connext borrows its core locking mechanism from atomic swaps, but extends the principle to arbitrary contract interactions and transfers.
- Connext uses a route auction and AMM-based pricing mechanism to source liquidity from a network of routers. In contrast atomic swap systems typically use an orderbook mechanism with the goal of trading two assets with a counterparty.
- Connext explicitly only enables interactions of 1:1 assets across chains (e.g. USDC on Polygon to USDC on Arbitrum). This mitigates free options in the system.
- Connext builds external mechanisms to penalize LPs for griefing users.
