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

Currently, all fees associated with executing a crosschain transaction are levied as follows:

_Sending Chain Fee_: This is the transaction fee on the sending chain for initiating a crosschain transaction. It is configured by the dapp and the user's wallet provider and charged in the native asset of the origin chain.

_Router Fee_: This is the fee taken by router operators for facilitating the transaction. It is designed to be enough to cover the gas costs of the router and give an incentive (currently 0.05% of transaction size) for providing the liquidity. The fee is charged by taking the difference between what the user deposits on the sending chain, and what the router provides on the destination chain.

_Receiving Chain Fee_: This is paid depending on how the transaction is sent. If a user sends it themselves, then the costs are in the native asset of the receiving chain (the gas fee associated with any onchain transaction). If the transaction is sent via relayers, then the cost comes out of the asset you receive (i.e. the USDC relayer fee is deducted from the amount the router put up for you on the destination chain).


Check out our [How it Works](./howitworks) and [Security Model](./securitymodel) sections!

### How does Connext compare to XYZ interoperability solution?

Check out [Connext vs XYZ](./connextvsxyz) section!

### Why is Connext an authority on L2s and interoperability?

We started Connext in 2017, and have been a core part of the L2 research community since we built the first general-purpose L2 payment system in 2018. Our work on state channel systems has led us to think deeply about how users can seamlessly transfer funds between rollups, and we built a system that presented the best set of tradeoffs for enabling interactions between rollups.

In the Amarok network upgrade, we brought Connext's cross-chain functionality and usability to the next level.

### Is Connext live on mainnet?

Yes! Connext's NXTP protocol is live and you can see the live status of the network on the community-built [Connext Explorer](https://connextscan.io/).

As for the Amarok network upgrade, it is currently live on [testnet](../Guides/testing-against-testnet.md) and we have plans to bring it to mainnet soon!

### Where can I try Connext?

There are a number of projects and protocols building on top of Connext. We expect to have a community-maintained list of them soon . For now, we recommend checking out the [Connext Bridge](https://bridge.connext.network), a simple UI for bridging across chains.