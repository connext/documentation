---
sidebar_position: 1
id: "what-is-a-bridge"
---

# What is a Bridge?

A bridge (AKA crosschain messaging protocol or interoperability network) is a system that relays information between blockchains.

While there are many bridges out there today, every bridge has the same core structure and components.

| **Layer**    | **Function**                                                                                                      |
|--------------|-------------------------------------------------------------------------------------------------------------------|
| Transport    | Read root or hash of data on origin chain and post to destination.                                                |
| Verification | Ensure that the above data is correct.                                                                            |
| Execution    | Generate merkle roots or hashes on origin. Prove against the root and execute the target function on destination. |
| Application  | Handle specific usecases such as token transfers, NFTs, governance, and more!                                     |

## Messaging Layers

### Transport

The transport layer sends a message from the origin blockchain to the destination blockchain.

To describe it in terms of more traditional systems, imagine that you are maintaining a database that collects data from an external API such as google maps or the washington post. To do this, you will poll the external databse periodically (say every few seconds) and post any changes to your internal database. In the transport layer of a bridge, a node on the destination chain acts as the application that is collecting data. They collect data by periodically checking the origin chain for new queued transactions, and pulling the new data and then "storing" it on the destination chain.

Typically, this is done by actors that are running nodes on both chains. 

### Verification

The verification layer is the trickiest layer to both describe and design. While it is fairly straightforward to poll an origin chain for new data and then post it to a destination chain, it is not at all simple to verify that the polled data is actually correct. The problem is that in many cases, both the origin chain and the destination chain are decentralized networks, and therefore the claim of a signular node is not trustworthy.

To understand this better, we will use a non-technical analogy.
Imagine that there are two communities of people, community A and community B. Each community has a history spanning thousands of years, and in those thousands of years they have developed a strong folklor, mythology, and set of shared values and truths. However, they have never written these things down on a shared document.

Now a member of community B wants to know something about an event that occured in community A's past. So they travel to where community A lives, befriend somebody and ask them about that event. Can the person from community B trust the person from community A to tell the truth?

A good verification layer needs to figure out how to find out the truth from a collection of independent parties who are not necessarily trustworthy. Unfortunately, in the case of bridging, the person from community A will be highly incentivized to lie. Obviously, the more people you ask, the easier it is to know what is true and what is not. But asking too many people will take too long, so there is an inherent tradeoff between scalability and security. 

Connext masterfully sidesteps this issue by using game-theoretic techniques that switch the incentive structure so that nodes on the origin chain are incentivized to tell the truth, and other nodes are incentivized to report bad behavior. See Message Verification for a longer discussion about this step.

### Execution

One a message as been sent to the destination chain and verified, it needs to be processed by a smart contract on the destination chain, that is specified in the meta-data of the transaction. This happens in the execution layer. 

Bridge execution layers are the interface that developers will typically interact with when integrating with a bridge. Execution layers collect gas fees (in Connext, this is collected as additional gas paid on the origin chain) and use those fees to execute a transaction on the destination chain against the target function the developer intends to interact with.

Execution layers may additionally be responsible for generating merkle roots on each origin domain, and then generating a merkle proof against that root on a destination domain.

## Application Layers

In addition to the above messaging layers, bridges may implement one or many **application layers** that define how specific usecases are enabled across domains.

