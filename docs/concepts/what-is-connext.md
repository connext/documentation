---
sidebar_position: 1
id: what-is-connext
---

# What is Connext?

:::info 
The Core Concepts section is still under development!
:::

Welcome! 👋

Connext is a modular protocol for securely passing funds and data between chains. Developers can use Connext to build crosschain apps (**xApps**) - applications that interact with multiple domains (blockchains and/or rollups) simultaneously.

## Why Do We Need xApps?

Blockchains do not scale to the level of volume needed for mainstream adoption.

Ethereum and other programmable blockchains solve this problem by [moving users, funds, and data to multiple parallel domains](https://ethereum.org/en/layer-2/) (sidechains, rollups, and other chain-like constructions). This, however, creates a new challenge: a *fragmented* user experience.

Similar to how Youtube users do not need to understand Google's distributed database infrastructure, decentralized application users should not need to consciously think about what chain they are on, or how to move between chains. In other words, applications should *abstract* the multichain experience by becoming xApps, and do so while retaining the security and trust-minimization properties of the underlying chains.

## Design Philosophy

Connext is built with three core design principles in mind that make it the best option for developers looking to build xApps without compromising on trustlessness.

### Modularity

Connext utilizes a modular hub-and-spoke architecture, which derives its security from Ethereum L1 and *plugs into* the battle-tested **canonical** messaging bridges that underpin the security of of each Ethereum-connected domain.

Messages in Connext are added to a merkle root generated on each spoke domain, which are then optimistically aggregated into a singular root on Ethereum L1. In the event that fraud occurs, the system falls back to using the canonical messaging bridge for each chain ecosystem. In other words, a message passed between Polygon and Optimism is secured by a proof that is posted to Ethereum and verified by the Polygon PoS bridge and Optimism rollup bridge. Similarly, a message passed within the Cosmos ecosystem is verified by IBC.

This mechanism gives developers the **best possible** trust guarantees for whichever chains they want to build on. For fraud to occur in our Polygon to Optimism example, there would need to be a compromise of Polygon or Optimism's canonical bridges *and* Connext's failsafe mechanisms.

### Security

Bridges and crosschain messaging are some of the most critical infrastructure in the space, with a high potential risk for catastrophe in the event of hacks or bugs. In the past 18 months, almost **$2B** has been lost to bridge hacks.

Connext utilizes Watchers, automated offchain actors, that observe the network and halt message passing in the event that fraud or a hack is observed. This ensures that damage due to the failure of any individual part of the network is minimized.

Additionally, Connext follows a strict philosophy of secure development, requiring rigorous external review for code changes and working closely with the security community to educate auditors on bridge security risks and collaborate on creating best practices.

### Simplicity

Migrating to a completely new multichain development workflow can be challenging.

Rather than reinventing the wheel, Connext tries to mimic and extend existing development patterns as much as possible. The protocol implements a single, simple primitive - `xcall` - which allows devs to asynchronously interact with contracts living on another chain/rollup simlarly to how you would `call` a contract living on the same chain/rollup.

Connext additionally plugs into the tooling and supporting infrastructure that is *already* widely used in the ecosystem. Have a development workflow that isn't well supported by Connext? [Let us know](https://discord.gg/pef9AyEhNz) and our community can help build support for it!

## What Can I Build With Connext?

In short, pretty much anything! Here are some of the ideas that members of our community are working on:

- Executing the outcome of **DAO votes** across chains
- Lock-and-mint or burn-and-mint **token bridging**
- **Aggregating DEX liquidity** across chains in a single seamless transaction
- Crosschain **vault zaps** and **vault strategy management**
- **Lending funds** on one chain and borrow on another
- Bringing **UniV3 TWAPs** to every chain without introducing oracles
- **NFT bridging** and chain-agnostic NFT marketplaces
- **Storing data on Arweave/Filecoin** directly from within an Ethereum smart contract

## Where Do I Go Next?

If the above information was overwhelming, don't worry! We have plenty more resources to help you learn about Connext:
- If you're a developer and want to start building with `xcall`, check out our [Developer Quickstart](../developers/quickstart) and [Examples](../developers/examples/simple-bridge.md).
- Want to learn more about how the protocol works? Read through the [How Connext Works](./how-it-works/flow.md) section.
- Are you an infrastructure operator? Help run the network by [operating a Connext router](../routers/intro.md).
- Still not sure where to go? Join our [Discord](https://discord.gg/pef9AyEhNz) server and chat with us the `#dev-hub` channel.
