---
sidebar_position: 1
---

# Introduction

## What are Routers?

Routers are one of the two liquidity providers used in the Connext Network. The router’s role is essential; to provide instant liquidity for the user in the destination chain. Routers are given a fee based on the transaction size in return. Routers then claim the spent fund plus the fee from the AMB bridge after the latency period ends, which is around 30 minutes.

## How do they work?

The user initiates the transaction through a front end which is linked to the Connext Network smart contracts. At the technical level, these are the whole process:

1. The user initiates the transaction by calling the `xcall` function on the Connext contract, which will include: passing in funds, gas details, arbitrary data, and a target address  (including the chain info and this can be a contract). The Connext contract will, if needed, swap the user’s fund to match the AMB bridges token type and call the AMB contract to start the 60 minutes message latency across chains.
2. Observing routers with funds on the user destination chain will simulate the transaction. If passed, they will use their funds to sign the transaction and send it to an auctioneer (Sequencer), a kind of bidding. Routers can bid for the full transaction if they can afford it. As well as in fractions, if they want to split. The auctioneer collects the router’s bids in every X block and selects the router(s) to fill in the user’s transaction. It will check if the router can complete within a single transfer; otherwise, it will split across multiple bids that are received from different routers. 
3. Then, the auctioneer will group all bids and send them to a relayer network for on-chain submission. The contract then 1) checks whether the fund is enough for the transaction, 2) if needed, swaps the AMB bridge token type to match the canonical asset of the chain, and 3)  lastly, sends the fund to the correct target (including executing `calldata` against the target contract). At this point, the user will receive their fund on the destination chain.
4. For routers, they will not receive their fund yet. After 60 minutes and the AMB message had arrived, the heavily batched transaction hashes will be checked for their corresponding router addresses. If matched, AMB flavored assets are minted and paid back to the routers.

## Security Assumptions and Risks

### Security Assumptions

Optimistic bridges differ from externally verified bridges. After the data have been posted to the destination chain, there will be a 60 minutes window for any watcher to prove the validity of the transaction. If any watcher can prove fraud on the origin chain, the original funds will be slashed and transferred to the disputed watcher instead.

Optimistic bridges use a single honest verifier assumption. This means that it requires only 1 of N verifiers in the system to verify and update cross-chain data correctly.
In other words, the cost to attack an optimistic bridge with N verifiers equals the cost to corrupt or hack N verifiers. As a result, assuming the underlying chains are secure, no amount of money can guarantee that a hack or an attack will be successful.

### Risks

1. Brute force attack on the router's Admin Token. (The Admin Token is used by routers to authenticate requests made to the Router's REST API endpoint.)
2. If the Docker Router image and VM has a direct connection to the Internet, the router's API endpoint is susceptible to being exposed externally.
3. The sequencer collects bids from the routers and chooses a router to fulfill the transaction request. The system will be down if sequencer downtime occurs.
4. With fraud-proof, funds can be delayed if any watcher can prove a fraudulent transaction within the 60 minutes window. So, the router will have to wait for the funds until the disputed watcher is resolved.
5. Router's private key is leaked and liquidity withdrawn from router's wallet.

Refer to [security.md](https://github.com/connext/documentation/blob/main/docs/routers/security.md) and [router community call](https://www.youtube.com/watch?v=rjNcdm1mjCQ) for best practices to mitigate these risks.

According to [rekt.news](https://rekt.news/leaderboard/), the top three of the leaderboard are all related to bridge exploit. All of the exploits would not have been possible if they had used an optimistic bridge, even if all of the keys were compromised.

## Business Model

The router’s primary business model is to provide liquidity in exchange for a trading fee. The trading fee is hard-coded at five basis points (0.05%) per transaction.

Formula: `Trading fee = Volume * 0.0005` 

From the beginning of March to late April, the Connext Network made around $20,000,000 of volume per week; this gave the routers around $10,000 in trading fees. If in the future, as Connext’s userbase increases, the volume will also increase, which will benefit the routers directly. There is no impermanent loss for providing active LPs.

## Routers (Active) Vs. Stableswaps AMMs (Passive)

There are two types of liquidity providers in the Connext Network. Routers are called “active” liquidity providers, whereas Stableswaps AMMs are called “passive”. Routers or active LPs provide instant liquidity in the destination chain and then claim their funds back from the AMB bridge, as stated earlier. For active LPs, the users need to set up a router in order to provide liquidity and support the functioning of the network.

<p align="center">
  <img src="https://pbs.twimg.com/media/FT3JAOLWUAAs-xk?format=png&name=small" />
</p>

The reason for claiming the funds back from the AMB is because Connext Network uses an AMB as the settlement layer. The AMB locks assets on the sender chain (ex. DAI) and mints a representation of those assets on the destination chain (ambDAI). The process will work perfectly for chains that used AMB assets as their dominant token type, such as the Evmos chain (any IBC-connected chain in the future). When the user sends DAI and receives ambDAI in Evmos, they can instantly swap it on a DEX.

<p align="center">
  <img src="https://pbs.twimg.com/media/FT3JbcJWIAId0c2?format=jpg&name=small" />
</p>

**What if AMB Assets are not the adopted assets on that chain?**

Polygon chain, for example, the dominant representation of assets, comes from the Polygon official bridge. The representation of ETH on Polygon is PoSETH (they called it normal “ETH”). If we gave ambDAI to the users on Polygon, they would not be able to use them immediately as those assets are not the adopted assets. Therefore, we need to swap AMB assets to the adopted assets on that chain. This is where passive LPing comes in. 

Stableswaps AMMs (Automated Market Maker for assets that value tends to be pegged to each other) or passive LPs will be deployed on each chain. The Connext Network will automatically go through the AMM if they need to swap the assets type. The AMM will be a Curve-fork, and the LP providers will receive some fee based on the transaction size. Depending on the route, the flow might include 2 AMMs to convert the adopted asset types on one chain into madAssets and then reconverted back on the destination chain afterwards (mostly happens when bridging between EVM chains).

<p align="center">
  <img src="https://pbs.twimg.com/media/FT3N4swXEAU6yuu?format=jpg&name=small" />
</p>

> AMB Assets are the only assets that can be moved trustlessly across separate domains and chains through an AMB

***To conclude, there are two types of LPs after the Amarok upgrade: active and passive. For active LP, it is the router that provides instant liquidity. For passive LP, the Stableswap AMM converts between AMB Assets (AMB token type) and adopted assets when necessary.***


## To understand more about Connext, please read:

1. [Solving the Liquidity Problem (Medium)](https://blog.connext.network/solving-the-liquidity-problem-88bde201501)
2. [The Interoperability Trilemma (Medium)](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17)
3. [Optimistic Bridges (Medium)](https://blog.connext.network/optimistic-bridges-fb800dc7b0e0)
4. [Announcing the Amarok Network Upgrade (Medium)](https://blog.connext.network/announcing-the-amarok-network-upgrade-5046317860a4)
5. [A summary of how the Connext Network work. (Twitter Thread)](https://mobile.twitter.com/ConnextNetwork/status/1530611831785541632)
6. [Modular Interoperability - Layne Haber (Youtube)](https://www.youtube.com/watch?v=pnw6x_v0iiY)
7. [Trustless Two-Way Bridges With Side Chains By Halting (ETHResearch)](https://ethresear.ch/t/trustless-two-way-bridges-with-side-chains-by-halting/5728)
