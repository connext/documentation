---
sidebar_position: 1
id: "background"
---


# Bridge Taxonomy

## What is a Bridge?

A bridge (or interoperability network) is a system that relays assets and/or data between blockchains.

## The Bridging Landscape

One of the key challenges of blockchains & distributed systems is that they **always have tradeoffs.**

For bridges, historically this has meant that bridges must navigate compromises between:

1. **Trust-minimization:** The system does not introduce new trust/security assumptions beyond those of the underlying domains.
2. **Generalizeability:** The system supports passing around arbitrary data and not just funds.
3. **Extensibility:** The system can be deployed without lots of custom work for a variety of different types of underlying domains.
4. **Latency:** How quickly the data is delivered to the destination domain.

We can classify all bridges by their properties/tradeoffs:

### Externally Verified Bridges

![Externally Verified](/img/core-concepts/external.png)

Externaly verified protocols rely on an external set of validators to relay data between chains. This is typically represented as an MPC system, oracle network, or threshold multisig.

These systems have low latency, support arbitrary data passing, and are easily portable between domains but you are now trusting the bridge verifiers to secure your system.

### Natively Verified Bridges

![Natively Verified](/img/core-concepts/native.png)

Natively verified protocols are ones where all of the underlying chains’ own verifiers are fully validating data passing between chains. Typically this is done by running a light client of one chain in the VM of another chain and vice versa.

These systems are the most trust-minimized systems as they rely directly on domain validators for security, support arbitrary data, and have low latency. However, because the implementation of these systems is so deeply tied with consensus, they require custom implementations for each domain.

### Locally Verified Bridges

![Locally Verified](/img/core-concepts/local.png)

Locally verified protocols are ones where only the parties involved in a given cross-domain interaction verify the interaction. Locally verified protocols turn the complex n-party verification problem into a much simpler set of 2-party interactions where each party verifies only their counterparty. This model works so long as both parties are economically adversarial — i.e. there’s no way for both parties to collude to take funds from the broader chain.

These protocols are fast, extensibile, and trust-minimized but cannot support arbitrary messages due to their adversarial nature. An NFT, for instance, would not be able to be 1:1 backed by a counterparty.

### Optimistic Bridges

![Optimistic Bridges](/img/core-concepts/optimistic.png)

Optimistic bridges, similar to optimistic rollups, use **fraud proofs** to ensure the validity of data relayed across chains. Every message that passes through an optimistic bridge remains in a “pending” state during the dispute window until it is considered valid. During this time, **watchers** can dispute the message if the data is incorrect.

While slow, these protocols are extensible, generalizable, and trust-minimmized.

💡 Learn more:

[The Interoperability Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17)

[Optimistic Bridges](https://blog.connext.network/optimistic-bridges-fb800dc7b0e0)

[​​Validity Proofs Are Not Effective for Bridging Blockchains](https://blog.connext.network/validity-proofs-are-not-effective-for-bridging-blockchains-85b5e3b22a35)

