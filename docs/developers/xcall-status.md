---
sidebar_position: 6
---

# Tracking an xcall

Note: We will be building additional utilities to make tracking the full flow of `xcall`s easier in the near future. 

## Querying Subgraphs

For now, we recommend querying the hosted subgraphs on each chain to check on transaction status.

| Chain | Subgraph |
| --- | --- |
| Goerli | [v0-Goerli](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-goerli) |
| Optimism-Goerli | [v0-Opt-Goerli](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-opt-goerli) |

1.  Make note of the transaction hash that interacted with the Connext contract

2.  Navigate to the hosted subgraph for the sending chain
    - Query by your transaction hash
        
        ```graphql
        {
          originTransfers(
            where: {
              transactionHash: "<your_transaction_hash>"
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
            forceSlow
            receiveLocal
            recovery
            callback
            callbackFee
            # Asset Data
            transactingAsset
            transactingAmount
            status
          }
        }
        ```
        
3.  Navigate to the hosted subgraph for the receiving chain
    - Query by the transferId obtained from the sending chain subgraph
        
        ```graphql
        {
          destinationTransfers(
            where: {
              transferId: "<your_transfer_id>"
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
            forceSlow
            receiveLocal
            recovery
            callback
            callbackFee
            # Asset Data
            localAsset
            localAmount
            transactingAsset
            transactingAmount
            sponsorVaultRelayerFee
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
          }
        }
        ```
