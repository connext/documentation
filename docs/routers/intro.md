---
sidebar_position: 2
---


# Introduction

## What are Routers?

Routers are one of the two types of liquidity providers in the Connext Network. They are called “active” LP providers, whereas Stableswaps AMMs are called “passive”. The router’s role is essential; to provide instant liquidity for the user in the destination chain. They are given a fee based on the transaction size. Routers then claim the spent fund from Nomad afterwards; to specify, they can claim after Nomad’s latency period ends ([30 minutes](https://medium.com/offchainlabs/fighting-censorship-attacks-on-smart-contracts-c026a7c0ff02)).

## Why do we need them in Connext

Routers are the backbone of the Connext Network. After the Amarok Network upgrade, how routers operate changed significantly. In the previous version, routers will lock up their funds on the destination chain and be rewarded with the user’s fund on the sender chain. This mechanism causes [problems](https://blog.connext.network/announcing-the-amarok-network-upgrade-5046317860a4) such as liquidity rebalancing and strict liveness. Here comes the Amarok upgrade; modular Interoperability can be achieved with the help of Nomad, a cross-chain communication protocol. The user initiates the transaction by calling the `xcall` function on the Connext contact, which will include: passing in funds, gas details, arbitrary data, and a target address  (including the chain info, and this can be a contact). The Connext contact will, if needed, swap the user’s fund to match the Nomad’s token type and call the Nomad contact to start the 30-60 minutes message latency across chains. Observing routers with funds on the user destination chain will simulate the transaction; if passed, they will use their funds to sign the transaction and send it to an auctioneer (Sequencer); this is a kind of bidding. The auctioneer collects the router’s bids in every X block and selects the correct router(s) to fill in the user’s transaction. Then the auctioneer will group all bids and send them to a relayer network for submitting them on-chain. The contact then 1) checks the whether the fund is enough for the transaction, 2) if needed, swaps the Nomad’s token type to match the canonical asset of the chain, and 3)  lastly, sends the fund to the correct target (including executing `calldata` against the target contact). At this point, the user will receive their fund on the destination chain. For routers, this is not finished. After  30-60 minutes and the Nomad message arrives, the heavily batched transaction hashes will be checked for their corresponding router addresses. If matched, Nomad assets are minted and paid back to the routers.

## Security Assumptions and Risks

## Business Model

The router’s primary business model is to provide liquidity in exchange for a trading fee. Currently, the trading fee is set at five basis points (0.05%) per transaction. `Trading fee = Volume * 0.0005` From the beginning of March to late April, the Connext Network made around $20,000,000 of volume per week; this gave the routers around $10000 in trading fees. If in the future, as Connext’s userbase increases, the volume will also increase, which will benefit the routers directly. 
