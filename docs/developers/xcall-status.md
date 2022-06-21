---
sidebar_position: 3
---

# Tracking an xcall

Note: We will be building additional utilities to make tracking the full flow of `xcall`s easier in the near future. 

## Querying Subgraphs

For now, we recommend querying the hosted subgraphs on each chain to check on transaction status.

| Chain | Subgraph |
| --- | --- |
| Rinkeby | [v0-Rinkeby](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-rinkeby) |
| Goerli | [v0-Goerli](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-goerli) |

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
            status
            transferId
            caller
            to
            originDomain
            destinationDomain
            transactingAsset
            transactingAmount
            bridgedAsset
            bridgedAmount
            callData
            # other fields if desired
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
            status
            to
            originDomain
            destinationDomain
            transactingAsset
            transactingAmount
            localAsset
            localAmount
            executedCaller
            reconciledCaller
            callData
            # other fields if desired
          }
        }
        ```
