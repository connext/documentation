---
sidebar_position: 4
id: xcall-status
---

# Tracking xCalls

Every `xcall` is associated with a unique `transferId` that can be used to track its lifecycle through a cross-chain transaction.

## Querying Subgraphs

You can query the hosted subgraphs on each chain to check the transaction status.

<details>

  <summary>Mainnet Subgraphs</summary>

| Chain | Subgraph |
| --- | --- |
| Ethereum | [v0-Mainnet](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-mainnet) |
| Optimism | [v0-Optimism](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-optimism) |
| Arbitrum | [v0-Arbitrum](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-arbitrum-one) |
| Polygon | [v0-Polygon](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-polygon) |
| Binance Smart Chain | [v0-Bnb](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-bnb) |
| Gnosis | [v0-Gnosis](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-gnosis) |

</details>

<details>

  <summary>Testnet Subgraphs</summary>

| Chain | Subgraph |
| --- | --- |
| Goerli | [v0-Goerli](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-goerli) |
| Optimism-Goerli | [v0-Opt-Goerli](https://thegraph.com/hosted-service/subgraph/connext/amarok-runtime-v0-opt-goerli) |
| Mumbai | [v0-Mumbai](https://thegraph.com/hosted-service/subgraph/connext/nxtp-amarok-runtime-v0-mumbai) |

</details>

1. Make note of the transaction hash that interacted with the Connext contract.

2. Navigate to the hosted subgraph for the origin domain and query by the xcall's transaction hash or the transfer ID.

  ```graphql
  query originTransfer {
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
      to
      delegate
      receiveLocal
      callData
      slippage
      relayerFee
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
        
3. Navigate to the hosted subgraph for the destination domain and query by the `transferId` obtained from the origin domain subgraph.

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

4. If there was a nested `xcall` involved on the destination side, the `executedTransactionHash` from step 3 can be used as the *new* origin-side transaction hash. To trace the nested `xcall`, go back to step 1 using this `executedTransactionHash` but instead consider the current destination domain as the origin domain.

## Connextscan

Another option is using [Connextscan](https://testnet.connextscan.io/) to track the status of any `transferId`.

In the top right search box, enter the `transferId` of interest.

<img src="/img/guides/connextscan_search.png" alt="Connextscan Search" width="400px"/>

Connextscan will pull up current status of the associated `xcall`. This is what it looks like when a transfer is complete.

<img src="/img/guides/connextscan_complete.png" alt="Connextscan Search"/>


## XCall Status

<table>
  <tbody>
    <tr>
      <th>Status</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        XCalled
      </td>
      <td>
        Transaction has been initiated on origin.
      </td>
    </tr>
    <tr>
      <td>
        Executed
      </td>
      <td>
        Funds have been delivered and calldata executed on destination, if applicable. If this happens before Reconciled, then this was a fast path transfer (non-authenticated).
      </td>
    </tr>
    <tr>
      <td>
        Reconciled
      </td>
      <td>
        Funds have been reimbursed to routers. If this happens before Executed, then this was a slow path transfer (authenticated).
      </td>
    </tr>
    <tr>
      <td>
        CompletedFast
      </td>
      <td>
        Transaction has been Executed and then Reconciled.
      </td>
    </tr>
    <tr>
      <td>
        CompletedSlow
      </td>
      <td>
        Transaction has been Reconciled and then Executed.
      </td>
    </tr>
  </tbody>
</table>
