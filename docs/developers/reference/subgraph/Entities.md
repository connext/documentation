---
sidebar_position: 2
title: Entities
---

## Asset

```graphql
type Asset @entity {
  id: ID! # local asset address
  key: Bytes
  canonicalId: Bytes
  canonicalDomain: BigInt
  adoptedAsset: Bytes
  localAsset: Bytes
  blockNumber: BigInt # needed in case multiple locals are stored under the same canonicalId
  # status
  status: AssetStatus
}
```

## AssetStatus

```graphql
type AssetStatus @entity {
  id: ID! # key
  status: Boolean
}
```

## AssetBalance

```graphql
type AssetBalance @entity {
  id: ID! # `key-router_address`
  amount: BigInt!
  router: Router!
  asset: Asset!
  feesEarned: BigInt!
}
```

## Router

```graphql
type Router @entity {
  id: ID!
  isActive: Boolean!
  owner: Bytes
  recipient: Bytes
  proposedOwner: Bytes
  proposedTimestamp: BigInt
  assetBalances: [AssetBalance!]! @derivedFrom(field: "router")
}
```

## Setting

```graphql
type Setting @entity {
  id: ID!
  maxRoutersPerTransfer: BigInt!
  caller: Bytes!
}
```

## Relayer

```graphql
type Relayer @entity {
  id: ID!
  isActive: Boolean!
  relayer: Bytes
}
```

## Sequencer

```graphql
type Sequencer @entity {
  id: ID!
  isActive: Boolean!
  sequencer: Bytes
}
```

## TransferStatus

```graphql
enum TransferStatus {
  XCalled
  Executed
  Reconciled
  CompletedSlow
  CompletedFast
}
```

## OriginTransfer

```graphql
type OriginTransfer @entity {
  id: ID!

  # Meta
  chainId: BigInt
  transferId: Bytes
  nonce: BigInt
  status: TransferStatus
  messageHash: Bytes

  # CallParams
  originDomain: BigInt
  destinationDomain: BigInt
  canonicalDomain: BigInt
  to: Bytes
  delegate: Bytes
  receiveLocal: Boolean
  callData: Bytes
  slippage: BigInt
  originSender: Bytes
  bridgedAmt: BigInt
  normalizedIn: BigInt
  canonicalId: Bytes

  # Asset
  asset: Asset

  # Message
  message: OriginMessage

  # Relayer Fee paid by user
  relayerFee: BigInt
  bumpRelayerFeeCount: BigInt

  # XCalled Transaction
  caller: Bytes
  transactionHash: Bytes
  timestamp: BigInt
  gasPrice: BigInt
  gasLimit: BigInt
  blockNumber: BigInt
  txOrigin: Bytes
}
```

## DestinationTransfer

```graphql
type DestinationTransfer @entity {
  id: ID!

  # Meta
  chainId: BigInt
  transferId: Bytes
  nonce: BigInt
  status: TransferStatus
  routers: [Router!]

  # CallParams
  originDomain: BigInt
  destinationDomain: BigInt
  canonicalDomain: BigInt
  to: Bytes
  delegate: Bytes
  receiveLocal: Boolean
  callData: Bytes
  slippage: BigInt
  bumpSlippageCount: BigInt
  originSender: Bytes
  bridgedAmt: BigInt
  normalizedIn: BigInt
  canonicalId: Bytes

  # Asset
  asset: Asset
  amount: BigInt

  # calculated
  routersFee: BigInt

  # Executed Transaction
  executedCaller: Bytes
  executedTransactionHash: Bytes
  executedTimestamp: BigInt
  executedGasPrice: BigInt
  executedGasLimit: BigInt
  executedBlockNumber: BigInt
  executedTxOrigin: Bytes

  # Reconciled Transaction
  reconciledCaller: Bytes
  reconciledTransactionHash: Bytes
  reconciledTimestamp: BigInt
  reconciledGasPrice: BigInt
  reconciledGasLimit: BigInt
  reconciledBlockNumber: BigInt
  reconciledTxOrigin: Bytes
}
```

## OriginMessage

```graphql
type OriginMessage @entity {
  id: ID!

  # origin transfer data
  transferId: Bytes
  destinationDomain: BigInt

  # Dispatch Transaction
  leaf: Bytes
  index: BigInt
  message: Bytes
  root: Bytes
  transactionHash: Bytes
  blockNumber: BigInt

  # root count RD
  rootCount: RootCount
}
```

## AggregateRoot

```graphql
type AggregateRoot @entity {
  id: ID!
  root: Bytes!
  blockNumber: BigInt!
}
```

## ConnectorMeta

```graphql
type ConnectorMeta @entity {
  id: ID! # "ConnectorMeta"
  spokeDomain: BigInt
  hubDomain: BigInt

  amb: Bytes
  rootManager: Bytes
  mirrorConnector: Bytes
}
```

## RootCount

```graphql
type RootCount @entity {
  id: ID!
  count: BigInt
}
```

## RootMessageSent

```graphql
type RootMessageSent @entity {
  id: ID!

  spokeDomain: BigInt
  hubDomain: BigInt
  root: Bytes
  count: BigInt

  # MessageSent Transaction
  caller: Bytes
  transactionHash: Bytes
  timestamp: BigInt
  gasPrice: BigInt
  gasLimit: BigInt
  blockNumber: BigInt
}
```
