---
sidebar_position: 5
---

# FAQ

## General

### Does Connext have a token?

No. Connext does not have a token at this time. Any references to a Connext token out there are definitely scams.

### Is Connext an exchange (or other dApp)?

No. Connext is a protocol made up of many independent liquidity/infrastructure providers (called **routers**) that enables communication between chains. Developers can build natively crosschain applications like DEXs on top of Connext.

### Does Connext have access to my funds?

No. Neither the Connext founding team, nor any routers running Connext's protocols have any form of access to your funds. Because of how Connext is designed, the security of the system is the same as the security of the underlying blockchain -- even if every single router in our network were to collude with each other, there would be no way for them to access your funds.

### Are there any fees to use Connext?

Fees are charged by routers within the network when users send transactions. The Connext team is only a protocol implementer and so does not charge any fees.

### Is Connext audited?

Yes! You can see our audits at https://audits.connext.network.

### How does Connext work?

Check out our protocol background section (TODO) to understand the system's security model.

### How does Connext compare to XYZ interoperability solution?

Check out our interop background section (TODO) to understand how Connext compares to other systems.

### Why is Connext an authority on L2s and interoperability?

We started Connext in 2017, and have been a core part of the L2 research community since we built the first general-purpose L2 payment system in 2018. Our work on state channel systems has led us to think deeply about how users can seamlessly transfer funds between rollups, and we believe that the current iteration of Connext presents the best set of tradeoffs for enabling interactions between rollups.

### Is Connext live on mainnet?

Connext has been live with its interoperability network since January 2021. Note that Connext is currently in the process of a network upgrade to use [a new protocol](https://github.com/connext/nxtp). These docs are specifically targeted at the new system, which will be live on mainnet soon.

### Where can I try Connext?

There are a number of projects and protocols building on top of Connext. We expect to have a community-maintained list of them soon . For now, we recommend trying the [nxtp testnet demo](https://nxtp.li.finance), a simple UI built by our friends at LiFi to showcase transferring funds across chains.