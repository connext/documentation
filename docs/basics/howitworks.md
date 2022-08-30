---
sidebar_position: 2
---

# How it works

This iteration of Connext's network utilizes [nxtp](https://github.com/connext/nxtp) and routers as the liquidity and transport layers of the stack. We're building an interim AMB solution to provide generalized crosschain messaging, and will continue monitoring the situation in the future to upgrade to a fully fledged optimistic bridge solution. All to achieve Modular Interoperability with crosschain communication.

## Core Flow

<img src="/img/developers/connext_flow.png" alt="connext full flow summary" width="1000"/>

A transaction flowing through Connext will have the following lifecycle:

- User will initiate the transaction by calling an `xcall` function on the Connext contract, passing in funds, gas details, arbitrary data, and a target address object (includes chain info). 
  - *Note: `xcall` is meant to mimic solidity's lower level call as best as possible.*

- The Connext contracts will:
  - If needed, swap the passed in token to the AMB version of the same asset.
  - Call the AMB contracts with a hash of the transaction details to initiate the 60 minute message latency across chains.
  - Emit an event with the transaction details.

- Routers observing the origin chain with funds on the destination chain will:
  - Simulate the transaction (if this fails, the assumption is that this is a more "expressive" crosschain message that requires authentication and so must go through the AMB: the slow path).
  - Prepare a signed transaction object using funds on the receiving chain.
  - Post this object (a "bid") to the auctioneer.
  - *Note: if the router does not have enough funds for the transfer, they may also provide only part of the transfer's value.*
- The auctioneer will be observing all of the underlying chains. Every X blocks, the auctioneer will collect bids for transactions. The auctioneer will be responsible for selecting the correct router (or routers!) for a given transaction (can be random). The auctioneer will post batches of these bids to a relayer network to submit them to chain.
- When a given bid is submitted to chain, the contracts will do the following:
  - Check that there are enough funds available for the transaction.
  - Swap the router's AMB-flavored funds for the canonical asset of the chain if needed.
  - Send the swapped funds to the correct target (if it is a contract, this will also execute `calldata` against the target).
  - Hash the router's params and store a mapping of this hash to the router's address in the contract.
    - *At this point, the user's transaction has already been completed!*
- Later, when the slow path message arrives, a heavily batched transaction can be submitted to take all pending hashes received over the AMB and look up whether they have corresponding router addresses in the hash -> router address mapping. If they do, then AMB assets are minted and given to the router.
  - *Note: if the router gives the incorrect amount of funds to a user or if they execute the wrong calldata, then the router's param hash will not match the hash coming over the AMB and the router will not get reimbursed. This is the core security mechanism that ensures that routers behave correctly.*
  - *Note: Routers will take a 60 minute lockup on their funds when relaying transactions. While this theoretically reduces capital efficiency compared to the existing system, in practice the lack of need to rebalance will mean that routers have more capital available more often regardless.*
