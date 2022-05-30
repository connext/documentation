# Introduction

## What are Routers?

## Why do we need them in Connext

Routers play a crucial role in the Connext Network. When the user broadcasts transactions to transfer funds between chains, the routers respond by sending a sealed bid containing the price range and time to fulfil the user’s transaction. After that, the user submits another transaction to the contact called `TransactionManager`, which locks up the user’s funds on the sender chain. After detecting the transaction, the router then sends the same transaction on the receiving chain to the `TransactionManager` contact, which locks a corresponding amount of liquidity. The router’s locked liquidity is equal to the `sending amount - auction fee`; this makes the router to be incentivised and complete the transaction. The user signs a message which sends to a relayer who will receive some fee for submission. The relayer submits the signed message to the `TransactionManager` contact and claims the fund locked by the router. On the sending chain, the router also submits the signed message to the `TransactionManager` contract unlocking the original amount.
## Security Assumptions and Risks

## Business Model
