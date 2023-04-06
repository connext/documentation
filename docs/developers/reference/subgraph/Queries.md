---
sidebar_position: 3
title: Sample Queries
---

## Sample Queries

Below are some sample queries you can use to gather information from the Connext contracts.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Get origin domain details of an xcall

```graphql
query OriginTransfer {
  originTransfers(
    where: {
      # Query by the transaction hash of the xcall
      transactionHash: "<TRANSACTION_HASH>",
      # Or by the xcall's transfer ID
      transferId: "<TRANSFER_ID>"
    }
  ) {
    # Meta Data
    chainId
    nonce
    transferId
    to
    delegate
    receiveLocal
    callData
    slippage
    originSender
    originDomain
    destinationDomain
    transactionHash
    bridgedAmt
    status
    timestamp
    normalizedIn
    # Asset Data
    asset {
      id
      adoptedAsset
      canonicalId
      canonicalDomain
    }
  }
}
```

### Get destination domain details of an xcall

```graphql
query DestinationTransfer {
  destinationTransfers(
    where: {
      transferId: "<TRANSFER_ID>"
    }
  ) {
    # Meta Data
    chainId
    nonce
    transferId
    to
    callData
    originDomain
    destinationDomain
    delegate
    # Asset Data
    asset {
      id
    }
    bridgedAmt
    # Executed event Data
    status
    routers {
      id
    }
    originSender
    # Executed Transaction
    executedCaller
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    # Reconciled Transaction
    reconciledCaller
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
    routersFee
    slippage
  }
}
```
