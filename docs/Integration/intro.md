---
sidebar_position: 1
id: my-home-doc
slug: /
---

# 👋 Welcome!

Connext is the interoperability protocol of L2 Ethereum.

You can use Connext to send transactions of value or calldata across chains and/or rollups. Unlike most other interoperability systems, Connext enables this *without* introducing any new trust assumptions or external validators.

:::note
These docs specifically refer to [nxtp](https://github.com/connext/nxtp), a new protocol currently in testing by the Connext team that will replace the existing [Vector](https://github.com/connext/vector) system for crosschain transactions. To see the old Vector docs, [click here](https://vector-docs.connext.network/). Nxtp will be live on mainnet very soon!
:::

Note that the current version of Connext cannot be used pass arbitrary event data between chains (i.e. prove to chain B that something occurred on chain A) as this cannot be done in a trust-minimized way in the evm except by incurring the 1-week exit window of existing rollup bridges. 

This means that cases like **migrating** a token from chain A to chain B are not supported - you can instead only swap/transact over liquidity that already exists on the chain.

## Contents

These docs contain information for developers integrating Connext and liquidity providers. If you're interested in contributing to the development of the system, check out the READMEs in our [core implementation repo](https://github.com/connext/nxtp).

#### [Quick Start](./Integration/QuickStart/setup)

Want to get started with crosschain interactions in your dApp right away? We step through the E2E integration flow in our Quick Start guide.

#### [System Overview](./Integration/SystemOverview/faq)

The System Overview section covers high level information about crosschain interoperability and how **nxtp**, the protocol underlying Connext, works.

#### [Guides](./developers/getting-started)

Guides are coming soon! We'll cover common workflows like calling a contract across chains and tips for UX!

#### [API Reference](./APIReference/sdkAPI)

API Reference is also coming soon!

---

Don't know where to start? Come say hi in our [community chat](https://chat.connext.network)!
