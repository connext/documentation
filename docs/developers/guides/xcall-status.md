---
sidebar_position: 1
---

# Tracking xCalls

Every `xcall` is associated with a unique `transferId` that can be used to track its lifecycle through a cross-chain transaction.

## Querying Subgraphs

You can query the hosted subgraphs on each chain to check the transaction status.

| Chain | Subgraph |
| --- | --- |
| Goerli | [v0-Goerli](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-goerli) |
| Optimism-Goerli | [v0-Opt-Goerli](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-opt-goerli) |
| Mumbai | [v0-Mumbai](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-mumbai) |

1. Make note of the transaction hash that interacted with the Connext contract.

2. Navigate to the hosted subgraph for the origin domain and query by the transaction hash.

  ```graphql
  {
    originTransfers(
      where: {
        transactionHash: "<TRANSACTION_HASH>"
      }
    ) {
      # Meta Data
      chainId
      //highlight-next-line
      transferId
      nonce
      to
      callData
      originDomain
      destinationDomain
      # Asset Data
      asset {
        id
        adoptedAsset
        canonicalId
        canonicalDomain
      }
      bridgedAmt
      status
      transactionHash
      timestamp
    }
  }
  ```
        
3. Navigate to the hosted subgraph for the destination domain and query by the `transferId` obtained from the origin domain subgraph.

  ```graphql
  {
    destinationTransfers(
      where: {
        transferId: "<XCALL_TRANSFER_ID>"
      }
    ) {
      # Meta Data
      chainId
      transferId
      nonce
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
      //highlight-next-line
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
    }
  }
  ```

4. If there was a nested `xcall` involved on the destination side, the `executedTransactionHash` from step 3 can be used as the *new* origin-side transaction hash. To trace the nested `xcall`, go back to step 1 using this `executedTransactionHash` but instead consider the current destination domain as the origin domain.

## Connextscan

Another option is using [Connextscan](https://testnet.amarok.connextscan.io/) which can monitor the status of any `transferId`.
