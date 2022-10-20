---
sidebar_position: 2
title: Bridge Facet
id: bridge-facet
---


# Bridge Facet

## Events

### XCalled

```solidity
event XCalled(bytes32 transferId, uint256 nonce, bytes32 messageHash, struct TransferInfo params, address asset, uint256 amount, address local)
```

Emitted when `xcall` is called on the origin domain of a transfer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the crosschain transfer. |
| nonce | uint256 | - The bridge nonce of the transfer on the origin domain. |
| messageHash | bytes32 | - The hash of the message bytes (containing all transfer info) that were bridged. |
| params | struct TransferInfo | - The `TransferInfo` provided to the function. |
| asset | address | - The asset sent in with xcall |
| amount | uint256 | - The amount sent in with xcall |
| local | address | - The local asset that is controlled by the bridge and can be burned/minted |

### ExternalCalldataExecuted

```solidity
event ExternalCalldataExecuted(bytes32 transferId, bool success, bytes returnData)
```

Emitted when a transfer has its external data executed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the crosschain transfer. |
| success | bool | - Whether calldata succeeded |
| returnData | bytes | - Return bytes from the IXReceiver |

### Executed

```solidity
event Executed(bytes32 transferId, address to, address asset, struct ExecuteArgs args, address local, uint256 amount, address caller)
```

Emitted when `execute` is called on the destination domain of a transfer.

_`execute` may be called when providing fast liquidity or when processing a reconciled (slow) transfer._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the crosschain transfer. |
| to | address | - The recipient `TransferInfo.to` provided, created as indexed parameter. |
| asset | address | - The asset the recipient is given or the external call is executed with. Should be the adopted asset on that chain. |
| args | struct ExecuteArgs | - The `ExecuteArgs` provided to the function. |
| local | address | - The local asset that was either supplied by the router for a fast-liquidity transfer or minted by the bridge in a reconciled (slow) transfer. Could be the same as the adopted `asset` param. |
| amount | uint256 | - The amount of transferring asset the recipient address receives or the external call is executed with. |
| caller | address | - The account that called the function. |

### TransferRelayerFeesIncreased

```solidity
event TransferRelayerFeesIncreased(bytes32 transferId, uint256 increase, address caller)
```

Emitted when `_bumpTransfer` is called by an user on the origin domain both in
`xcall` and `bumpTransfer`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the crosschain transaction |
| increase | uint256 | - The additional amount fees increased by |
| caller | address | - The account that called the function |

### SlippageUpdated

```solidity
event SlippageUpdated(bytes32 transferId, uint256 slippage)
```

Emitted when `forceUpdateSlippage` is called by an user on the destination domain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the crosschain transaction |
| slippage | uint256 | - The updated slippage boundary |

### AavePortalMintUnbacked

```solidity
event AavePortalMintUnbacked(bytes32 transferId, address router, address asset, uint256 amount)
```

Emitted when a router used Aave Portal liquidity for fast transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the crosschain transaction |
| router | address | - The authorized router that used Aave Portal liquidity |
| asset | address | - The asset that was provided by Aave Portal |
| amount | uint256 | - The amount of asset that was provided by Aave Portal |

### RemoteAdded

```solidity
event RemoteAdded(uint32 domain, address remote, address caller)
```

Emitted when a new remote instance is added

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | uint32 | - The domain the remote instance is on |
| remote | address | - The address of the remote instance |
| caller | address | - The account that called the function |

### SequencerAdded

```solidity
event SequencerAdded(address sequencer, address caller)
```

Emitted when a sequencer is added or removed from whitelists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sequencer | address | - The sequencer address to be added or removed |
| caller | address | - The account that called the function |

### SequencerRemoved

```solidity
event SequencerRemoved(address sequencer, address caller)
```

Emitted when a sequencer is added or removed from whitelists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sequencer | address | - The sequencer address to be added or removed |
| caller | address | - The account that called the function |

## View Functions

### routedTransfers

