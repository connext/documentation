---
sidebar_position: 1
id: my-home-doc
slug: /
---

# 👋 Welcome!

Connext is the interoperability protocol of L2 Ethereum.

You can use Connext to send transactions of value or calldata across chains and/or rollups. Unlike most other interoperability systems, Connext enables this *without* introducing any new trust assumptions or external validators.

:::note
These docs specifically refer to [ntxp](https://github.com/connext/nxtp), a new protocol currently in testing by the Connext team that will replace the existing [Vector](https://github.com/connext/vector) system for crosschain transactions. To see the old Vector docs, click here. Nxtp will be live on mainnet very soon!
:::

Note that the current version of Connext cannot be used pass arbitrary event data between chains (i.e. prove to chain B that something occurred on chain A) as this cannot be done in a trust-minimized way in the evm except via existing rollup bridges. 

This means that cases like **migrating** a token from chain A to chain B are not supported - you can instead only swap/transact over liquidity that already exists on the chain.

## Contents

These docs contain information for developers integrating Connext and liquidity providers. If you're interested in contributing to the development of the system, check out the READMEs in our [core implementation repo](https://github.com/connext/nxtp).

### [Background](./background/faq)

The background section covers high level information about crosschain interoperability and how **nxtp**, the protocol underlying Connext, works.

### [Developers](./developers/getting-started)

The developers section includes how to get started with integrating the Connext SDK in a browser/server environment, as well as how a lower level contract integration would work.

### [Routers](./router/intro)

Routers are offchain nodes that provide liquidity and coordinate to facilitate interactions between chains. This section covers the basics of configuring and operating a router.

---

Don't know where to start? Come say hi in our [community chat](https://chat.connext.network)!