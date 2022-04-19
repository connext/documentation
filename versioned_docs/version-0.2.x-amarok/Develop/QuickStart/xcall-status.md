---
sidebar_position: 3 
---

# Tracking an xcall

Note: We will be building additional utilities to make tracking the full flow of `xcall`s easier in the near future. 

## Querying Subgraphs

For now, we recommend querying the hosted subgraphs on each chain to check on transaction status.

- Make note of the transaction hash that interacted with the Connext contract
- Navigate to the [hosted subgraph for sending chain](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-kovan) (Kovan)
    - Query by your transaction hash
        
        ```graphql
        {
          transfers(
            where: {
              xcalledTransactionHash: "<your-transaction-hash>"
            }
          ) {
            transferId
            xcalledCaller
            xcalledLocalAsset
            xcalledLocalAmount
            xcalledTransactingAsset
            xcalledTransactionHash
            # other fields if desired
          }
        }
        ```
        
- Navigate to the [hosted subgraph for receiving chain](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-rinkeby) (Rinkeby)
    - Query by the transferId obtained from the sending chain subgraph
        
        ```graphql
        {
          transfers(
            where: {
              transferId: "<transferId>"
            }
          ) {
            executedCaller
            executedTransactingAmount
            executedLocalAmount
            executedTransactingAsset
            executedLocalAsset
            executedTransactionHash
            executedTimestamp
            executedGasPrice
            executedGasLimit
            executedBlockNumber
            reconciledCaller
            reconciledLocalAsset
            reconciledLocalAmount
            reconciledTransactionHash
            reconciledTimestamp
            reconciledGasPrice
            reconciledGasLimit
            reconciledBlockNumber
            # other fields if desired
          }
        }
        ```
