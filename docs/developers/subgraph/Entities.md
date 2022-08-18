---
sidebar_position: 2
title: Subgraph Entities


---

# Entities

- [`Asset`](#asset)
- [`AssetBalance`](#assetbalance)
- [`Router`](#router)
- [`OriginTransfer`](#origintransfer)
- [`DestinationTransfer`](#destinationtransfer)

# Asset

Description:

| Field           | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| id              | ID!     |                                                                      |
| local           | Bytes!  |                                                                      |
| adoptedAsset    | Bytes!  |                                                                      |
| canonicalId     | Bytes!  |                                                                      |
| canonicalDomain | BigInt! |                                                                      |
| blockNumber     | BigInt! | needed in case multiple locals are stored under the same canonicalId |

# AssetBalance

Description:

| Field  | Type    | Description |
| ------ | ------- | ----------- |
| id     | ID!     |             |
| amount | BigInt! |             |
| router | Router! |             |
| asset  | Asset!  |             |

# Router

Description: Router represents a router and its associated liquidity

| Field             | Type             | Description                                       |
| ----------------- | ---------------- | ------------------------------------------------- |
| id                | ID!              |                                                   |
| isActive          | Boolean!         |                                                   |
| owner             | Bytes            |                                                   |
| recipient         | Bytes            |                                                   |
| proposedOwner     | Bytes            |                                                   |
| proposedTimestamp | BigInt           |                                                   |
| assetBalances     | [AssetBalance!]! | Derived from the assets controlled by this router |

# OriginTransfer

Description:

| Field             | Type           | Description                                                               |
| ----------------- | -------------- | ------------------------------------------------------------------------- |
| id                | ID!            |                                                                           |
| chainId           | BigInt         | Meta: Chain ID for the transfer                                           |
| transferId        | Bytes          | Meta: Transaction hash for the transfer                                   |
| nonce             | BigInt         | Meta: Nonce for the transfer                                              |
| to                | Bytes          | CallParams:                                                               |
| callData          | Bytes          | CallParams:                                                               |
| originDomain      | BigInt         | CallParams:                                                               |
| destinationDomain | BigInt         | CallParams:                                                               |
| forceSlow         | Boolean        | CallParams:                                                               |
| receiveLocal      | Boolean        | CallParams:                                                               |
| status            | TransferStatus | Event Data: Status of transver [XCalled, Executed, Reconciled, Completed] |
| relayerFee        | BigInt         | Event Data:                                                               |
| message           | Bytes          | Event Data:                                                               |
| transactingAsset  | Bytes          | Asset: The asset address that gets sent in                                |
| transactingAmount | BigInt         | Asset: Amount of asset sent in.                                           |
| bridgedAsset      | Bytes          | Asset: Nomad asset address being bridged.                                 |
| bridgedAmount     | BigInt         | Asset: Amount of bridged nomad asset.                                     |
| caller            | Bytes          | XCalled Transaction:                                                      |
| transactionHash   | Bytes          | XCalled Transaction: Transaction Hash                                     |
| timestamp         | BigInt         | XCalled Transaction:                                                      |
| gasPrice          | BigInt         | XCalled Transaction:                                                      |
| gasLimit          | BigInt         | XCalled Transaction:                                                      |
| blockNumber       | BigInt         | XCalled Transaction:                                                      |

# DestinationTransfer

Description:

| Field                     | Type           | Description                                                               |
| ------------------------- | -------------- | ------------------------------------------------------------------------- |
| id                        | ID!            |                                                                           |
| chainId                   | BigInt         | Meta: Chain ID for the transfer                                           |
| transferId                | Bytes          | Meta: Transaction hash for the transfer                                   |
| nonce                     | BigInt         | Meta: Nonce for the transfer                                              |
| to                        | Bytes          | CallParams:                                                               |
| callData                  | Bytes          | CallParams:                                                               |
| originDomain              | BigInt         | CallParams:                                                               |
| destinationDomain         | BigInt         | CallParams:                                                               |
| forceSlow                 | Boolean        | CallParams:                                                               |
| receiveLocal              | Boolean        | CallParams:                                                               |
| status                    | TransferStatus | Event Data: Status of transver [XCalled, Executed, Reconciled, Completed] |
| routers                   | [Router!]      | Event Data:                                                               |
| originSender              | Bytes          | Event Data:                                                               |
| transactingAsset          | Bytes          | Asset: The asset address that gets sent in                                |
| transactingAmount         | BigInt         | Asset: Amount of asset sent in.                                           |
| localAsset                | Bytes          | Asset: The local version of the bridged asset's address                   |
| localAmount               | BigInt         | Asset: Amount of local asset.                                             |
| executedCaller            | Bytes          | Executed Transaction:                                                     |
| executedtransactionHash   | Bytes          | Executed Transaction: Transaction Hash                                    |
| executedTimestamp         | BigInt         | Executed Transaction:                                                     |
| executedGasPrice          | BigInt         | Executed Transaction:                                                     |
| executedGasLimit          | BigInt         | Executed Transaction:                                                     |
| executedBlockNumber       | BigInt         | Executed Transaction:                                                     |
| reconciledCaller          | Bytes          | Reconciled Transaction:                                                   |
| reconciledTransactionHash | Bytes          | Reconciled Transaction:                                                   |
| reconciledTimestamp       | BigInt         | Reconciled Transaction:                                                   |
| reconciledGasPrice        | BigInt         | Reconciled Transaction:                                                   |
| reconciledGasLimit        | BigInt         | Reconciled Transaction:                                                   |
| reconciledBlockNumber     | BigInt         | Reconciled Transaction:                                                   |