```solidity
function routedTransfers(bytes32 _transferId) public view returns (address[])
```

### transferStatus

```solidity
function transferStatus(bytes32 _transferId) public view returns (enum DestinationTransferStatus)
```

### remote

```solidity
function remote(uint32 _domain) public view returns (address)
```

### domain

```solidity
function domain() public view returns (uint32)
```

### nonce

```solidity
function nonce() public view returns (uint256)
```

### approvedSequencers

```solidity
function approvedSequencers(address _sequencer) external view returns (bool)
```

### xAppConnectionManager

```solidity
function xAppConnectionManager() public view returns (address)
```

## External Functions

### addSequencer

```solidity
function addSequencer(address _sequencer) external
```

Used to add an approved sequencer to the whitelist.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sequencer | address | - The sequencer address to add. |

### removeSequencer

```solidity
function removeSequencer(address _sequencer) external
```

Used to remove an approved sequencer from the whitelist.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sequencer | address | - The sequencer address to remove. |

### setXAppConnectionManager

```solidity
function setXAppConnectionManager(address _xAppConnectionManager) external
```

Modify the contract the xApp uses to validate Replica contracts

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _xAppConnectionManager | address | The address of the xAppConnectionManager contract |

### enrollRemoteRouter

```solidity
function enrollRemoteRouter(uint32 _domain, bytes32 _router) external
```

Register the address of a Router contract for the same xApp on a remote chain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain of the remote xApp Router |
| _router | bytes32 | The address of the remote xApp Router |

### xcall

```solidity
function xcall(uint32 _destination, address _to, address _asset, address _delegate, uint256 _amount, uint256 _slippage, bytes _callData) external payable returns (bytes32)
```

Initiates a cross-chain transfer of funds, calldata, and/or various named properties using the nomad
network.

For ERC20 transfers, this contract must have approval to transfer the input (transacting) assets. The adopted
assets will be swapped for their local nomad asset counterparts (i.e. bridgeable tokens) via the configured AMM if
necessary. In the event that the adopted assets *are* local nomad assets, no swap is needed. The local tokens will
then be sent via the bridge router. If the local assets are representational for an asset on another chain, we will
burn the tokens here. If the local assets are canonical (meaning that the adopted to local asset pairing is native
to this chain), we will custody the tokens here.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _params | struct TransferInfo | - The TransferInfo arguments. |
| _asset | address |  |
| _amount | uint256 |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32 - The transfer ID of the newly created crosschain transfer. |

### xcallIntoLocal

```solidity
function xcallIntoLocal(uint32 _destination, address _to, address _asset, address _delegate, uint256 _amount, uint256 _slippage, bytes _callData) external payable returns (bytes32)
```

### execute

```solidity
function execute(struct ExecuteArgs _args) external returns (bytes32)
```

Called on a destination domain to disburse correct assets to end recipient and execute any included
calldata.

_Can be called before or after `handle` [reconcile] is called (regarding the same transfer), depending on
whether the fast liquidity route (i.e. funds provided by routers) is being used for this transfer. As a result,
executed calldata (including properties like `originSender`) may or may not be verified depending on whether the
reconcile has been completed (i.e. the optimistic confirmation period has elapsed)._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _args | struct ExecuteArgs | - ExecuteArgs arguments. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32 - The transfer ID of the crosschain transfer. Should match the xcall's transfer ID in order for reconciliation to occur. |

### bumpTransfer

```solidity
function bumpTransfer(bytes32 _transferId) external payable
```

Anyone can call this function on the origin domain to increase the relayer fee for a transfer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transferId | bytes32 | - The unique identifier of the crosschain transaction |

### forceUpdateSlippage

```solidity
function forceUpdateSlippage(struct TransferInfo _params, uint256 _slippage) external
```

Allows a user-specified account to update the slippage they are willing
to take on destination transfers.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _params | struct TransferInfo | TransferInfo associated with the transfer |
| _slippage | uint256 | The updated slippage |