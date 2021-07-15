---
sidebar_position: 1
---

# Overview

This iteration of Connext's network utilizes [nxtp](https://github.com/connext/nxtp), a lightweight protocol for generalized crosschain transfers.

Nxtp is made up of a simple contract that uses a locking pattern to prepare and fulfill transactions, a network of offchain routers that participate in pricing auctions and pass calldata between chains, and a user-side sdk that finds routes and prompts onchain transactions.

## Transaction Lifecycle

![HighLevelFlow](/img/background/HighLevelFlow.png)

Transactions go through three phases:

1. **Route Auction:** User broadcasts to our network signalling their desired route. Routers respond with sealed bids containing commitments to fulfilling the transaction within a certain time and price range.
2. **Prepare:** Once the auction is completed, the transaction can be prepared. The user submits a transaction to `TransactionManager` contract on sender-side chain containing router's signed bid. This transaction locks up the users funds on the sending chiain. Upon detecting an event containing their signed bid from the chain, router submits the same transaction to `TransactionManager` on the receiver-side chain, and locks up a corresponding amount of liquidity. The amount locked on the receiving chain is `sending amount - auction fee` so the router is incentivized to complete the transaction.
3. **Fulfill:** Upon detecting the `TransactionPrepared` event on the receiver-side chain, the user signs a message and sends it to a relayer, who will earn a fee for submission. The relayer (which is typically another router) then submits the message to the `TransactionManager` to complete the user's transaction on receiver-side chain and claim the funds locked by the router. A relayer is used here to allow users to submit transactions with arbitrary calldata on the receiving chain without needing gas to do so. The router then submits the same signed message and completes transaction on sender-side, unlocking the original `amount`.

If a transaction is not fulfilled within a fixed `expiry`, it reverts and can be reclaimed by the party that called prepare on each chain (initiator). Additionally, transactions can be cancelled unilaterally by the person owed funds on that chain (router for sending chain, user for receiving chain) prior to `expiry`.

It is important to note that neither participant should require a store to complete these transactions. All information to `prepare`, `fulfill`, or `cancel` transactions should be retrievable through contract events.

## Architecture

![Architecture](/img/background/Architecture.png)

The system contains the following pieces:

- Contracts - hold funds for all network participants, and lock/unlock based on data submitted by users and routers
- Subgraph - enables scalable querying/responding by caching onchain data and events.
- TxService - resiliently attempts to send transactions to chain (with retries, etc.)
- Messaging - prepares, sends, and listens for message data over nats
- Router - listens for events from messaging service and subgraph, and then dispatches transactions to txService
- SDK - creates auctions, listens for events and creates transactions on the user side.