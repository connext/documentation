---
sidebar_position: 2
---

# Background Info

## How do they work?

1. Routers will observe all chains in which they supply liquidity. When they detect an `xcall` transfer with assets that match their provided liquidity, they will simulate the transaction on destination, and if passed, bid on the transfer. They send bids to the sequencer, an offchain agent that randomly assigns router bids with transfers, and an auction begins. The sequencer is able to combine multiple routers' bids if the transfer amount cannot be fulfilled by any single router's liquidity.

2. The sequencer collects the router’s bids in every X block and selects the router(s) to fulfill the user’s transaction. 

3. Once the auction period is over, the sequencer will group all bids and send them to a relayer network for on-chain submission to the destination chain. The transaction will: 

    - Check whether the funds are enough for the transaction, 
    - If needed, swap the bridge token to the `adopted` asset of the chain.
    - Send the funds to the correct target (including executing `calldata` if the target is a contract). At this point, the target will receive the funds on the destination chain.

4. Routers will have effectively "fronted" the destination funds to the target. They now wait out the latency period for the AMB message to be fully validated. Once elapsed, the bridge will "reconcile" the routers' funds by minting them assets.

## Security Assumptions and Risks

### Security Assumptions

Optimistic bridges differ from externally verified bridges. After the data have been posted to the destination chain, there will be a fraud delay window for any watcher to prove the validity of the transaction. If any watcher can prove fraud on the origin chain, the original funds will be slashed and transferred to the disputed watcher instead.

Optimistic bridges use a single honest verifier assumption. This means that it requires only 1 of N verifiers in the system to verify and update cross-chain data correctly.
In other words, the cost to attack an optimistic bridge with N verifiers equals the cost to corrupt or hack N verifiers. As a result, assuming the underlying chains are secure, no amount of money can guarantee that a hack or an attack will be successful.

### Risks

1. Brute force attack on the router's Admin Token. (The Admin Token is used by routers to authenticate requests made to the Router's REST API endpoint.)
2. If the Docker Router image and VM has a direct connection to the Internet, the router's API endpoint is susceptible to being exposed externally.
3. The sequencer collects bids from the routers and chooses a router to fulfill the transaction request. The system will be down if sequencer downtime occurs.
4. With fraud-proof, funds can be delayed if any watcher can prove a fraudulent transaction within the fraud window. So, the router will have to wait for the funds until the disputed watcher is resolved.
5. Router's private key is leaked and liquidity withdrawn from router's wallet.

Refer to [security.md](https://github.com/connext/documentation/blob/main/docs/routers/security.md) and [router community call](https://www.youtube.com/watch?v=rjNcdm1mjCQ) for best practices to mitigate these risks.

## Business Model

The router’s primary business model is to provide liquidity in exchange for a trading fee. The trading fee is hard-coded at five basis points (0.05%) per transaction.

Formula: `Trading fee = Volume * 0.0005` 

From the beginning of March to late April, the Connext Network made around $20,000,000 of volume per week; this gave the routers around $10,000 in trading fees. If in the future, as Connext’s userbase increases, the volume will also increase, which will benefit the routers directly. There is no impermanent loss for providing active LPs.

## Routers (Active) Vs. Stableswaps AMMs (Passive)

There are two types of liquidity providers in the Connext Network. Routers are called “active” liquidity providers, whereas Stableswaps AMMs are called “passive”. Routers or active LPs provide instant liquidity in the destination chain and then claim their funds back from the AMB bridge, as stated earlier. For active LPs, the users need to set up a router in order to provide liquidity and support the functioning of the network.

<p align="center">
  <img src="/img/routers/modular_architecture.png" />
</p>

The reason for claiming the funds back from the AMB is because Connext Network uses an AMB as the settlement layer. The AMB locks assets on the sender chain (ex. DAI) and mints a representation of those assets on the destination chain (ambDAI). The process will work perfectly for chains that used AMB assets as their dominant token type, such as the Evmos chain (any IBC-connected chain in the future). When the user sends DAI and receives ambDAI in Evmos, they can instantly swap it on a DEX.

**What if AMB Assets are not the adopted assets on that chain?**

Polygon chain, for example, the dominant representation of assets, comes from the Polygon official bridge. The representation of ETH on Polygon is PoSETH (they called it normal “ETH”). If we gave ambDAI to the users on Polygon, they would not be able to use them immediately as those assets are not the adopted assets. Therefore, we need to swap AMB assets to the adopted assets on that chain. This is where passive LPing comes in. 

Stableswaps AMMs (Automated Market Maker for assets that value tends to be pegged to each other) or passive LPs will be deployed on each chain. The Connext Network will automatically go through the AMM if they need to swap the assets type. The AMM will be a Curve-fork, and the LP providers will receive some fee based on the transaction size. Depending on the route, the flow might include 2 AMMs to convert the adopted asset types on one chain into madAssets and then reconverted back on the destination chain afterwards (mostly happens when bridging between EVM chains).

<p align="center">
  <img src="/img/routers/LPs.png" />
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