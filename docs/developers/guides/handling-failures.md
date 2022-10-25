---
sidebar_position: 5
id: handling-failures
---

# Handling Failed xCalls

There are a few failure conditions to watch out for when using `xcall`. 

## High Slippage

When tokens are bridged through Connext, slippage can impact the `xcall` during the swap on origin or destination. If slippage is too high on the origin swap, the `xcall` will just revert. If slippage is too high on the destination swap (after it has already gone through the origin swap), then the `delegate` has a choice to make. They can:
- Cancel the transfer and bridge back to origin (sender will lose any funds related to the origin slippage) [not available yet]
- Wait it out until slippage conditions improve (relayers will continuously re-attempt the transfer)
- Increase slippage tolerance by calling [`forceUpdateSlippage`](../reference/contracts/calls#forceupdateslippage)

## Reverts on Receiver Contract

If the call on the receiver contract (also referred to as "target" contract) reverts, the Connext bridge contract may unwillingly end up with custody of funds involved in the operation. The xApp developer should be aware that in these cases, those funds may be considered forfeit. To avoid these kinds of situations, developers should build any contract implementing `IXReceive` defensively. 

One way to guard against unexpected reverts is to use `try/catch` statements which allow contracts to handle errors on external function calls.

Ultimately, the goal should be to handle any revert-susceptible code and ensure that the logical owner of funds *always* maintains agency over them.
