---
sidebar_position: 1
---

# Checklist for Running a Router

- [Spin up the router](./spinning-up) and [configure](./configuration) for testnets.
- [Provide Liquidity](./providing-liquidity) and gas fees on testnets.
- Test the router on testnets.
- Change configuration to mainnets (use a different mnemonic!), or spin up a new mainnet router.
- Provide liquidity on mainnets.
- [Monitor router logs](./spinning-up#view-logs) and [Grafana](./spinning-up#grafana-dashboard).
- Make sure to fill with gas when it's low!.

# Information about Connext Router

## 1. Who are Routers?

Routers are the most important link between users because they can get their tokens on the right network in the shortest possible time. Router accepts tokens on one network and then transmits when tokens from that network arrive to the person in need. 

## 2. Why Connext needs Router?

There are so many reasons why a router system is used. 

 - The main reason is the fact that, thanks to the concept of routers, the user does not have to worry that their tokens might get lost. The router has no ability to think. Its main task is to receive tokens and redirect the requested token when possible. It is incapable of doing much of anything.
 - The next but not least important factor is the liquidity that Router provides. With assets in its account, users can redirect their tokens to any network that the bridge supports. This saves a large amount of time and also allows the user to stay in the DeFi zone.
 - It is also worth noting that with more than 100 routers, the project is not prone to a complete shutdown due to evenly distributed power. 

## 3. Security assumptions and risks

All kinds of situations and problems are possible in life. Let's look at some of the problems.

 - Problems with the explorer, which has some deficiencies with its speed of perception and processing of information (the team works on this)

 - There is a possibility of a power drop due to some percentage of the routers malfunctioning. Even in spite of this, the service will still work, albeit not very fast.

 - A malfunction of one of the networks supported by the bridge may result in difficulties in operating such a network (this is a factor independent of Connext that you should be aware of anyway).

 - Compromise by one or more routers. This is almost impossible to foresee, but it cannot stop the whole service from working.

## 4. Business model

The main motivations that are close to the Connext team can be described as follows

 - Developing the DeFi sector as well as ensuring security within it

 - Attracting developers into cryptocurrency, by promoting their own product

 - Implementing cross-chain swaps in order to interact with different networks in the shortest possible time.
