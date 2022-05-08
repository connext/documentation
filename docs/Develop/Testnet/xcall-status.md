---
sidebar_position: 4
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
          originTransfers(
            where: {
              transactionHash: <your-transaction-hash>
            }
          ) {
            transferId
            caller
            to
            originDomain
            destinationDomain
            transactingAsset
            transactingAmount
            bridgedAsset
            bridgedAmount
            # other fields if desired
          }
        }
        ```
        
- Navigate to the [hosted subgraph for receiving chain](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-rinkeby) (Rinkeby)
    - Query by the transferId obtained from the sending chain subgraph
        
        ```graphql
        {
          destinationTransfers(
            where: {
              transferId: "0x1435f4978e546819b4e072ece741880a11302bebf221116d7bea1b50a7fbde34"
            }
          ) {
            to
            originDomain
            destinationDomain
            transactingAsset
            transactingAmount
            localAsset
            localAmount
            executedCaller
            reconciledCaller
            # other fields if desired
          }
        }
        ```
