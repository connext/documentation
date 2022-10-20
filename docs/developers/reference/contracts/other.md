
## InboxFacet

This is the facet that holds all the functionality needed for Connext's messaging layer to
reconcile cross-chain transfers. Authenticated (proven) message data is delivered to the `reconcile`
function, where it is parsed to determine the message action. Tokens are credited (representational
assets are minted, canonical tokens are unlocked from escrow) if applicable.

### InboxFacet__onlyReplica_notReplica

```solidity
error InboxFacet__onlyReplica_notReplica()
```

### InboxFacet__onlyRemoteRouter_notRemote

```solidity
error InboxFacet__onlyRemoteRouter_notRemote()
```

### InboxFacet__handle_notTransfer

```solidity
error InboxFacet__handle_notTransfer()
```

### InboxFacet__reconcile_notConnext

```solidity
error InboxFacet__reconcile_notConnext()
```

### InboxFacet__reconcile_alreadyReconciled

```solidity
error InboxFacet__reconcile_alreadyReconciled()
```

### InboxFacet__reconcile_noPortalRouter

```solidity
error InboxFacet__reconcile_noPortalRouter()
```

### Reconciled

```solidity
event Reconciled(bytes32 transferId, uint32 originDomain, address local, address[] routers, uint256 amount, address caller)
```

Emitted when `reconciled` is called by the bridge on the destination domain.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The unique identifier of the transfer. |
| originDomain | uint32 | - The originating domain of the transfer. |
| local | address | - The local asset that was provided by the bridge. |
| routers | address[] | - The routers that were reimbursed the bridged token, if fast liquidity was provided for the given transfer. |
| amount | uint256 | - The amount that was provided by the bridge. |
| caller | address | - The account that called the function |

### Receive

```solidity
event Receive(uint64 originAndNonce, address token, address recipient, address liquidityProvider, uint256 amount)
```

emitted when tokens are dispensed to an account on this domain
        emitted both when fast liquidity is provided, and when the
        transfer ultimately settles

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| originAndNonce | uint64 | Domain where the transfer originated and the        unique identifier for the message from origin to destination,        combined in a single field ((origin << 32) & nonce) |
| token | address | The address of the local token contract being received |
| recipient | address | The address receiving the tokens; the original        recipient of the transfer |
| liquidityProvider | address | The account providing liquidity |
| amount | uint256 | The amount of tokens being received |

### onlyReplica

```solidity
modifier onlyReplica()
```

Only accept messages from an Nomad Replica contract.

### onlyRemoteRouter

```solidity
modifier onlyRemoteRouter(uint32 _origin, bytes32 _router)
```

Only accept messages from a remote Router contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _origin | uint32 | The domain the message is coming from. |
| _router | bytes32 | The address the message is coming from. |

### handle

```solidity
function handle(uint32 _origin, uint32 _nonce, bytes32 _sender, bytes _message) external
```

Handles an incoming cross-chain message.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _origin | uint32 | The origin domain. |
| _nonce | uint32 | The unique identifier for the message from origin to destination. |
| _sender | bytes32 | The sender address. |
| _message | bytes | The message body. |

### _reconcile

```solidity
function _reconcile(bytes32 _transferId, uint32 _origin, address _asset, uint256 _amount) internal
```

Reconcile the transfer, marking the transfer ID in storage as authenticated. Reimburses
routers with local asset if it was a fast-liquidity transfer (i.e. it was previously executed).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transferId | bytes32 | Unique identifier of the transfer. |
| _origin | uint32 | Origin domain of the transfer. |
| _asset | address | Local asset address (representational or canonical). |
| _amount | uint256 | The amount of the local asset. |

### _isReplica

```solidity
function _isReplica(address _potentialReplica) internal view returns (bool)
```

Determine whether _potentialReplica is an enrolled Replica from the xAppConnectionManager

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if _potentialReplica is an enrolled Replica |

### _isRemoteRouter

```solidity
function _isRemoteRouter(uint32 _domain, bytes32 _router) internal view returns (bool)
```

Return true if the given domain / router is the address of a remote xApp Router

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain of the potential remote xApp Router |
| _router | bytes32 | The address of the potential remote xApp Router |

### _creditTokens

```solidity
function _creditTokens(uint32 _origin, uint32 _nonce, bytes29 _tokenId, bytes29 _action) internal returns (address, uint256)
```

If applicable, mints tokens corresponding to the inbound message action.

_IFF the asset is representational (i.e. originates from a remote chain), tokens will be minted.
Otherwise, the token must be canonical (i.e. we are on the token's home chain), and the corresponding
amount will already be available in escrow in this contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _origin | uint32 | The domain of the chain from which the transfer originated. |
| _nonce | uint32 | The unique identifier for the message from origin to destination. |
| _tokenId | bytes29 | The canonical token identifier to credit. |
| _action | bytes29 | The contents of the transfer message. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | _token The address of the local token contract. |
| [1] | uint256 |  |

## PortalFacet

### PortalFacet__setAavePortalFee_invalidFee

```solidity
error PortalFacet__setAavePortalFee_invalidFee()
```

### PortalFacet__repayAavePortal_insufficientFunds

```solidity
error PortalFacet__repayAavePortal_insufficientFunds()
```

### PortalFacet__repayAavePortal_swapFailed

```solidity
error PortalFacet__repayAavePortal_swapFailed()
```

### PortalFacet__repayAavePortalFor_zeroAmount

```solidity
error PortalFacet__repayAavePortalFor_zeroAmount()
```

### AavePortalRepayment

```solidity
event AavePortalRepayment(bytes32 transferId, address asset, uint256 amount, uint256 fee, address caller)
```

Emitted when a repayment on an Aave portal loan is made

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| transferId | bytes32 | - The transfer debt that was repaid |
| asset | address | - The asset that was repaid |
| amount | uint256 | - The amount that was repaid |
| fee | uint256 | - The fee amount that was repaid |
| caller | address |  |

### getAavePortalDebt

```solidity
function getAavePortalDebt(bytes32 _transferId) external view returns (uint256)
```

### getAavePortalFeeDebt

```solidity
function getAavePortalFeeDebt(bytes32 _transferId) external view returns (uint256)
```

### aavePool

```solidity
function aavePool() external view returns (address)
```

### aavePortalFee

```solidity
function aavePortalFee() external view returns (uint256)
```

### setAavePool

```solidity
function setAavePool(address _aavePool) external
```

Sets the Aave Pool contract address.

_Allows to set the aavePool to address zero to disable Aave Portal if needed_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _aavePool | address | The address of the Aave Pool contract |

### setAavePortalFee

```solidity
function setAavePortalFee(uint256 _aavePortalFeeNumerator) external
```

Sets the Aave Portal fee numerator

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _aavePortalFeeNumerator | uint256 | The new value for the Aave Portal fee numerator |

### repayAavePortal

```solidity
function repayAavePortal(struct TransferInfo _params, uint256 _backingAmount, uint256 _feeAmount, uint256 _maxIn) external
```

Used by routers to perform a manual repayment to Aave Portals to cover any outstanding debt

_The router must be approved for portal and with enough liquidity, and must be the caller of this
function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _params | struct TransferInfo | TransferInfo associated with the transfer |
| _backingAmount | uint256 | The principle to be paid (in adopted asset) |
| _feeAmount | uint256 | The fee to be paid (in adopted asset) |
| _maxIn | uint256 | The max value of the local asset to swap for the _backingAmount of adopted asset |

### repayAavePortalFor

```solidity
function repayAavePortalFor(struct TransferInfo _params, uint256 _backingAmount, uint256 _feeAmount) external payable
```

This allows anyone to repay the portal in the adopted asset for a given router
and transfer

_Should always be paying in the backing asset for the aave loan_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _params | struct TransferInfo | TransferInfo associated with the transfer |
| _backingAmount | uint256 | Amount of principle to repay |
| _feeAmount | uint256 | Amount of fees to repay |

### _backLoan

```solidity
function _backLoan(address _asset, uint256 _backing, uint256 _fee, bytes32 _transferId) internal
```

Calls backUnbacked on the aave contracts

_Assumes funds in adopted asset are already on contract_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | address | Address of the adopted asset (asset backing the loan) |
| _backing | uint256 | Amount of principle to repay |
| _fee | uint256 | Amount of fees to repay |
| _transferId | bytes32 | Corresponding transfer id for the fees |

## ProposedOwnableFacet

Contract module which provides a basic access control mechanism,
where there is an account (an owner) that can be granted exclusive access to
specific functions.

By default, the owner account will be the one that deploys the contract. This
can later be changed via a two step process:
1. Call `proposeOwner`
2. Wait out the delay period
3. Call `acceptOwner`

_This module is used through inheritance. It will make available the
modifier `onlyOwner`, which can be applied to your functions to restrict
their use to the owner.

The majority of this code was taken from the openzeppelin Ownable
contract_

### ProposedOwnableFacet__proposeRouterWhitelistRemoval_noOwnershipChange

```solidity
error ProposedOwnableFacet__proposeRouterWhitelistRemoval_noOwnershipChange()
```

### ProposedOwnableFacet__removeRouterWhitelist_noOwnershipChange

```solidity
error ProposedOwnableFacet__removeRouterWhitelist_noOwnershipChange()
```

### ProposedOwnableFacet__removeRouterWhitelist_noProposal

```solidity
error ProposedOwnableFacet__removeRouterWhitelist_noProposal()
```

### ProposedOwnableFacet__removeRouterWhitelist_delayNotElapsed

```solidity
error ProposedOwnableFacet__removeRouterWhitelist_delayNotElapsed()
```

### ProposedOwnableFacet__proposeAssetWhitelistRemoval_noOwnershipChange

```solidity
error ProposedOwnableFacet__proposeAssetWhitelistRemoval_noOwnershipChange()
```

### ProposedOwnableFacet__removeAssetWhitelist_noOwnershipChange

```solidity
error ProposedOwnableFacet__removeAssetWhitelist_noOwnershipChange()
```

### ProposedOwnableFacet__removeAssetWhitelist_noProposal

```solidity
error ProposedOwnableFacet__removeAssetWhitelist_noProposal()
```

### ProposedOwnableFacet__removeAssetWhitelist_delayNotElapsed

```solidity
error ProposedOwnableFacet__removeAssetWhitelist_delayNotElapsed()
```

### ProposedOwnableFacet__proposeNewOwner_invalidProposal

```solidity
error ProposedOwnableFacet__proposeNewOwner_invalidProposal()
```

### ProposedOwnableFacet__proposeNewOwner_noOwnershipChange

```solidity
error ProposedOwnableFacet__proposeNewOwner_noOwnershipChange()
```

### ProposedOwnableFacet__renounceOwnership_noProposal

```solidity
error ProposedOwnableFacet__renounceOwnership_noProposal()
```

### ProposedOwnableFacet__renounceOwnership_delayNotElapsed

```solidity
error ProposedOwnableFacet__renounceOwnership_delayNotElapsed()
```

### ProposedOwnableFacet__renounceOwnership_invalidProposal

```solidity
error ProposedOwnableFacet__renounceOwnership_invalidProposal()
```

### ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange

```solidity
error ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange()
```

### ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed

```solidity
error ProposedOwnableFacet__acceptProposedOwner_delayNotElapsed()
```

### ProposedOwnableFacet__revokeRole_invalidInput

```solidity
error ProposedOwnableFacet__revokeRole_invalidInput()
```

### ProposedOwnableFacet__assignRoleRouter_invalidInput

```solidity
error ProposedOwnableFacet__assignRoleRouter_invalidInput()
```

### ProposedOwnableFacet__assignRoleWatcher_invalidInput

```solidity
error ProposedOwnableFacet__assignRoleWatcher_invalidInput()
```

### ProposedOwnableFacet__assignRoleAdmin_invalidInput

```solidity
error ProposedOwnableFacet__assignRoleAdmin_invalidInput()
```

### RouterWhitelistRemovalProposed

```solidity
event RouterWhitelistRemovalProposed(uint256 timestamp)
```

### RouterWhitelistRemoved

```solidity
event RouterWhitelistRemoved(bool renounced)
```

### AssetWhitelistRemovalProposed

```solidity
event AssetWhitelistRemovalProposed(uint256 timestamp)
```

### AssetWhitelistRemoved

```solidity
event AssetWhitelistRemoved(bool renounced)
```

### RevokeRole

```solidity
event RevokeRole(address revokedAddress, enum Role revokedRole)
```

### AssignRoleRouter

```solidity
event AssignRoleRouter(address router)
```

### AssignRoleWatcher

```solidity
event AssignRoleWatcher(address watcher)
```

### AssignRoleAdmin

```solidity
event AssignRoleAdmin(address admin)
```

### Paused

```solidity
event Paused()
```

### Unpaused

```solidity
event Unpaused()
```

### owner

```solidity
function owner() public view returns (address)
```

Returns the address of the current owner.

### routerWhitelistRemoved

```solidity
function routerWhitelistRemoved() public view returns (bool)
```

Returns if the router whitelist is removed.

### assetWhitelistRemoved

```solidity
function assetWhitelistRemoved() public view returns (bool)
```

Returns if the asset whitelist is removed.

### proposed

```solidity
function proposed() public view returns (address)
```

Returns the address of the proposed owner.

### proposedTimestamp

```solidity
function proposedTimestamp() public view returns (uint256)
```

Returns the address of the proposed owner.

### routerWhitelistTimestamp

```solidity
function routerWhitelistTimestamp() public view returns (uint256)
```

Returns the timestamp when router whitelist was last proposed to be removed

### assetWhitelistTimestamp

```solidity
function assetWhitelistTimestamp() public view returns (uint256)
```

Returns the timestamp when asset whitelist was last proposed to be removed

### delay

```solidity
function delay() public view returns (uint256)
```

Returns the delay period before a new owner can be accepted.

### queryRole

```solidity
function queryRole(address _role) public view returns (enum Role)
```

Returns the Role of the address

_returns uint value of representing enum value of Role_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _role | address | The address for which Role need to be queried |

### proposeRouterWhitelistRemoval

```solidity
function proposeRouterWhitelistRemoval() public
```

Indicates if the ownership of the router whitelist has
been renounced

### removeRouterWhitelist

```solidity
function removeRouterWhitelist() public
```

Indicates if the ownership of the asset whitelist has
been renounced

### proposeAssetWhitelistRemoval

```solidity
function proposeAssetWhitelistRemoval() public
```

Indicates if the ownership of the asset whitelist has
been renounced

### removeAssetWhitelist

```solidity
function removeAssetWhitelist() public
```

Indicates if the ownership of the asset whitelist has
been renounced

### renounced

```solidity
function renounced() public view returns (bool)
```

Indicates if the ownership has been renounced() by
checking if current owner is address(0)

### proposeNewOwner

```solidity
function proposeNewOwner(address newlyProposed) public
```

Sets the timestamp for an owner to be proposed, and sets the
newly proposed owner as step 1 in a 2-step process

### renounceOwnership

```solidity
function renounceOwnership() public
```

Renounces ownership of the contract after a delay

### acceptProposedOwner

```solidity
function acceptProposedOwner() public
```

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the proposed owner.

### revokeRole

```solidity
function revokeRole(address _revoke) public
```

Use to revoke the Role of an address to None
Can only be called by Owner or Role.Admin

_input address will be assingned default value i.e Role.None under mapping roles_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _revoke | address | - The address to be revoked from it's Role |

### assignRoleRouter

```solidity
function assignRoleRouter(address _router) public
```

Use to assign an address Router role
Address with Router has permission to add new router
Can only be called by Owner or Role.Router

_requested address will be whitelisted as Role.Router under mapping roles_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | - The address to be assigned as Role.Router under roles |

### assignRoleWatcher

```solidity
function assignRoleWatcher(address _watcher) public
```

Use to assign an address Watcher role
Address with Watcher role has permission to pause
Can only be called by Owner or Role.Admin

_requested address will be whitelisted as Role.Watcher under mapping roles_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _watcher | address | - The address to be assigned as Role.Watcher under roles |

### assignRoleAdmin

```solidity
function assignRoleAdmin(address _admin) public
```

Use to assign an address Admin role
Address with Admin role has permission to all else of Router & Watcher role
Can only be called by Owner or Role.Admin

_requested address will be whitelisted as Role.Admin under mapping roles_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | - The address to beassigned as Role.Admin under roles |

### pause

```solidity
function pause() public
```

### unpause

```solidity
function unpause() public
```

### _setRouterWhitelistTimestamp

```solidity
function _setRouterWhitelistTimestamp() private
```

### _setRouterWhitelistRemoved

```solidity
function _setRouterWhitelistRemoved(bool value) private
```

### _setAssetWhitelistTimestamp

```solidity
function _setAssetWhitelistTimestamp() private
```

### _setAssetWhitelistRemoved

```solidity
function _setAssetWhitelistRemoved(bool value) private
```

### _setOwner

```solidity
function _setOwner(address newOwner) private
```

### _setProposed

```solidity
function _setProposed(address newlyProposed) private
```

## RelayerFacet

### RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault

```solidity
error RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault()
```

### RelayerFacet__addRelayer_alreadyApproved

```solidity
error RelayerFacet__addRelayer_alreadyApproved()
```

### RelayerFacet__removeRelayer_notApproved

```solidity
error RelayerFacet__removeRelayer_notApproved()
```

### RelayerFacet__initiateClaim_emptyClaim

```solidity
error RelayerFacet__initiateClaim_emptyClaim()
```

### RelayerFacet__initiateClaim_notRelayer

```solidity
error RelayerFacet__initiateClaim_notRelayer(bytes32 transferId)
```

### RelayerFeeVaultUpdated

```solidity
event RelayerFeeVaultUpdated(address oldVault, address newVault, address caller)
```

Emitted when the relayerFeeVault variable is updated

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldVault | address | - The relayerFeeVault old value |
| newVault | address | - The relayerFeeVault new value |
| caller | address | - The account that called the function |

### RelayerAdded

```solidity
event RelayerAdded(address relayer, address caller)
```

Emitted when a relayer is added or removed from whitelists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| relayer | address | - The relayer address to be added or removed |
| caller | address | - The account that called the function |

### RelayerRemoved

```solidity
event RelayerRemoved(address relayer, address caller)
```

Emitted when a relayer is added or removed from whitelists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| relayer | address | - The relayer address to be added or removed |
| caller | address | - The account that called the function |

### InitiatedClaim

```solidity
event InitiatedClaim(uint32 domain, address recipient, address caller, bytes32[] transferIds)
```

Emitted when `initiateClaim` is called on the destination chain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | uint32 | - Domain to claim funds on |
| recipient | address | - Address on origin chain to send claimed funds to |
| caller | address | - The account that called the function |
| transferIds | bytes32[] | - TransferIds to claim |

### Claimed

```solidity
event Claimed(address recipient, uint256 total, bytes32[] transferIds)
```

Emitted when `claim` is called on the origin domain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient | address | - Address on origin chain to send claimed funds to |
| total | uint256 | - Total amount claimed |
| transferIds | bytes32[] | - TransferIds to claim |

### approvedRelayers

```solidity
function approvedRelayers(address _relayer) public view returns (bool)
```

### relayerFeeVault

```solidity
function relayerFeeVault() external view returns (address)
```

### setRelayerFeeVault

```solidity
function setRelayerFeeVault(address _relayerFeeVault) external
```

Updates the relayer fee router

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _relayerFeeVault | address | The address of the new router |

### addRelayer

```solidity
function addRelayer(address _relayer) external
```

Used to add approved relayer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _relayer | address | - The relayer address to add |

### removeRelayer

```solidity
function removeRelayer(address _relayer) external
```

Used to remove approved relayer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _relayer | address | - The relayer address to remove |

## RoutersFacet

@notice
This contract is designed to manage router access, meaning it maintains the
router recipients, owners, and the router whitelist itself.

As a router, there are three important permissions:
`router` - this is the address that will sign bids sent to the sequencer
`routerRecipient` - this is the address that receives funds when liquidity is withdrawn
`routerOwner` - this is the address permitted to update recipients and propose new owners

In cases where the owner is not set, the caller should be the `router` itself. In cases where the
`routerRecipient` is not set, the funds can be removed to anywhere.

When setting a new `routerOwner`, the current owner (or router) must create a proposal, which
can be accepted by the proposed owner after the delay period. If the proposed owner is the empty
address, then it must be accepted by the current owner.

### RoutersFacet__acceptProposedRouterOwner_notElapsed

```solidity
error RoutersFacet__acceptProposedRouterOwner_notElapsed()
```

### RoutersFacet__setRouterRecipient_notNewRecipient

```solidity
error RoutersFacet__setRouterRecipient_notNewRecipient()
```

### RoutersFacet__onlyRouterOwner_notRouterOwner

```solidity
error RoutersFacet__onlyRouterOwner_notRouterOwner()
```

### RoutersFacet__onlyProposedRouterOwner_notRouterOwner

```solidity
error RoutersFacet__onlyProposedRouterOwner_notRouterOwner()
```

### RoutersFacet__onlyProposedRouterOwner_notProposedRouterOwner

```solidity
error RoutersFacet__onlyProposedRouterOwner_notProposedRouterOwner()
```

### RoutersFacet__removeRouter_routerEmpty

```solidity
error RoutersFacet__removeRouter_routerEmpty()
```

### RoutersFacet__removeRouter_notAdded

```solidity
error RoutersFacet__removeRouter_notAdded()
```

### RoutersFacet__setupRouter_routerEmpty

```solidity
error RoutersFacet__setupRouter_routerEmpty()
```

### RoutersFacet__setupRouter_alreadyAdded

```solidity
error RoutersFacet__setupRouter_alreadyAdded()
```

### RoutersFacet__proposeRouterOwner_notNewOwner

```solidity
error RoutersFacet__proposeRouterOwner_notNewOwner()
```

### RoutersFacet__proposeRouterOwner_badRouter

```solidity
error RoutersFacet__proposeRouterOwner_badRouter()
```

### RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer

```solidity
error RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer()
```

### RoutersFacet__addLiquidityForRouter_routerEmpty

```solidity
error RoutersFacet__addLiquidityForRouter_routerEmpty()
```

### RoutersFacet__addLiquidityForRouter_amountIsZero

```solidity
error RoutersFacet__addLiquidityForRouter_amountIsZero()
```

### RoutersFacet__addLiquidityForRouter_badRouter

```solidity
error RoutersFacet__addLiquidityForRouter_badRouter()
```

### RoutersFacet__addLiquidityForRouter_capReached

```solidity
error RoutersFacet__addLiquidityForRouter_capReached()
```

### RoutersFacet__removeRouterLiquidity_recipientEmpty

```solidity
error RoutersFacet__removeRouterLiquidity_recipientEmpty()
```

### RoutersFacet__removeRouterLiquidity_amountIsZero

```solidity
error RoutersFacet__removeRouterLiquidity_amountIsZero()
```

### RoutersFacet__removeRouterLiquidity_insufficientFunds

```solidity
error RoutersFacet__removeRouterLiquidity_insufficientFunds()
```

### RoutersFacet__removeRouterLiquidityFor_notOwner

```solidity
error RoutersFacet__removeRouterLiquidityFor_notOwner()
```

### RoutersFacet__setLiquidityFeeNumerator_tooSmall

```solidity
error RoutersFacet__setLiquidityFeeNumerator_tooSmall()
```

### RoutersFacet__setLiquidityFeeNumerator_tooLarge

```solidity
error RoutersFacet__setLiquidityFeeNumerator_tooLarge()
```

### RoutersFacet__approveRouterForPortal_notAdded

```solidity
error RoutersFacet__approveRouterForPortal_notAdded()
```

### RoutersFacet__approveRouterForPortal_alreadyApproved

```solidity
error RoutersFacet__approveRouterForPortal_alreadyApproved()
```

### RoutersFacet__unapproveRouterForPortal_notApproved

```solidity
error RoutersFacet__unapproveRouterForPortal_notApproved()
```

### _delay

```solidity
uint256 _delay
```

### RouterAdded

```solidity
event RouterAdded(address router, address caller)
```

Emitted when a new router is added

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the added router |
| caller | address | - The account that called the function |

### RouterRemoved

```solidity
event RouterRemoved(address router, address caller)
```

Emitted when an existing router is removed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the removed router |
| caller | address | - The account that called the function |

### RouterRecipientSet

```solidity
event RouterRecipientSet(address router, address prevRecipient, address newRecipient)
```

Emitted when the recipient of router is updated

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the added router |
| prevRecipient | address | - The address of the previous recipient of the router |
| newRecipient | address | - The address of the new recipient of the router |

### RouterOwnerProposed

```solidity
event RouterOwnerProposed(address router, address prevProposed, address newProposed)
```

Emitted when the owner of router is proposed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the added router |
| prevProposed | address | - The address of the previous proposed |
| newProposed | address | - The address of the new proposed |

### RouterOwnerAccepted

```solidity
event RouterOwnerAccepted(address router, address prevOwner, address newOwner)
```

Emitted when the owner of router is accepted

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the added router |
| prevOwner | address | - The address of the previous owner of the router |
| newOwner | address | - The address of the new owner of the router |

### MaxRoutersPerTransferUpdated

```solidity
event MaxRoutersPerTransferUpdated(uint256 maxRoutersPerTransfer, address caller)
```

Emitted when the maxRoutersPerTransfer variable is updated

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxRoutersPerTransfer | uint256 | - The maxRoutersPerTransfer new value |
| caller | address | - The account that called the function |

### LiquidityFeeNumeratorUpdated

```solidity
event LiquidityFeeNumeratorUpdated(uint256 liquidityFeeNumerator, address caller)
```

Emitted when the LIQUIDITY_FEE_NUMERATOR variable is updated

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| liquidityFeeNumerator | uint256 | - The LIQUIDITY_FEE_NUMERATOR new value |
| caller | address | - The account that called the function |

### RouterApprovedForPortal

```solidity
event RouterApprovedForPortal(address router, address caller)
```

Emitted when a router is approved for Portal

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the approved router |
| caller | address | - The account that called the function |

### RouterUnapprovedForPortal

```solidity
event RouterUnapprovedForPortal(address router, address caller)
```

Emitted when a router is disapproved for Portal

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the disapproved router |
| caller | address | - The account that called the function |

### RouterLiquidityAdded

```solidity
event RouterLiquidityAdded(address router, address local, bytes32 key, uint256 amount, address caller)
```

Emitted when a router adds liquidity to the contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The address of the router the funds were credited to |
| local | address | - The address of the token added (all liquidity held in local asset) |
| key | bytes32 | - The hash of the canonical id and domain |
| amount | uint256 | - The amount of liquidity added |
| caller | address | - The account that called the function |

### RouterLiquidityRemoved

```solidity
event RouterLiquidityRemoved(address router, address to, address local, bytes32 key, uint256 amount, address caller)
```

Emitted when a router withdraws liquidity from the contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | - The router you are removing liquidity from |
| to | address | - The address the funds were withdrawn to |
| local | address | - The address of the token withdrawn |
| key | bytes32 |  |
| amount | uint256 | - The amount of liquidity withdrawn |
| caller | address | - The account that called the function |

### onlyRouterOwner

```solidity
modifier onlyRouterOwner(address _router)
```

Asserts caller is the router owner (if set) or the router itself

### onlyProposedRouterOwner

```solidity
modifier onlyProposedRouterOwner(address _router)
```

Asserts caller is the proposed router. If proposed router is address(0), then asserts
the owner is calling the function (if set), or the router itself is calling the function

### LIQUIDITY_FEE_NUMERATOR

```solidity
function LIQUIDITY_FEE_NUMERATOR() public view returns (uint256)
```

### LIQUIDITY_FEE_DENOMINATOR

```solidity
function LIQUIDITY_FEE_DENOMINATOR() public pure returns (uint256)
```

### getRouterApproval

```solidity
function getRouterApproval(address _router) public view returns (bool)
```

Returns the approved router for the given router address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

### getRouterRecipient

```solidity
function getRouterRecipient(address _router) public view returns (address)
```

Returns the recipient for the specified router

_The recipient (if set) receives all funds when router liquidity is removed_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

### getRouterOwner

```solidity
function getRouterOwner(address _router) public view returns (address)
```

Returns the router owner if it is set, or the router itself if not

_Uses logic function here to handle the case where router owner is not set.
Other getters within this interface use explicitly the stored value_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

### getProposedRouterOwner

```solidity
function getProposedRouterOwner(address _router) public view returns (address)
```

Returns the currently proposed router owner

_All routers must wait for the delay timeout before accepting a new owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

### getProposedRouterOwnerTimestamp

```solidity
function getProposedRouterOwnerTimestamp(address _router) public view returns (uint256)
```

Returns the currently proposed router owner timestamp

_All routers must wait for the delay timeout before accepting a new owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

### maxRoutersPerTransfer

```solidity
function maxRoutersPerTransfer() public view returns (uint256)
```

### routerBalances

```solidity
function routerBalances(address _router, address _asset) public view returns (uint256)
```

### getRouterApprovalForPortal

```solidity
function getRouterApprovalForPortal(address _router) public view returns (bool)
```

Returns whether the router is approved for portals or not

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

### setupRouter

```solidity
function setupRouter(address router, address owner, address recipient) external
```

Used to set router initial properties

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | Router address to setup |
| owner | address | Initial Owner of router |
| recipient | address | Initial Recipient of router |

### removeRouter

```solidity
function removeRouter(address router) external
```

Used to remove routers that can transact crosschain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | Router address to remove |

### setMaxRoutersPerTransfer

```solidity
function setMaxRoutersPerTransfer(uint256 _newMaxRouters) external
```

Used to set the max amount of routers a payment can be routed through

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newMaxRouters | uint256 | The new max amount of routers |

### setLiquidityFeeNumerator

```solidity
function setLiquidityFeeNumerator(uint256 _numerator) external
```

Sets the LIQUIDITY_FEE_NUMERATOR

_Admin can set LIQUIDITY_FEE_NUMERATOR variable, Liquidity fee should be less than 5%_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _numerator | uint256 | new LIQUIDITY_FEE_NUMERATOR |

### approveRouterForPortal

```solidity
function approveRouterForPortal(address _router) external
```

Allow router to use Portals

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | - The router address to approve |

### unapproveRouterForPortal

```solidity
function unapproveRouterForPortal(address _router) external
```

Remove router access to use Portals

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | - The router address to remove approval |

### setRouterRecipient

```solidity
function setRouterRecipient(address router, address recipient) external
```

Sets the designated recipient for a router

_Router should only be able to set this once otherwise if router key compromised,
no problem is solved since attacker could just update recipient_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | Router address to set recipient |
| recipient | address | Recipient Address to set to router |

### proposeRouterOwner

```solidity
function proposeRouterOwner(address router, address proposed) external
```

Current owner or router may propose a new router owner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | Router address to set recipient |
| proposed | address | Proposed owner Address to set to router |

### acceptProposedRouterOwner

```solidity
function acceptProposedRouterOwner(address router) external
```

New router owner must accept role, or previous if proposed is 0x0

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | Router address to set recipient |

### addRouterLiquidityFor

```solidity
function addRouterLiquidityFor(uint256 _amount, address _local, address _router) external payable
```

This is used by anyone to increase a router's available liquidity for a given asset.

_The liquidity will be held in the local asset, which is the representation if you
are *not* on the canonical domain, and the canonical asset otherwise._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | - The amount of liquidity to add for the router |
| _local | address | - The address of the asset you're adding liquidity for. If adding liquidity of the native asset, routers may use `address(0)` or the wrapped asset |
| _router | address | The router you are adding liquidity on behalf of |

### addRouterLiquidity

```solidity
function addRouterLiquidity(uint256 _amount, address _local) external payable
```

This is used by any router to increase their available liquidity for a given asset.

_The liquidity will be held in the local asset, which is the representation if you
are *not* on the canonical domain, and the canonical asset otherwise._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | - The amount of liquidity to add for the router |
| _local | address | - The address of the asset you're adding liquidity for. If adding liquidity of the native asset, routers may use `address(0)` or the wrapped asset |

### removeRouterLiquidityFor

```solidity
function removeRouterLiquidityFor(uint256 _amount, address _local, address payable _to, address _router) external
```

This is used by any router owner to decrease their available liquidity for a given asset.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | - The amount of liquidity to remove for the router |
| _local | address | - The address of the asset you're removing liquidity from. If removing liquidity of the native asset, routers may use `address(0)` or the wrapped asset |
| _to | address payable | The address that will receive the liquidity being removed |
| _router | address | The address of the router |

### removeRouterLiquidity

```solidity
function removeRouterLiquidity(uint256 _amount, address _local, address payable _to) external
```

This is used by any router to decrease their available liquidity for a given asset.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | - The amount of liquidity to remove for the router |
| _local | address | - The address of the asset you're removing liquidity from. If removing liquidity of the native asset, routers may use `address(0)` or the wrapped asset |
| _to | address payable | The address that will receive the liquidity being removed if no router recipient exists. |

### _addLiquidityForRouter

```solidity
function _addLiquidityForRouter(uint256 _amount, address _local, address _router) internal
```

Contains the logic to verify + increment a given routers liquidity

_The liquidity will be held in the local asset, which is the representation if you
are *not* on the canonical domain, and the canonical asset otherwise._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | - The amount of liquidity to add for the router |
| _local | address | - The address of the nomad representation of the asset |
| _router | address | - The router you are adding liquidity on behalf of |

### _removeLiquidityForRouter

```solidity
function _removeLiquidityForRouter(uint256 _amount, address _local, address payable _to, address _router) internal
```

This is used by any router owner to decrease their available liquidity for a given asset.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | - The amount of liquidity to remove for the router |
| _local | address | - The address of the asset you're removing liquidity from. If removing liquidity of the native asset, routers may use `address(0)` or the wrapped asset |
| _to | address payable | The address that will receive the liquidity being removed |
| _router | address | The address of the router |

## StableSwapFacet

This contract is responsible for custody of closely pegged assets (eg. group of stablecoins)
and automatic market making system. Users become an LP (Liquidity Provider) by depositing their tokens
in desired ratios for an exchange of the pool token that represents their share of the pool.
Users can burn pool tokens and withdraw their share of token(s).

Each time a swap between the pooled tokens happens, a set fee incurs which effectively gets
distributed to the LPs.

In case of emergencies, admin can pause additional deposits, swaps, or single-asset withdraws - which
stops the ratio of the tokens in the pool from changing.

Users can always withdraw their tokens via multi-asset withdraws.

_Most of the logic is stored as a library `SwapUtils` for the sake of contract readability._

### StableSwapFacet__deadlineCheck_deadlineNotMet

```solidity
error StableSwapFacet__deadlineCheck_deadlineNotMet()
```

### StableSwapFacet__getSwapToken_outOfRange

```solidity
error StableSwapFacet__getSwapToken_outOfRange()
```

### StableSwapFacet__getSwapTokenIndex_notExist

```solidity
error StableSwapFacet__getSwapTokenIndex_notExist()
```

### StableSwapFacet__getSwapTokenBalance_indexOutOfRange

```solidity
error StableSwapFacet__getSwapTokenBalance_indexOutOfRange()
```

### deadlineCheck

```solidity
modifier deadlineCheck(uint256 deadline)
```

Modifier to check deadline against current timestamp

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| deadline | uint256 | latest timestamp to accept this transaction |

### getSwapStorage

```solidity
function getSwapStorage(bytes32 key) external view returns (struct SwapUtils.Swap)
```

Return Stable swap storage

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct SwapUtils.Swap | SwapUtils.Swap |

### getSwapLPToken

```solidity
function getSwapLPToken(bytes32 key) external view returns (address)
```

Return LP token for canonical Id

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | LPToken |

### getSwapA

```solidity
function getSwapA(bytes32 key) external view returns (uint256)
```

Return A, the amplification coefficient * n * (n - 1)

_See the StableSwap paper for details_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter |

### getSwapAPrecise

```solidity
function getSwapAPrecise(bytes32 key) external view returns (uint256)
```

Return A in its raw precision form

_See the StableSwap paper for details_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter in its raw precision form |

### getSwapToken

```solidity
function getSwapToken(bytes32 key, uint8 index) public view returns (contract IERC20)
```

Return address of the pooled token at given index. Reverts if tokenIndex is out of range.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| index | uint8 | the index of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IERC20 | address of the token at given index |

### getSwapTokenIndex

```solidity
function getSwapTokenIndex(bytes32 key, address tokenAddress) public view returns (uint8)
```

Return the index of the given token address. Reverts if no matching
token is found.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| tokenAddress | address | address of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | the index of the given token address |

### getSwapTokenBalance

```solidity
function getSwapTokenBalance(bytes32 key, uint8 index) external view returns (uint256)
```

Return current balance of the pooled token at given index

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| index | uint8 | the index of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | current balance of the pooled token at given index with token's native precision |

### getSwapVirtualPrice

```solidity
function getSwapVirtualPrice(bytes32 key) external view returns (uint256)
```

Get the virtual price, to help calculate profit

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the virtual price, scaled to the POOL_PRECISION_DECIMALS |

### calculateSwap

```solidity
function calculateSwap(bytes32 key, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx) external view returns (uint256)
```

Calculate amount of tokens you receive on swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dx | uint256 | the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens the user will receive |

### calculateSwapTokenAmount

```solidity
function calculateSwapTokenAmount(bytes32 key, uint256[] amounts, bool deposit) external view returns (uint256)
```

A simple method to calculate prices from deposits or
withdrawals, excluding fees but including slippage. This is
helpful as an input into the various "min" parameters on calls
to fight front-running

_This shouldn't be used outside frontends for user estimates._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amounts | uint256[] | an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee. |
| deposit | bool | whether this is a deposit or a withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | token amount the user will receive |

### calculateRemoveSwapLiquidity

```solidity
function calculateRemoveSwapLiquidity(bytes32 key, uint256 amount) external view returns (uint256[])
```

A simple method to calculate amount of each underlying
tokens that is returned upon burning given amount of LP tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amount | uint256 | the amount of LP tokens that would be burned on withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | array of token balances that the user will receive |

### calculateRemoveSwapLiquidityOneToken

```solidity
function calculateRemoveSwapLiquidityOneToken(bytes32 key, uint256 tokenAmount, uint8 tokenIndex) external view returns (uint256 availableTokenAmount)
```

Calculate the amount of underlying token available to withdraw
when withdrawing via only single token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| tokenAmount | uint256 | the amount of LP token to burn |
| tokenIndex | uint8 | index of which token will be withdrawn |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| availableTokenAmount | uint256 | calculated amount of underlying token available to withdraw |

### getSwapAdminBalance

```solidity
function getSwapAdminBalance(bytes32 key, uint256 index) external view returns (uint256)
```

This function reads the accumulated amount of admin fees of the token with given index

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| index | uint256 | Index of the pooled token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | admin's token balance in the token's precision |

### swap

```solidity
function swap(bytes32 key, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy, uint256 deadline) external returns (uint256)
```

Swap two tokens using this pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| tokenIndexFrom | uint8 | the token the user wants to swap from |
| tokenIndexTo | uint8 | the token the user wants to swap to |
| dx | uint256 | the amount of tokens the user wants to swap from |
| minDy | uint256 | the min amount the user would like to receive, or revert. |
| deadline | uint256 | latest timestamp to accept this transaction |

### swapExact

```solidity
function swapExact(bytes32 key, uint256 amountIn, address assetIn, address assetOut, uint256 minAmountOut, uint256 deadline) external returns (uint256)
```

Swap two tokens using this pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amountIn | uint256 | the amount of tokens the user wants to swap from |
| assetIn | address | the token the user wants to swap from |
| assetOut | address | the token the user wants to swap to |
| minAmountOut | uint256 |  |
| deadline | uint256 |  |

### swapExactOut

```solidity
function swapExactOut(bytes32 key, uint256 amountOut, address assetIn, address assetOut, uint256 maxAmountIn, uint256 deadline) external returns (uint256)
```

Swap two tokens using this pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amountOut | uint256 | the amount of tokens the user wants to swap to |
| assetIn | address | the token the user wants to swap from |
| assetOut | address | the token the user wants to swap to |
| maxAmountIn | uint256 |  |
| deadline | uint256 |  |

### addSwapLiquidity

```solidity
function addSwapLiquidity(bytes32 key, uint256[] amounts, uint256 minToMint, uint256 deadline) external returns (uint256)
```

Add liquidity to the pool with the given amounts of tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amounts | uint256[] | the amounts of each token to add, in their native precision |
| minToMint | uint256 | the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of LP token user minted and received |

### removeSwapLiquidity

```solidity
function removeSwapLiquidity(bytes32 key, uint256 amount, uint256[] minAmounts, uint256 deadline) external returns (uint256[])
```

Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly
over period of 4 weeks since last deposit will apply.

_Liquidity can always be removed, even when the pool is paused._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amount | uint256 | the amount of LP tokens to burn |
| minAmounts | uint256[] | the minimum amounts of each token in the pool        acceptable for this burn. Useful as a front-running mitigation |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | amounts of tokens user received |

### removeSwapLiquidityOneToken

```solidity
function removeSwapLiquidityOneToken(bytes32 key, uint256 tokenAmount, uint8 tokenIndex, uint256 minAmount, uint256 deadline) external returns (uint256)
```

Remove liquidity from the pool all in one token. Withdraw fee that decays linearly
over period of 4 weeks since last deposit will apply.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| tokenAmount | uint256 | the amount of the token you want to receive |
| tokenIndex | uint8 | the index of the token you want to receive |
| minAmount | uint256 | the minimum amount to withdraw, otherwise revert |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of chosen token user received |

### removeSwapLiquidityImbalance

```solidity
function removeSwapLiquidityImbalance(bytes32 key, uint256[] amounts, uint256 maxBurnAmount, uint256 deadline) external returns (uint256)
```

Remove liquidity from the pool, weighted differently than the
pool's current balances. Withdraw fee that decays linearly
over period of 4 weeks since last deposit will apply.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical id + domain |
| amounts | uint256[] | how much of each token to withdraw |
| maxBurnAmount | uint256 | the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation. |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of LP tokens burned |

## SwapAdminFacet

Contract module which exposes only-admin controls for the StableSwapFacet
contract.

_This module is used through inheritance. It will make available the
modifier `onlyOwner`, which can be applied to your functions to restrict
their use to the owner._

### SwapAdminFacet__initializeSwap_alreadyInitialized

```solidity
error SwapAdminFacet__initializeSwap_alreadyInitialized()
```

### SwapAdminFacet__initializeSwap_invalidPooledTokens

```solidity
error SwapAdminFacet__initializeSwap_invalidPooledTokens()
```

### SwapAdminFacet__initializeSwap_decimalsMismatch

```solidity
error SwapAdminFacet__initializeSwap_decimalsMismatch()
```

### SwapAdminFacet__initializeSwap_duplicateTokens

```solidity
error SwapAdminFacet__initializeSwap_duplicateTokens()
```

### SwapAdminFacet__initializeSwap_zeroTokenAddress

```solidity
error SwapAdminFacet__initializeSwap_zeroTokenAddress()
```

### SwapAdminFacet__initializeSwap_tokenDecimalsExceedMax

```solidity
error SwapAdminFacet__initializeSwap_tokenDecimalsExceedMax()
```

### SwapAdminFacet__initializeSwap_aExceedMax

```solidity
error SwapAdminFacet__initializeSwap_aExceedMax()
```

### SwapAdminFacet__initializeSwap_feeExceedMax

```solidity
error SwapAdminFacet__initializeSwap_feeExceedMax()
```

### SwapAdminFacet__initializeSwap_adminFeeExceedMax

```solidity
error SwapAdminFacet__initializeSwap_adminFeeExceedMax()
```

### SwapAdminFacet__initializeSwap_failedInitLpTokenClone

```solidity
error SwapAdminFacet__initializeSwap_failedInitLpTokenClone()
```

### SwapInitialized

```solidity
event SwapInitialized(bytes32 key, struct SwapUtils.Swap swap, address caller)
```

Emitted when the owner calls `initializeSwap`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - Identifier for asset |
| swap | struct SwapUtils.Swap | - The swap that was initialized |
| caller | address | - The caller of the function |

### AdminFeesWithdrawn

```solidity
event AdminFeesWithdrawn(bytes32 key, address caller)
```

Emitted when the owner withdraws admin fees

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - Identifier for asset |
| caller | address | - The caller of the function |

### AdminFeesSet

```solidity
event AdminFeesSet(bytes32 key, uint256 newAdminFee, address caller)
```

Emitted when the owner sets admin fees

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - Identifier for asset |
| newAdminFee | uint256 | - The updated fee |
| caller | address | - The caller of the function |

### SwapFeesSet

```solidity
event SwapFeesSet(bytes32 key, uint256 newSwapFee, address caller)
```

Emitted when the owner sets swap fees

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - Identifier for asset |
| newSwapFee | uint256 | - The updated fee |
| caller | address | - The caller of the function |

### RampAStarted

```solidity
event RampAStarted(bytes32 key, uint256 futureA, uint256 futureTime, address caller)
```

Emitted when the owner starts ramping up or down the A parameter

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - Identifier for asset |
| futureA | uint256 | - The final A value after ramp |
| futureTime | uint256 | - The time A should reach the final value |
| caller | address | - The caller of the function |

### RampAStopped

```solidity
event RampAStopped(bytes32 key, address caller)
```

Emitted when the owner stops ramping up or down the A parameter

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - Identifier for asset |
| caller | address | - The caller of the function |

### initializeSwap

```solidity
function initializeSwap(bytes32 _key, contract IERC20[] _pooledTokens, uint8[] decimals, string lpTokenName, string lpTokenSymbol, uint256 _a, uint256 _fee, uint256 _adminFee, address lpTokenTargetAddress) external
```

Initializes this Swap contract with the given parameters.
This will also clone a LPToken contract that represents users'
LP positions. The owner of LPToken will be this contract - which means
only this contract is allowed to mint/burn tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | the hash of the canonical id and domain for token |
| _pooledTokens | contract IERC20[] | an array of ERC20s this pool will accept |
| decimals | uint8[] | the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS |
| lpTokenName | string | the long-form name of the token to be deployed |
| lpTokenSymbol | string | the short symbol for the token to be deployed |
| _a | uint256 | the amplification coefficient * n * (n - 1). See the StableSwap paper for details |
| _fee | uint256 | default swap fee to be initialized with |
| _adminFee | uint256 | default adminFee to be initialized with |
| lpTokenTargetAddress | address | the address of an existing LPToken contract to use as a target |

### withdrawSwapAdminFees

```solidity
function withdrawSwapAdminFees(bytes32 key) external
```

Withdraw all admin fees to the contract owner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical domain and id |

### setSwapAdminFee

```solidity
function setSwapAdminFee(bytes32 key, uint256 newAdminFee) external
```

Update the admin fee. Admin fee takes portion of the swap fee.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical domain and id |
| newAdminFee | uint256 | new admin fee to be applied on future transactions |

### setSwapFee

```solidity
function setSwapFee(bytes32 key, uint256 newSwapFee) external
```

Update the swap fee to be applied on swaps

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical domain and id |
| newSwapFee | uint256 | new swap fee to be applied on future transactions |

### rampA

```solidity
function rampA(bytes32 key, uint256 futureA, uint256 futureTime) external
```

Start ramping up or down A parameter towards given futureA and futureTime
Checks if the change is too rapid, and commits the new A value only when it falls under
the limit range.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical domain and id |
| futureA | uint256 | the new A to ramp towards |
| futureTime | uint256 | timestamp when the new A should be reached |

### stopRampA

```solidity
function stopRampA(bytes32 key) external
```

Stop ramping A immediately. Reverts if ramp A is already stopped.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | Hash of the canonical domain and id |

## TokenFacet

### TokenFacet__addAssetId_nativeAsset

```solidity
error TokenFacet__addAssetId_nativeAsset()
```

### TokenFacet__addAssetId_alreadyAdded

```solidity
error TokenFacet__addAssetId_alreadyAdded()
```

### TokenFacet__removeAssetId_notAdded

```solidity
error TokenFacet__removeAssetId_notAdded()
```

### TokenFacet__updateDetails_localNotFound

```solidity
error TokenFacet__updateDetails_localNotFound()
```

### TokenDeployed

```solidity
event TokenDeployed(uint32 domain, bytes32 id, address representation)
```

emitted when a representation token contract is deployed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | uint32 | the domain of the chain where the canonical asset is deployed |
| id | bytes32 | the bytes32 address of the canonical token contract |
| representation | address | the address of the newly locally deployed representation contract |

### StableSwapAdded

```solidity
event StableSwapAdded(bytes32 key, bytes32 canonicalId, uint32 domain, address swapPool, address caller)
```

Emitted when a new stable-swap AMM is added for the local to adopted token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - The key in the mapping (hash of canonical id and domain) |
| canonicalId | bytes32 | - The canonical identifier of the token the local to adopted AMM is for |
| domain | uint32 | - The domain of the canonical token for the local to adopted amm |
| swapPool | address | - The address of the AMM |
| caller | address | - The account that called the function |

### LiquidityCapUpdated

```solidity
event LiquidityCapUpdated(bytes32 key, bytes32 canonicalId, uint32 domain, uint256 cap, address caller)
```

Emitted when a liquidity cap is updated

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - The key in the mapping (hash of canonical id and domain) |
| canonicalId | bytes32 | - The canonical identifier of the token the local to adopted AMM is for |
| domain | uint32 | - The domain of the canonical token for the local to adopted amm |
| cap | uint256 | - The newly enforced liquidity cap (if it is 0, no cap is enforced) |
| caller | address | - The account that called the function |

### AssetAdded

```solidity
event AssetAdded(bytes32 key, bytes32 canonicalId, uint32 domain, address adoptedAsset, address localAsset, address caller)
```

Emitted when a new asset is added

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - The key in the mapping (hash of canonical id and domain) |
| canonicalId | bytes32 | - The canonical identifier of the token the local to adopted AMM is for |
| domain | uint32 | - The domain of the canonical token for the local to adopted amm |
| adoptedAsset | address | - The address of the adopted (user-expected) asset |
| localAsset | address | - The address of the local asset |
| caller | address | - The account that called the function |

### AssetRemoved

```solidity
event AssetRemoved(bytes32 key, address caller)
```

Emitted when an asset is removed from whitelists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | - The hash of the canonical identifier and domain of the token removed |
| caller | address | - The account that called the function |

### canonicalToAdopted

```solidity
function canonicalToAdopted(bytes32 _key) public view returns (address)
```

### canonicalToAdopted

```solidity
function canonicalToAdopted(struct TokenId _canonical) public view returns (address)
```

### adoptedToCanonical

```solidity
function adoptedToCanonical(address _adopted) public view returns (struct TokenId)
```

### canonicalToRepresentation

```solidity
function canonicalToRepresentation(bytes32 _key) public view returns (address)
```

### canonicalToRepresentation

```solidity
function canonicalToRepresentation(struct TokenId _canonical) public view returns (address)
```

### representationToCanonical

```solidity
function representationToCanonical(address _representation) public view returns (struct TokenId)
```

### getTokenId

```solidity
function getTokenId(address _candidate) public view returns (struct TokenId)
```

### getLocalAndAdoptedToken

```solidity
function getLocalAndAdoptedToken(bytes32 _id, uint32 _domain) public view returns (address, address)
```

### approvedAssets

```solidity
function approvedAssets(bytes32 _key) public view returns (bool)
```

### approvedAssets

```solidity
function approvedAssets(struct TokenId _canonical) public view returns (bool)
```

### adoptedToLocalPools

```solidity
function adoptedToLocalPools(bytes32 _key) public view returns (contract IStableSwap)
```

### adoptedToLocalPools

```solidity
function adoptedToLocalPools(struct TokenId _canonical) public view returns (contract IStableSwap)
```

### setupAsset

```solidity
function setupAsset(struct TokenId _canonical, uint8 _canonicalDecimals, string _representationName, string _representationSymbol, address _adoptedAssetId, address _stableSwapPool, uint256 _cap) external returns (address _local)
```

Used to add supported assets. This is an admin only function

_When whitelisting the canonical asset, all representational assets would be
whitelisted as well. In the event you have a different adopted asset (i.e. PoS USDC
on polygon), you should *not* whitelist the adopted asset. The stable swap pool
address used should allow you to swap between the local to adopted asset._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _canonical | struct TokenId | - The canonical asset to add by id and domain. All representations will be whitelisted as well |
| _canonicalDecimals | uint8 |  |
| _representationName | string |  |
| _representationSymbol | string |  |
| _adoptedAssetId | address | - The used asset id for this domain (e.g. PoS USDC for polygon) |
| _stableSwapPool | address | - The address of the local stableswap pool, if it exists. |
| _cap | uint256 |  |

### setupAssetWithDeployedRepresentation

```solidity
function setupAssetWithDeployedRepresentation(struct TokenId _canonical, address _representation, address _adoptedAssetId, address _stableSwapPool, uint256 _cap) external returns (address)
```

### addStableSwapPool

```solidity
function addStableSwapPool(struct TokenId _canonical, address _stableSwapPool) external
```

Adds a stable swap pool for the local to adopted asset.

_Must pass in the _canonical information so it can be emitted in event_

### updateLiquidityCap

```solidity
function updateLiquidityCap(struct TokenId _canonical, uint256 _updated) external
```

Adds a stable swap pool for the local to adopted asset.

_Must pass in the _canonical information so it can be emitted in event_

### removeAssetId

```solidity
function removeAssetId(bytes32 _key, address _adoptedAssetId, address _representation) external
```

Used to remove assets from the whitelist

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | - The hash of the canonical id and domain to remove (mapping key) |
| _adoptedAssetId | address | - Corresponding adopted asset to remove |
| _representation | address |  |

### removeAssetId

```solidity
function removeAssetId(struct TokenId _canonical, address _adoptedAssetId, address _representation) external
```

Used to remove assets from the whitelist

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _canonical | struct TokenId | - The canonical id and domain to remove |
| _adoptedAssetId | address | - Corresponding adopted asset to remove |
| _representation | address |  |

### updateDetails

```solidity
function updateDetails(struct TokenId _canonical, string _name, string _symbol) external
```

Used to update the name and symbol of a local token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _canonical | struct TokenId | - The canonical id and domain to remove |
| _name | string | - The new name |
| _symbol | string | - The new symbol |

### _enrollAdoptedAndLocalAssets

```solidity
function _enrollAdoptedAndLocalAssets(address _adopted, address _local, address _stableSwapPool, struct TokenId _canonical) internal returns (bytes32 _key)
```

### _addStableSwapPool

```solidity
function _addStableSwapPool(struct TokenId _canonical, address _stableSwap, bytes32 _key) internal
```

Used to add an AMM for adopted to local assets

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _canonical | struct TokenId | - The canonical TokenId to add (domain and id) |
| _stableSwap | address | - The address of the amm to add |
| _key | bytes32 | - The hash of the canonical id and domain |

### _setLiquidityCap

```solidity
function _setLiquidityCap(struct TokenId _canonical, uint256 _updated, bytes32 _key) internal
```

Used to add an AMM for adopted to local assets

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _canonical | struct TokenId | - The canonical TokenId to add (domain and id) |
| _updated | uint256 | - The updated liquidity cap value |
| _key | bytes32 | - The hash of the canonical id and domain |

### _removeAssetId

```solidity
function _removeAssetId(bytes32 _key, address _adoptedAssetId, address _representation) internal
```

Used to remove assets from the whitelist

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | - The hash of the canonical id and domain to remove (mapping key) |
| _adoptedAssetId | address | - Corresponding adopted asset to remove |
| _representation | address |  |

### _deployRepresentation

```solidity
function _deployRepresentation(bytes32 _id, uint32 _domain, uint8 _decimals, string _name, string _symbol) internal returns (address _token)
```

Deploy and initialize a new token contract

_Each token contract is a proxy which
points to the token upgrade beacon_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | the address of the token contract |

## BridgeToken

### constructor

```solidity
constructor(uint8 _decimals, string _name, string _symbol) public
```

### UpdateDetails

```solidity
event UpdateDetails(string name, string symbol)
```

### burn

```solidity
function burn(address _from, uint256 _amnt) external
```

Destroys `_amnt` tokens from `_from`, reducing the
total supply.

_Emits a {Transfer} event with `to` set to the zero address.
Requirements:
- `_from` cannot be the zero address.
- `_from` must have at least `_amnt` tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | The address from which to destroy the tokens |
| _amnt | uint256 | The amount of tokens to be destroyed |

### mint

```solidity
function mint(address _to, uint256 _amnt) external
```

Creates `_amnt` tokens and assigns them to `_to`, increasing
the total supply.

_Emits a {Transfer} event with `from` set to the zero address.
Requirements:
- `to` cannot be the zero address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The destination address |
| _amnt | uint256 | The amount of tokens to be minted |

### setDetails

```solidity
function setDetails(string _newName, string _newSymbol) external
```

Set the details of a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newName | string | The new name |
| _newSymbol | string | The new symbol |

### balanceOf

```solidity
function balanceOf(address _account) public view returns (uint256)
```

_See {IERC20-balanceOf}._

### name

```solidity
function name() public view returns (string)
```

_Returns the name of the token._

### symbol

```solidity
function symbol() public view returns (string)
```

_Returns the symbol of the token, usually a shorter version of the
name._

### decimals

```solidity
function decimals() public view returns (uint8)
```

_Returns the number of decimals used to get its user representation.
For example, if `decimals` equals `2`, a balance of `505` tokens should
be displayed to a user as `5,05` (`505 / 10 ** 2`).
Tokens usually opt for a value of 18, imitating the relationship between
Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
called.
NOTE: This information is only used for _display_ purposes: it in
no way affects any of the arithmetic of the contract, including
{IERC20-balanceOf} and {IERC20-transfer}._

## ConnextPriceOracle

### wrapped

```solidity
address wrapped
```

### v1PriceOracle

```solidity
address v1PriceOracle
```

### VALID_PERIOD

```solidity
uint256 VALID_PERIOD
```

### PriceSource

```solidity
enum PriceSource {
  NA,
  DIRECT,
  CHAINLINK,
  DEX,
  V1_ORACLE
}
```

### aggregators

```solidity
mapping(address => contract AggregatorV3Interface) aggregators
```

Chainlink Aggregators

### Price

```solidity
struct Price {
  uint256 updatedAt;
  uint256 price;
}
```

### assetPrices

```solidity
mapping(address => struct ConnextPriceOracle.Price) assetPrices
```

### NewAdmin

```solidity
event NewAdmin(address oldAdmin, address newAdmin)
```

### PriceRecordUpdated

```solidity
event PriceRecordUpdated(address token, address baseToken, address lpToken, bool _active)
```

### DirectPriceUpdated

```solidity
event DirectPriceUpdated(address token, uint256 oldPrice, uint256 newPrice)
```

### AggregatorUpdated

```solidity
event AggregatorUpdated(address tokenAddress, address source)
```

### V1PriceOracleUpdated

```solidity
event V1PriceOracleUpdated(address oldAddress, address newAddress)
```

### constructor

```solidity
constructor(address _wrapped) public
```

### getTokenPrice

```solidity
function getTokenPrice(address _tokenAddress) public view returns (uint256, uint256)
```

### getPriceFromOracle

```solidity
function getPriceFromOracle(address _tokenAddress) public view returns (uint256)
```

### getPriceFromChainlink

```solidity
function getPriceFromChainlink(address _tokenAddress) public view returns (uint256)
```

### setDirectPrice

```solidity
function setDirectPrice(address _token, uint256 _price, uint256 _timestamp) external
```

### setV1PriceOracle

```solidity
function setV1PriceOracle(address _v1PriceOracle) external
```

### setAggregators

```solidity
function setAggregators(address[] tokenAddresses, address[] sources) external
```

## PriceOracle

### isPriceOracle

```solidity
bool isPriceOracle
```

Indicator that this is a PriceOracle contract (for inspection)

### getTokenPrice

```solidity
function getTokenPrice(address token) external view virtual returns (uint256, uint256)
```

Get the price of a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to get the price of |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The asset price mantissa (scaled by 1e18).  Zero means the price is unavailable. |
| [1] | uint256 | The source of the price. enum (NA, DIRECT, CHAINLINK, DEX, V1_ORACLE) |

## StableSwap

This contract is responsible for custody of closely pegged assets (eg. group of stablecoins)
and automatic market making system. Users become an LP (Liquidity Provider) by depositing their tokens
in desired ratios for an exchange of the pool token that represents their share of the pool.
Users can burn pool tokens and withdraw their share of token(s).

Each time a swap between the pooled tokens happens, a set fee incurs which effectively gets
distributed to the LPs.

In case of emergencies, admin can pause additional deposits, swaps, or single-asset withdraws - which
stops the ratio of the tokens in the pool from changing.
Users can always withdraw their tokens via multi-asset withdraws.

_Most of the logic is stored as a library `SwapUtils` for the sake of reducing contract's
deployment size._

### SwapInitialized

```solidity
event SwapInitialized(struct SwapUtilsExternal.Swap swap, address caller)
```

### __GAP

```solidity
uint256[49] __GAP
```

### swapStorage

```solidity
struct SwapUtilsExternal.Swap swapStorage
```

### tokenIndexes

```solidity
mapping(address => uint8) tokenIndexes
```

### initialize

```solidity
function initialize(contract IERC20[] _pooledTokens, uint8[] decimals, string lpTokenName, string lpTokenSymbol, uint256 _a, uint256 _fee, uint256 _adminFee, address lpTokenTargetAddress) public
```

Initializes this Swap contract with the given parameters.
This will also clone a LPToken contract that represents users'
LP positions. The owner of LPToken will be this contract - which means
only this contract is allowed to mint/burn tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _pooledTokens | contract IERC20[] | an array of ERC20s this pool will accept |
| decimals | uint8[] | the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS |
| lpTokenName | string | the long-form name of the token to be deployed |
| lpTokenSymbol | string | the short symbol for the token to be deployed |
| _a | uint256 | the amplification coefficient * n * (n - 1). See the StableSwap paper for details |
| _fee | uint256 | default swap fee to be initialized with |
| _adminFee | uint256 | default adminFee to be initialized with |
| lpTokenTargetAddress | address | the address of an existing LPToken contract to use as a target |

### deadlineCheck

```solidity
modifier deadlineCheck(uint256 deadline)
```

Modifier to check deadline against current timestamp

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| deadline | uint256 | latest timestamp to accept this transaction |

### getA

```solidity
function getA() external view returns (uint256)
```

Return A, the amplification coefficient * n * (n - 1)

_See the StableSwap paper for details_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter |

### getAPrecise

```solidity
function getAPrecise() external view returns (uint256)
```

Return A in its raw precision form

_See the StableSwap paper for details_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter in its raw precision form |

### getToken

```solidity
function getToken(uint8 index) public view returns (contract IERC20)
```

Return address of the pooled token at given index. Reverts if tokenIndex is out of range.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint8 | the index of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IERC20 | address of the token at given index |

### getTokenIndex

```solidity
function getTokenIndex(address tokenAddress) public view returns (uint8)
```

Return the index of the given token address. Reverts if no matching
token is found.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | address of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | the index of the given token address |

### getTokenBalance

```solidity
function getTokenBalance(uint8 index) external view returns (uint256)
```

Return current balance of the pooled token at given index

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint8 | the index of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | current balance of the pooled token at given index with token's native precision |

### getVirtualPrice

```solidity
function getVirtualPrice() external view returns (uint256)
```

Get the virtual price, to help calculate profit

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the virtual price, scaled to the POOL_PRECISION_DECIMALS |

### calculateSwap

```solidity
function calculateSwap(uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx) external view returns (uint256)
```

Calculate amount of tokens you receive on swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dx | uint256 | the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens the user will receive |

### calculateSwapOut

```solidity
function calculateSwapOut(uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy) external view returns (uint256)
```

Calculate amount of tokens you receive on swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dy | uint256 | the amount of tokens the user wants to buy |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens the user have to transfer |

### calculateSwapFromAddress

```solidity
function calculateSwapFromAddress(address assetIn, address assetOut, uint256 amountIn) external view returns (uint256)
```

Calculate amount of tokens you receive on swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| assetIn | address | the token the user wants to swap from |
| assetOut | address | the token the user wants to swap to |
| amountIn | uint256 | the amount of tokens the user wants to swap from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens the user will receive |

### calculateSwapOutFromAddress

```solidity
function calculateSwapOutFromAddress(address assetIn, address assetOut, uint256 amountOut) external view returns (uint256)
```

Calculate amount of tokens you receive on swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| assetIn | address | the token the user wants to swap from |
| assetOut | address | the token the user wants to swap to |
| amountOut | uint256 | the amount of tokens the user wants to swap to |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens the user will receive |

### calculateTokenAmount

```solidity
function calculateTokenAmount(uint256[] amounts, bool deposit) external view returns (uint256)
```

A simple method to calculate prices from deposits or
withdrawals, excluding fees but including slippage. This is
helpful as an input into the various "min" parameters on calls
to fight front-running

_This shouldn't be used outside frontends for user estimates._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amounts | uint256[] | an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee. |
| deposit | bool | whether this is a deposit or a withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | token amount the user will receive |

### calculateRemoveLiquidity

```solidity
function calculateRemoveLiquidity(uint256 amount) external view returns (uint256[])
```

A simple method to calculate amount of each underlying
tokens that is returned upon burning given amount of LP tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | the amount of LP tokens that would be burned on withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | array of token balances that the user will receive |

### calculateRemoveLiquidityOneToken

```solidity
function calculateRemoveLiquidityOneToken(uint256 tokenAmount, uint8 tokenIndex) external view returns (uint256 availableTokenAmount)
```

Calculate the amount of underlying token available to withdraw
when withdrawing via only single token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAmount | uint256 | the amount of LP token to burn |
| tokenIndex | uint8 | index of which token will be withdrawn |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| availableTokenAmount | uint256 | calculated amount of underlying token available to withdraw |

### getAdminBalance

```solidity
function getAdminBalance(uint256 index) external view returns (uint256)
```

This function reads the accumulated amount of admin fees of the token with given index

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | Index of the pooled token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | admin's token balance in the token's precision |

### swap

```solidity
function swap(uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy, uint256 deadline) external returns (uint256)
```

Swap two tokens using this pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIndexFrom | uint8 | the token the user wants to swap from |
| tokenIndexTo | uint8 | the token the user wants to swap to |
| dx | uint256 | the amount of tokens the user wants to swap from |
| minDy | uint256 | the min amount the user would like to receive, or revert. |
| deadline | uint256 | latest timestamp to accept this transaction |

### swapExact

```solidity
function swapExact(uint256 amountIn, address assetIn, address assetOut, uint256 minAmountOut, uint256 deadline) external payable returns (uint256)
```

Swap two tokens using this pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | the amount of tokens the user wants to swap from |
| assetIn | address | the token the user wants to swap from |
| assetOut | address | the token the user wants to swap to |
| minAmountOut | uint256 | the min amount of tokens the user wants to swap to |
| deadline | uint256 |  |

### swapExactOut

```solidity
function swapExactOut(uint256 amountOut, address assetIn, address assetOut, uint256 maxAmountIn, uint256 deadline) external payable returns (uint256)
```

Swap two tokens using this pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | the amount of tokens the user wants to swap to |
| assetIn | address | the token the user wants to swap from |
| assetOut | address | the token the user wants to swap to |
| maxAmountIn | uint256 | the max amount of tokens the user wants to swap from |
| deadline | uint256 |  |

### addLiquidity

```solidity
function addLiquidity(uint256[] amounts, uint256 minToMint, uint256 deadline) external returns (uint256)
```

Add liquidity to the pool with the given amounts of tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amounts | uint256[] | the amounts of each token to add, in their native precision |
| minToMint | uint256 | the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of LP token user minted and received |

### removeLiquidity

```solidity
function removeLiquidity(uint256 amount, uint256[] minAmounts, uint256 deadline) external returns (uint256[])
```

Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly
over period of 4 weeks since last deposit will apply.

_Liquidity can always be removed, even when the pool is paused._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | the amount of LP tokens to burn |
| minAmounts | uint256[] | the minimum amounts of each token in the pool        acceptable for this burn. Useful as a front-running mitigation |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | amounts of tokens user received |

### removeLiquidityOneToken

```solidity
function removeLiquidityOneToken(uint256 tokenAmount, uint8 tokenIndex, uint256 minAmount, uint256 deadline) external returns (uint256)
```

Remove liquidity from the pool all in one token. Withdraw fee that decays linearly
over period of 4 weeks since last deposit will apply.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAmount | uint256 | the amount of the token you want to receive |
| tokenIndex | uint8 | the index of the token you want to receive |
| minAmount | uint256 | the minimum amount to withdraw, otherwise revert |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of chosen token user received |

### removeLiquidityImbalance

```solidity
function removeLiquidityImbalance(uint256[] amounts, uint256 maxBurnAmount, uint256 deadline) external returns (uint256)
```

Remove liquidity from the pool, weighted differently than the
pool's current balances. Withdraw fee that decays linearly
over period of 4 weeks since last deposit will apply.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amounts | uint256[] | how much of each token to withdraw |
| maxBurnAmount | uint256 | the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation. |
| deadline | uint256 | latest timestamp to accept this transaction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of LP tokens burned |

### withdrawAdminFees

```solidity
function withdrawAdminFees() external
```

Withdraw all admin fees to the contract owner

### setAdminFee

```solidity
function setAdminFee(uint256 newAdminFee) external
```

Update the admin fee. Admin fee takes portion of the swap fee.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAdminFee | uint256 | new admin fee to be applied on future transactions |

### setSwapFee

```solidity
function setSwapFee(uint256 newSwapFee) external
```

Update the swap fee to be applied on swaps

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newSwapFee | uint256 | new swap fee to be applied on future transactions |

### rampA

```solidity
function rampA(uint256 futureA, uint256 futureTime) external
```

Start ramping up or down A parameter towards given futureA and futureTime
Checks if the change is too rapid, and commits the new A value only when it falls under
the limit range.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| futureA | uint256 | the new A to ramp towards |
| futureTime | uint256 | timestamp when the new A should be reached |

### stopRampA

```solidity
function stopRampA() external
```

Stop ramping A immediately. Reverts if ramp A is already stopped.

## IAavePool

### mintUnbacked

```solidity
function mintUnbacked(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external
```

_Mints an `amount` of aTokens to the `onBehalfOf`_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset | address | The address of the underlying asset to mint |
| amount | uint256 | The amount to mint |
| onBehalfOf | address | The address that will receive the aTokens |
| referralCode | uint16 | Code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man |

### backUnbacked

```solidity
function backUnbacked(address asset, uint256 amount, uint256 fee) external
```

_Back the current unbacked underlying with `amount` and pay `fee`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset | address | The address of the underlying asset to back |
| amount | uint256 | The amount to back |
| fee | uint256 | The amount paid in fees |

### withdraw

```solidity
function withdraw(address asset, uint256 amount, address to) external returns (uint256)
```

Withdraws an `amount` of underlying asset from the reserve, burning the equivalent aTokens owned
E.g. User has 100 aUSDC, calls withdraw() and receives 100 USDC, burning the 100 aUSDC

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset | address | The address of the underlying asset to withdraw |
| amount | uint256 | The underlying amount to be withdrawn   - Send the value type(uint256).max in order to withdraw the whole aToken balance |
| to | address | The address that will receive the underlying, same as msg.sender if the user   wants to receive it on his own wallet, or a different address if the beneficiary is a   different wallet |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The final amount withdrawn |

## IBridgeToken

### name

```solidity
function name() external returns (string)
```

### balanceOf

```solidity
function balanceOf(address _account) external view returns (uint256)
```

### symbol

```solidity
function symbol() external view returns (string)
```

### decimals

```solidity
function decimals() external view returns (uint8)
```

### burn

```solidity
function burn(address _from, uint256 _amnt) external
```

### mint

```solidity
function mint(address _to, uint256 _amnt) external
```

### setDetails

```solidity
function setDetails(string _name, string _symbol) external
```

## IConnext

### canonicalToAdopted

```solidity
function canonicalToAdopted(bytes32 _key) external view returns (address)
```

### canonicalToAdopted

```solidity
function canonicalToAdopted(struct TokenId _canonical) external view returns (address)
```

### adoptedToCanonical

```solidity
function adoptedToCanonical(address _adopted) external view returns (struct TokenId)
```

### canonicalToRepresentation

```solidity
function canonicalToRepresentation(bytes32 _key) external view returns (address)
```

### canonicalToRepresentation

```solidity
function canonicalToRepresentation(struct TokenId _canonical) external view returns (address)
```

### representationToCanonical

```solidity
function representationToCanonical(address _adopted) external view returns (struct TokenId)
```

### getLocalAndAdoptedToken

```solidity
function getLocalAndAdoptedToken(bytes32 _id, uint32 _domain) external view returns (address, address)
```

### approvedAssets

```solidity
function approvedAssets(bytes32 _key) external view returns (bool)
```

### approvedAssets

```solidity
function approvedAssets(struct TokenId _canonical) external view returns (bool)
```

### adoptedToLocalPools

```solidity
function adoptedToLocalPools(bytes32 _key) external view returns (contract IStableSwap)
```

### adoptedToLocalPools

```solidity
function adoptedToLocalPools(struct TokenId _canonical) external view returns (contract IStableSwap)
```

### getTokenId

```solidity
function getTokenId(address _candidate) external view returns (struct TokenId)
```

### setupAsset

```solidity
function setupAsset(struct TokenId _canonical, uint8 _canonicalDecimals, string _representationName, string _representationSymbol, address _adoptedAssetId, address _stableSwapPool, uint256 _cap) external returns (address)
```

### setupAssetWithDeployedRepresentation

```solidity
function setupAssetWithDeployedRepresentation(struct TokenId _canonical, address _representation, address _adoptedAssetId, address _stableSwapPool, uint256 _cap) external returns (address)
```

### addStableSwapPool

```solidity
function addStableSwapPool(struct TokenId _canonical, address _stableSwapPool) external
```

### updateLiquidityCap

```solidity
function updateLiquidityCap(struct TokenId _canonical, uint256 _updated) external
```

### removeAssetId

```solidity
function removeAssetId(bytes32 _key, address _adoptedAssetId, address _representation) external
```

### removeAssetId

```solidity
function removeAssetId(struct TokenId _canonical, address _adoptedAssetId, address _representation) external
```

### updateDetails

```solidity
function updateDetails(struct TokenId _canonical, string _name, string _symbol) external
```

### routedTransfers

```solidity
function routedTransfers(bytes32 _transferId) external view returns (address[])
```

### transferStatus

```solidity
function transferStatus(bytes32 _transferId) external view returns (enum DestinationTransferStatus)
```

### remote

```solidity
function remote(uint32 _domain) external view returns (address)
```

### domain

```solidity
function domain() external view returns (uint256)
```

### nonce

```solidity
function nonce() external view returns (uint256)
```

### approvedSequencers

```solidity
function approvedSequencers(address _sequencer) external view returns (bool)
```

### xAppConnectionManager

```solidity
function xAppConnectionManager() external view returns (address)
```

### addConnextion

```solidity
function addConnextion(uint32 _domain, address _connext) external
```

### addSequencer

```solidity
function addSequencer(address _sequencer) external
```

### removeSequencer

```solidity
function removeSequencer(address _sequencer) external
```

### xcall

```solidity
function xcall(uint32 _destination, address _to, address _asset, address _delegate, uint256 _amount, uint256 _slippage, bytes _callData) external payable returns (bytes32)
```

### xcallIntoLocal

```solidity
function xcallIntoLocal(uint32 _destination, address _to, address _asset, address _delegate, uint256 _amount, uint256 _slippage, bytes _callData) external payable returns (bytes32)
```

### execute

```solidity
function execute(struct ExecuteArgs _args) external returns (bytes32 transferId)
```

### forceUpdateSlippage

```solidity
function forceUpdateSlippage(struct TransferInfo _params, uint256 _slippage) external
```

### bumpTransfer

```solidity
function bumpTransfer(bytes32 _transferId) external payable
```

### setXAppConnectionManager

```solidity
function setXAppConnectionManager(address _xAppConnectionManager) external
```

### enrollRemoteRouter

```solidity
function enrollRemoteRouter(uint32 _domain, bytes32 _router) external
```

### enrollCustom

```solidity
function enrollCustom(uint32 _domain, bytes32 _id, address _custom) external
```

### handle

```solidity
function handle(uint32 _origin, uint32 _nonce, bytes32 _sender, bytes _message) external
```

### owner

```solidity
function owner() external view returns (address)
```

### routerWhitelistRemoved

```solidity
function routerWhitelistRemoved() external view returns (bool)
```

### assetWhitelistRemoved

```solidity
function assetWhitelistRemoved() external view returns (bool)
```

### proposed

```solidity
function proposed() external view returns (address)
```

### proposedTimestamp

```solidity
function proposedTimestamp() external view returns (uint256)
```

### routerWhitelistTimestamp

```solidity
function routerWhitelistTimestamp() external view returns (uint256)
```

### assetWhitelistTimestamp

```solidity
function assetWhitelistTimestamp() external view returns (uint256)
```

### delay

```solidity
function delay() external view returns (uint256)
```

### proposeRouterWhitelistRemoval

```solidity
function proposeRouterWhitelistRemoval() external
```

### removeRouterWhitelist

```solidity
function removeRouterWhitelist() external
```

### proposeAssetWhitelistRemoval

```solidity
function proposeAssetWhitelistRemoval() external
```

### removeAssetWhitelist

```solidity
function removeAssetWhitelist() external
```

### renounced

```solidity
function renounced() external view returns (bool)
```

### proposeNewOwner

```solidity
function proposeNewOwner(address newlyProposed) external
```

### renounceOwnership

```solidity
function renounceOwnership() external
```

### acceptProposedOwner

```solidity
function acceptProposedOwner() external
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

### approvedRelayers

```solidity
function approvedRelayers(address _relayer) external view returns (bool)
```

### relayerFeeVault

```solidity
function relayerFeeVault() external view returns (address)
```

### setRelayerFeeVault

```solidity
function setRelayerFeeVault(address _relayerFeeVault) external
```

### addRelayer

```solidity
function addRelayer(address _relayer) external
```

### removeRelayer

```solidity
function removeRelayer(address _relayer) external
```

### LIQUIDITY_FEE_NUMERATOR

```solidity
function LIQUIDITY_FEE_NUMERATOR() external view returns (uint256)
```

### LIQUIDITY_FEE_DENOMINATOR

```solidity
function LIQUIDITY_FEE_DENOMINATOR() external view returns (uint256)
```

### getRouterApproval

```solidity
function getRouterApproval(address _router) external view returns (bool)
```

### getRouterRecipient

```solidity
function getRouterRecipient(address _router) external view returns (address)
```

### getRouterOwner

```solidity
function getRouterOwner(address _router) external view returns (address)
```

### getProposedRouterOwner

```solidity
function getProposedRouterOwner(address _router) external view returns (address)
```

### getProposedRouterOwnerTimestamp

```solidity
function getProposedRouterOwnerTimestamp(address _router) external view returns (uint256)
```

### maxRoutersPerTransfer

```solidity
function maxRoutersPerTransfer() external view returns (uint256)
```

### routerBalances

```solidity
function routerBalances(address _router, address _asset) external view returns (uint256)
```

### getRouterApprovalForPortal

```solidity
function getRouterApprovalForPortal(address _router) external view returns (bool)
```

### setupRouter

```solidity
function setupRouter(address router, address owner, address recipient) external
```

### removeRouter

```solidity
function removeRouter(address router) external
```

### setMaxRoutersPerTransfer

```solidity
function setMaxRoutersPerTransfer(uint256 _newMaxRouters) external
```

### setLiquidityFeeNumerator

```solidity
function setLiquidityFeeNumerator(uint256 _numerator) external
```

### approveRouterForPortal

```solidity
function approveRouterForPortal(address _router) external
```

### unapproveRouterForPortal

```solidity
function unapproveRouterForPortal(address _router) external
```

### setRouterRecipient

```solidity
function setRouterRecipient(address router, address recipient) external
```

### proposeRouterOwner

```solidity
function proposeRouterOwner(address router, address proposed) external
```

### acceptProposedRouterOwner

```solidity
function acceptProposedRouterOwner(address router) external
```

### addRouterLiquidityFor

```solidity
function addRouterLiquidityFor(uint256 _amount, address _local, address _router) external payable
```

### addRouterLiquidity

```solidity
function addRouterLiquidity(uint256 _amount, address _local) external payable
```

### removeRouterLiquidityFor

```solidity
function removeRouterLiquidityFor(uint256 _amount, address _local, address payable _to, address _router) external
```

### removeRouterLiquidity

```solidity
function removeRouterLiquidity(uint256 _amount, address _local, address payable _to) external
```

### getAavePortalDebt

```solidity
function getAavePortalDebt(bytes32 _transferId) external view returns (uint256)
```

### getAavePortalFeeDebt

```solidity
function getAavePortalFeeDebt(bytes32 _transferId) external view returns (uint256)
```

### aavePool

```solidity
function aavePool() external view returns (address)
```

### aavePortalFee

```solidity
function aavePortalFee() external view returns (uint256)
```

### setAavePool

```solidity
function setAavePool(address _aavePool) external
```

### setAavePortalFee

```solidity
function setAavePortalFee(uint256 _aavePortalFeeNumerator) external
```

### repayAavePortal

```solidity
function repayAavePortal(struct TransferInfo _params, uint256 _backingAmount, uint256 _feeAmount, uint256 _maxIn) external
```

### repayAavePortalFor

```solidity
function repayAavePortalFor(struct TransferInfo _params, uint256 _backingAmount, uint256 _feeAmount) external
```

### getSwapStorage

```solidity
function getSwapStorage(bytes32 canonicalId) external view returns (struct SwapUtils.Swap)
```

### getSwapLPToken

```solidity
function getSwapLPToken(bytes32 canonicalId) external view returns (address)
```

### getSwapA

```solidity
function getSwapA(bytes32 canonicalId) external view returns (uint256)
```

### getSwapAPrecise

```solidity
function getSwapAPrecise(bytes32 canonicalId) external view returns (uint256)
```

### getSwapToken

```solidity
function getSwapToken(bytes32 canonicalId, uint8 index) external view returns (contract IERC20)
```

### getSwapTokenIndex

```solidity
function getSwapTokenIndex(bytes32 canonicalId, address tokenAddress) external view returns (uint8)
```

### getSwapTokenBalance

```solidity
function getSwapTokenBalance(bytes32 canonicalId, uint8 index) external view returns (uint256)
```

### getSwapVirtualPrice

```solidity
function getSwapVirtualPrice(bytes32 canonicalId) external view returns (uint256)
```

### calculateSwap

```solidity
function calculateSwap(bytes32 canonicalId, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx) external view returns (uint256)
```

### calculateSwapTokenAmount

```solidity
function calculateSwapTokenAmount(bytes32 canonicalId, uint256[] amounts, bool deposit) external view returns (uint256)
```

### calculateRemoveSwapLiquidity

```solidity
function calculateRemoveSwapLiquidity(bytes32 canonicalId, uint256 amount) external view returns (uint256[])
```

### calculateRemoveSwapLiquidityOneToken

```solidity
function calculateRemoveSwapLiquidityOneToken(bytes32 canonicalId, uint256 tokenAmount, uint8 tokenIndex) external view returns (uint256)
```

### getSwapAdminBalance

```solidity
function getSwapAdminBalance(bytes32 canonicalId, uint256 index) external view returns (uint256)
```

### swap

```solidity
function swap(bytes32 canonicalId, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy, uint256 deadline) external returns (uint256)
```

### swapExact

```solidity
function swapExact(bytes32 canonicalId, uint256 amountIn, address assetIn, address assetOut, uint256 minAmountOut, uint256 deadline) external payable returns (uint256)
```

### swapExactOut

```solidity
function swapExactOut(bytes32 canonicalId, uint256 amountOut, address assetIn, address assetOut, uint256 maxAmountIn, uint256 deadline) external payable returns (uint256)
```

### addSwapLiquidity

```solidity
function addSwapLiquidity(bytes32 canonicalId, uint256[] amounts, uint256 minToMint, uint256 deadline) external returns (uint256)
```

### removeSwapLiquidity

```solidity
function removeSwapLiquidity(bytes32 canonicalId, uint256 amount, uint256[] minAmounts, uint256 deadline) external returns (uint256[])
```

### removeSwapLiquidityOneToken

```solidity
function removeSwapLiquidityOneToken(bytes32 canonicalId, uint256 tokenAmount, uint8 tokenIndex, uint256 minAmount, uint256 deadline) external returns (uint256)
```

### removeSwapLiquidityImbalance

```solidity
function removeSwapLiquidityImbalance(bytes32 canonicalId, uint256[] amounts, uint256 maxBurnAmount, uint256 deadline) external returns (uint256)
```

### initializeSwap

```solidity
function initializeSwap(bytes32 _canonicalId, contract IERC20[] _pooledTokens, uint8[] decimals, string lpTokenName, string lpTokenSymbol, uint256 _a, uint256 _fee, uint256 _adminFee, address lpTokenTargetAddress) external
```

### withdrawSwapAdminFees

```solidity
function withdrawSwapAdminFees(bytes32 canonicalId) external
```

### setSwapAdminFee

```solidity
function setSwapAdminFee(bytes32 canonicalId, uint256 newAdminFee) external
```

### setSwapFee

```solidity
function setSwapFee(bytes32 canonicalId, uint256 newSwapFee) external
```

### rampA

```solidity
function rampA(bytes32 canonicalId, uint256 futureA, uint256 futureTime) external
```

### stopRampA

```solidity
function stopRampA(bytes32 canonicalId) external
```

## IPriceOracle

### getTokenPrice

```solidity
function getTokenPrice(address token) external view returns (uint256)
```

Get the price of a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to get the price of |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The asset price mantissa (scaled by 1e18).  Zero means the price is unavailable. |

### getPriceFromChainlink

```solidity
function getPriceFromChainlink(address token) external view returns (uint256)
```

Get the price of a token from ChainLink

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to get the price of |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The asset price mantissa (scaled by 1e18).  Zero means the price is unavailable. |

## IStableSwap

### TokenSwap

```solidity
event TokenSwap(address buyer, uint256 tokensSold, uint256 tokensBought, uint128 soldId, uint128 boughtId)
```

### AddLiquidity

```solidity
event AddLiquidity(address provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 lpTokenSupply)
```

### RemoveLiquidity

```solidity
event RemoveLiquidity(address provider, uint256[] tokenAmounts, uint256 lpTokenSupply)
```

### RemoveLiquidityOne

```solidity
event RemoveLiquidityOne(address provider, uint256 lpTokenAmount, uint256 lpTokenSupply, uint256 boughtId, uint256 tokensBought)
```

### RemoveLiquidityImbalance

```solidity
event RemoveLiquidityImbalance(address provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 lpTokenSupply)
```

### NewAdminFee

```solidity
event NewAdminFee(uint256 newAdminFee)
```

### NewSwapFee

```solidity
event NewSwapFee(uint256 newSwapFee)
```

### NewWithdrawFee

```solidity
event NewWithdrawFee(uint256 newWithdrawFee)
```

### RampA

```solidity
event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime)
```

### StopRampA

```solidity
event StopRampA(uint256 currentA, uint256 time)
```

### swap

```solidity
function swap(uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy, uint256 deadline) external returns (uint256)
```

### swapExact

```solidity
function swapExact(uint256 amountIn, address assetIn, address assetOut, uint256 minAmountOut, uint256 deadline) external payable returns (uint256)
```

### swapExactOut

```solidity
function swapExactOut(uint256 amountOut, address assetIn, address assetOut, uint256 maxAmountIn, uint256 deadline) external payable returns (uint256)
```

### getA

```solidity
function getA() external view returns (uint256)
```

### getToken

```solidity
function getToken(uint8 index) external view returns (contract IERC20)
```

### getTokenIndex

```solidity
function getTokenIndex(address tokenAddress) external view returns (uint8)
```

### getTokenBalance

```solidity
function getTokenBalance(uint8 index) external view returns (uint256)
```

### getVirtualPrice

```solidity
function getVirtualPrice() external view returns (uint256)
```

### calculateSwap

```solidity
function calculateSwap(uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx) external view returns (uint256)
```

### calculateSwapOut

```solidity
function calculateSwapOut(uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy) external view returns (uint256)
```

### calculateSwapFromAddress

```solidity
function calculateSwapFromAddress(address assetIn, address assetOut, uint256 amountIn) external view returns (uint256)
```

### calculateSwapOutFromAddress

```solidity
function calculateSwapOutFromAddress(address assetIn, address assetOut, uint256 amountOut) external view returns (uint256)
```

### calculateTokenAmount

```solidity
function calculateTokenAmount(uint256[] amounts, bool deposit) external view returns (uint256)
```

### calculateRemoveLiquidity

```solidity
function calculateRemoveLiquidity(uint256 amount) external view returns (uint256[])
```

### calculateRemoveLiquidityOneToken

```solidity
function calculateRemoveLiquidityOneToken(uint256 tokenAmount, uint8 tokenIndex) external view returns (uint256 availableTokenAmount)
```

### initialize

```solidity
function initialize(contract IERC20[] pooledTokens, uint8[] decimals, string lpTokenName, string lpTokenSymbol, uint256 a, uint256 fee, uint256 adminFee, address lpTokenTargetAddress) external
```

### addLiquidity

```solidity
function addLiquidity(uint256[] amounts, uint256 minToMint, uint256 deadline) external returns (uint256)
```

### removeLiquidity

```solidity
function removeLiquidity(uint256 amount, uint256[] minAmounts, uint256 deadline) external returns (uint256[])
```

### removeLiquidityOneToken

```solidity
function removeLiquidityOneToken(uint256 tokenAmount, uint8 tokenIndex, uint256 minAmount, uint256 deadline) external returns (uint256)
```

### removeLiquidityImbalance

```solidity
function removeLiquidityImbalance(uint256[] amounts, uint256 maxBurnAmount, uint256 deadline) external returns (uint256)
```

## IXReceiver

### xReceive

```solidity
function xReceive(bytes32 _transferId, uint256 _amount, address _asset, address _originSender, uint32 _origin, bytes _callData) external returns (bytes)
```


## AssetLogic

### AssetLogic__handleIncomingAsset_nativeAssetNotSupported

```solidity
error AssetLogic__handleIncomingAsset_nativeAssetNotSupported()
```

### AssetLogic__handleIncomingAsset_feeOnTransferNotSupported

```solidity
error AssetLogic__handleIncomingAsset_feeOnTransferNotSupported()
```

### AssetLogic__handleOutgoingAsset_notNative

```solidity
error AssetLogic__handleOutgoingAsset_notNative()
```

### AssetLogic__swapToLocalAssetIfNeeded_swapPaused

```solidity
error AssetLogic__swapToLocalAssetIfNeeded_swapPaused()
```

### AssetLogic__swapFromLocalAssetIfNeeded_swapPaused

```solidity
error AssetLogic__swapFromLocalAssetIfNeeded_swapPaused()
```

### AssetLogic__getTokenIndexFromStableSwapPool_notExist

```solidity
error AssetLogic__getTokenIndexFromStableSwapPool_notExist()
```

### handleIncomingAsset

```solidity
function handleIncomingAsset(address _asset, uint256 _amount) internal
```

Handles transferring funds from msg.sender to the Connext contract.

_Does NOT work with fee-on-transfer tokens: will revert._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | address | - The address of the ERC20 token to transfer. |
| _amount | uint256 | - The specified amount to transfer. |

### handleOutgoingAsset

```solidity
function handleOutgoingAsset(address _asset, address _to, uint256 _amount) internal
```

Handles transferring funds from the Connext contract to msg.sender.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | address | - The address of the ERC20 token to transfer. |
| _to | address | - The recipient address that will receive the funds. |
| _amount | uint256 | - The amount to withdraw from contract. |

### getTokenIndexFromStableSwapPool

```solidity
function getTokenIndexFromStableSwapPool(bytes32 key, address tokenAddress) internal view returns (uint8)
```

Return the index of the given token address. Reverts if no matching
token is found.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | the hash of the canonical id and domain |
| tokenAddress | address | address of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | the index of the given token address |

### swapToLocalAssetIfNeeded

```solidity
function swapToLocalAssetIfNeeded(bytes32 _key, address _asset, address _local, uint256 _amount, uint256 _slippage) internal returns (uint256)
```

Swaps an adopted asset to the local (representation or canonical) nomad asset.

_Will not swap if the asset passed in is the local asset._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | - The hash of canonical id and domain. |
| _asset | address | - The address of the adopted asset to swap into the local asset. |
| _local | address |  |
| _amount | uint256 | - The amount of the adopted asset to swap. |
| _slippage | uint256 | - The minimum amount of slippage user will take on from _amount in BPS. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The amount of local asset received from swap. |

### swapFromLocalAssetIfNeeded

```solidity
function swapFromLocalAssetIfNeeded(bytes32 _key, address _asset, uint256 _amount, uint256 _slippage, uint256 _normalizedIn) internal returns (uint256, address)
```

Swaps a local nomad asset for the adopted asset using the stored stable swap

_Will not swap if the asset passed in is the adopted asset_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | the hash of the canonical id and domain |
| _asset | address | - The address of the local asset to swap into the adopted asset |
| _amount | uint256 | - The amount of the local asset to swap |
| _slippage | uint256 | - The minimum amount of slippage user will take on from _amount in BPS |
| _normalizedIn | uint256 | - The amount sent in on xcall to take the slippage from, in 18 decimals by convention |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of adopted asset received from swap |
| [1] | address | The address of asset received post-swap |

### swapFromLocalAssetIfNeededForExactOut

```solidity
function swapFromLocalAssetIfNeededForExactOut(bytes32 _key, address _asset, uint256 _amount, uint256 _maxIn) internal returns (bool, uint256, address)
```

Swaps a local nomad asset for the adopted asset using the stored stable swap

_Will not swap if the asset passed in is the adopted asset_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | the hash of the canonical id and domain |
| _asset | address | - The address of the local asset to swap into the adopted asset |
| _amount | uint256 | - The exact amount to receive out of the swap |
| _maxIn | uint256 | - The most you will supply to the swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | The amount of local asset put into  swap |
| [1] | uint256 | The address of asset received post-swap |
| [2] | address |  |

### _swapAsset

```solidity
function _swapAsset(bytes32 _key, address _assetIn, address _assetOut, uint256 _amount, uint256 _minOut) internal returns (uint256, address)
```

Swaps assetIn to assetOut using the stored stable swap or internal swap pool.

_Will not swap if the asset passed in is the adopted asset_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | - The canonical token id |
| _assetIn | address | - The address of the from asset |
| _assetOut | address | - The address of the to asset |
| _amount | uint256 | - The amount of the local asset to swap |
| _minOut | uint256 | - The minimum amount of `_assetOut` the user will accept |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of assetOut |
| [1] | address | The address of assetOut |

### _swapAssetOut

```solidity
function _swapAssetOut(bytes32 _key, address _assetIn, address _assetOut, uint256 _amountOut, uint256 _maxIn) internal returns (bool success, uint256 amountIn, address assetOut)
```

Swaps assetIn to assetOut using the stored stable swap or internal swap pool.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | - The hash of the canonical id and domain. |
| _assetIn | address | - The address of the from asset. |
| _assetOut | address | - The address of the to asset. |
| _amountOut | uint256 | - The amount of the _assetOut to swap. |
| _maxIn | uint256 | - The most you will supply to the swap. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| success | bool | Success value. Will be false if the swap was unsuccessful (slippage too high). |
| amountIn | uint256 | The amount of assetIn. Will be 0 if the swap was unsuccessful (slippage too high). |
| assetOut | address | The address of assetOut. |

### calculateSwapFromLocalAssetIfNeeded

```solidity
function calculateSwapFromLocalAssetIfNeeded(bytes32 _key, address _asset, uint256 _amount) internal view returns (uint256, address)
```

Calculate amount of tokens you receive on a local nomad asset for the adopted asset
using the stored stable swap

_Will not use the stored stable swap if the asset passed in is the local asset_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | - The hash of the canonical id and domain |
| _asset | address | - The address of the local asset to swap into the local asset |
| _amount | uint256 | - The amount of the local asset to swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of local asset received from swap |
| [1] | address | The address of asset received post-swap |

### calculateSwapToLocalAssetIfNeeded

```solidity
function calculateSwapToLocalAssetIfNeeded(bytes32 _key, address _asset, address _local, uint256 _amount) internal view returns (uint256, address)
```

Calculate amount of tokens you receive of a local nomad asset for the adopted asset
using the stored stable swap

_Will not use the stored stable swap if the asset passed in is the local asset_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 |  |
| _asset | address | - The address of the asset to swap into the local asset |
| _local | address |  |
| _amount | uint256 | - The amount of the asset to swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of local asset received from swap |
| [1] | address | The address of asset received post-swap |

### getCanonicalTokenId

```solidity
function getCanonicalTokenId(address _candidate, struct AppStorage s) internal view returns (struct TokenId)
```

Gets the canonical information for a given candidate.

_First checks the `address(0)` convention, then checks if the asset given is the
adopted asset, then calculates the local address._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct TokenId | TokenId The canonical token ID information for the given candidate. |

### isLocalOrigin

```solidity
function isLocalOrigin(address _token, struct AppStorage s) internal view returns (bool)
```

Determine if token is of local origin (i.e. it is a locally originating contract,
and NOT a token deployed by the bridge).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address |  |
| s | struct AppStorage | AppStorage instance. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool true if token is locally originating, false otherwise. |

### getLocalAsset

```solidity
function getLocalAsset(bytes32 _key, bytes32 _id, uint32 _domain, struct AppStorage s) internal view returns (address)
```

Get the local asset address for a given canonical key, id, and domain.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _key | bytes32 | Canonical hash. |
| _id | bytes32 | Canonical ID. |
| _domain | uint32 | Canonical domain. |
| s | struct AppStorage | AppStorage instance. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the the local asset. |

### calculateCanonicalHash

```solidity
function calculateCanonicalHash(bytes32 _id, uint32 _domain) internal pure returns (bytes32)
```

Calculates the hash of canonical ID and domain.

_This hash is used as the key for many asset-related mappings._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | bytes32 | Canonical ID. |
| _domain | uint32 | Canonical domain. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32 Canonical hash, used as key for accessing token info from mappings. |

### calculateSlippageBoundary

```solidity
function calculateSlippageBoundary(uint8 _in, uint8 _out, uint256 _amountIn, uint256 _slippage) internal pure returns (uint256)
```

This function calculates slippage as a %age of the amount in, and normalizes
That to the `_out` decimals.

_This *ONLY* works for 1:1 assets_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _in | uint8 | The decimals of the asset in / amount in |
| _out | uint8 | The decimals of the target asset |
| _amountIn | uint256 | The starting amount for the swap |
| _slippage | uint256 | The slippage allowed for the swap, in BPS |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The minimum amount out for the swap |

### normalizeDecimals

```solidity
function normalizeDecimals(uint8 _in, uint8 _out, uint256 _amount) internal pure returns (uint256)
```

This function translates the _amount in _in decimals
to _out decimals

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _in | uint8 | The decimals of the asset in / amount in |
| _out | uint8 | The decimals of the target asset |
| _amount | uint256 | The value to normalize to the `_out` decimals |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Normalized decimals. |

## BridgeMessage

### Types

```solidity
enum Types {
  Invalid,
  TokenId,
  Message,
  Transfer
}
```

### TokenId

```solidity
struct TokenId {
  uint32 domain;
  bytes32 id;
}
```

### TOKEN_ID_LEN

```solidity
uint256 TOKEN_ID_LEN
```

### IDENTIFIER_LEN

```solidity
uint256 IDENTIFIER_LEN
```

### TRANSFER_LEN

```solidity
uint256 TRANSFER_LEN
```

### typeAssert

```solidity
modifier typeAssert(bytes29 _view, enum BridgeMessage.Types _t)
```

Asserts a message is of type `_t`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _view | bytes29 | The message |
| _t | enum BridgeMessage.Types | The expected type |

### isValidAction

```solidity
function isValidAction(bytes29 _action) internal pure returns (bool)
```

Checks that Action is valid type

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _action | bytes29 | The action |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | TRUE if action is valid |

### isValidMessageLength

```solidity
function isValidMessageLength(bytes29 _view) internal pure returns (bool)
```

Checks that view is a valid message length

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _view | bytes29 | The bytes string |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | TRUE if message is valid |

### formatMessage

```solidity
function formatMessage(bytes29 _tokenId, bytes29 _action) internal view returns (bytes)
```

Formats an action message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | bytes29 | The token ID |
| _action | bytes29 | The action |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | The formatted message |

### messageType

```solidity
function messageType(bytes29 _view) internal pure returns (enum BridgeMessage.Types)
```

Returns the type of the message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _view | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum BridgeMessage.Types | The type of the message |

### isType

```solidity
function isType(bytes29 _action, enum BridgeMessage.Types _type) internal pure returns (bool)
```

Checks that the message is of the specified type

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _action | bytes29 | The message |
| _type | enum BridgeMessage.Types | the type to check for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the message is of the specified type |

### isTransfer

```solidity
function isTransfer(bytes29 _action) internal pure returns (bool)
```

Checks that the message is of type Transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _action | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the message is of type Transfer |

### formatTransfer

```solidity
function formatTransfer(uint256 _amnt, bytes32 _transferId) internal pure returns (bytes29)
```

Formats Transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amnt | uint256 | The transfer amount |
| _transferId | bytes32 | The unique identifier of the transfer @return |

### formatTokenId

```solidity
function formatTokenId(struct BridgeMessage.TokenId _tokenId) internal pure returns (bytes29)
```

Serializes a Token ID struct

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | struct BridgeMessage.TokenId | The token id struct |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes29 | The formatted Token ID |

### formatTokenId

```solidity
function formatTokenId(uint32 _domain, bytes32 _id) internal pure returns (bytes29)
```

Creates a serialized Token ID from components

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain |
| _id | bytes32 | The ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes29 | The formatted Token ID |

### domain

```solidity
function domain(bytes29 _tokenId) internal pure returns (uint32)
```

Retrieves the domain from a TokenID

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The domain |

### id

```solidity
function id(bytes29 _tokenId) internal pure returns (bytes32)
```

Retrieves the ID from a TokenID

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The ID |

### evmId

```solidity
function evmId(bytes29 _tokenId) internal pure returns (address)
```

Retrieves the EVM ID

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The EVM ID |

### msgType

```solidity
function msgType(bytes29 _message) internal pure returns (uint8)
```

Retrieves the action identifier from message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _message | bytes29 | The action |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | The message type |

### actionType

```solidity
function actionType(bytes29 _action) internal pure returns (uint8)
```

Retrieves the identifier from action

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _action | bytes29 | The action |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | The action type |

### amnt

```solidity
function amnt(bytes29 _transferAction) internal pure returns (uint256)
```

Retrieves the amount from a Transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transferAction | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount |

### transferId

```solidity
function transferId(bytes29 _transferAction) internal pure returns (bytes32)
```

Retrieves the transfer id from a Transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transferAction | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The id |

### tokenId

```solidity
function tokenId(bytes29 _message) internal pure returns (bytes29)
```

Retrieves the token ID from a Message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _message | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes29 | The ID |

### action

```solidity
function action(bytes29 _message) internal pure returns (bytes29)
```

Retrieves the action data from a Message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _message | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes29 | The action |

### tryAsMessage

```solidity
function tryAsMessage(bytes29 _message) internal pure returns (bytes29)
```

Converts to a Message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _message | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes29 | The newly typed message |

### mustBeMessage

```solidity
function mustBeMessage(bytes29 _view) internal pure returns (bytes29)
```

Asserts that the message is of type Message

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _view | bytes29 | The message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes29 | The message |


### NIBBLE_LOOKUP

```solidity
bytes NIBBLE_LOOKUP
```

### decimalUint32

```solidity
function decimalUint32(uint32 _num) internal pure returns (uint80 _encoded)
```

Encode a uint32 in its DECIMAL representation, with leading
zeroes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _num | uint32 | The number to encode |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _encoded | uint80 | The encoded number, suitable for use in abi. encodePacked |

### encodeHex

```solidity
function encodeHex(uint256 _bytes) internal pure returns (uint256 _firstHalf, uint256 _secondHalf)
```

Encodes the uint256 to hex. `first` contains the encoded top 16 bytes.
`second` contains the encoded lower 16 bytes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bytes | uint256 | The 32 bytes as uint256 |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _firstHalf | uint256 | The top 16 bytes |
| _secondHalf | uint256 | The bottom 16 bytes |

### _nibbleHex

```solidity
function _nibbleHex(uint8 _byte) private pure returns (uint8 _char)
```

Returns the encoded hex character that represents the lower 4 bits of the argument.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _byte | uint8 | The byte |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _char | uint8 | The encoded hex character |

### _byteHex

```solidity
function _byteHex(uint8 _byte) private pure returns (uint16 _encoded)
```

Returns a uint16 containing the hex-encoded byte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _byte | uint8 | The byte |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _encoded | uint16 | The hex-encoded byte |

## ExecuteArgs

```solidity
struct ExecuteArgs {
  struct TransferInfo params;
  address[] routers;
  bytes[] routerSignatures;
  address sequencer;
  bytes sequencerSignature;
}
```

## LibConnextStorage

### connextStorage

```solidity
function connextStorage() internal pure returns (struct AppStorage ds)
```

## SwapUtils

A library to be used within Swap.sol. Contains functions responsible for custody and AMM functionalities.

_Contracts relying on this library must initialize SwapUtils.Swap struct then use this library
for SwapUtils.Swap struct. Note that this library contains both functions called by users and admins.
Admin functions should be protected within contracts using this library._

### TokenSwap

```solidity
event TokenSwap(bytes32 key, address buyer, uint256 tokensSold, uint256 tokensBought, uint128 soldId, uint128 boughtId)
```

### AddLiquidity

```solidity
event AddLiquidity(bytes32 key, address provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 lpTokenSupply)
```

### RemoveLiquidity

```solidity
event RemoveLiquidity(bytes32 key, address provider, uint256[] tokenAmounts, uint256 lpTokenSupply)
```

### RemoveLiquidityOne

```solidity
event RemoveLiquidityOne(bytes32 key, address provider, uint256 lpTokenAmount, uint256 lpTokenSupply, uint256 boughtId, uint256 tokensBought)
```

### RemoveLiquidityImbalance

```solidity
event RemoveLiquidityImbalance(bytes32 key, address provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 lpTokenSupply)
```

### NewAdminFee

```solidity
event NewAdminFee(bytes32 key, uint256 newAdminFee)
```

### NewSwapFee

```solidity
event NewSwapFee(bytes32 key, uint256 newSwapFee)
```

### Swap

```solidity
struct Swap {
  bytes32 key;
  uint256 initialA;
  uint256 futureA;
  uint256 initialATime;
  uint256 futureATime;
  uint256 swapFee;
  uint256 adminFee;
  contract LPToken lpToken;
  contract IERC20[] pooledTokens;
  uint256[] tokenPrecisionMultipliers;
  uint256[] balances;
  uint256[] adminFees;
}
```

### CalculateWithdrawOneTokenDYInfo

```solidity
struct CalculateWithdrawOneTokenDYInfo {
  uint256 d0;
  uint256 d1;
  uint256 newY;
  uint256 feePerToken;
  uint256 preciseA;
}
```

### ManageLiquidityInfo

```solidity
struct ManageLiquidityInfo {
  uint256 d0;
  uint256 d1;
  uint256 d2;
  uint256 preciseA;
  contract LPToken lpToken;
  uint256 totalSupply;
  uint256[] balances;
  uint256[] multipliers;
}
```

### POOL_PRECISION_DECIMALS

```solidity
uint8 POOL_PRECISION_DECIMALS
```

### FEE_DENOMINATOR

```solidity
uint256 FEE_DENOMINATOR
```

### MAX_SWAP_FEE

```solidity
uint256 MAX_SWAP_FEE
```

### MAX_ADMIN_FEE

```solidity
uint256 MAX_ADMIN_FEE
```

### MAX_LOOP_LIMIT

```solidity
uint256 MAX_LOOP_LIMIT
```

### _getAPrecise

```solidity
function _getAPrecise(struct SwapUtils.Swap self) private view returns (uint256)
```

### calculateWithdrawOneToken

```solidity
function calculateWithdrawOneToken(struct SwapUtils.Swap self, uint256 tokenAmount, uint8 tokenIndex) internal view returns (uint256)
```

Calculate the dy, the amount of selected token that user receives and
the fee of withdrawing in one token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| tokenAmount | uint256 | the amount to withdraw in the pool's precision |
| tokenIndex | uint8 | which token will be withdrawn |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the amount of token user will receive |

### _calculateWithdrawOneToken

```solidity
function _calculateWithdrawOneToken(struct SwapUtils.Swap self, uint256 tokenAmount, uint8 tokenIndex, uint256 totalSupply) private view returns (uint256, uint256)
```

### calculateWithdrawOneTokenDY

```solidity
function calculateWithdrawOneTokenDY(struct SwapUtils.Swap self, uint8 tokenIndex, uint256 tokenAmount, uint256 totalSupply) internal view returns (uint256, uint256, uint256)
```

Calculate the dy of withdrawing in one token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| tokenIndex | uint8 | which token will be withdrawn |
| tokenAmount | uint256 | the amount to withdraw in the pools precision |
| totalSupply | uint256 |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the d and the new y after withdrawing one token |
| [1] | uint256 |  |
| [2] | uint256 |  |

### getYD

```solidity
function getYD(uint256 a, uint8 tokenIndex, uint256[] xp, uint256 d) internal pure returns (uint256)
```

Calculate the price of a token in the pool with given
precision-adjusted balances and a particular D.

_This is accomplished via solving the invariant iteratively.
See the StableSwap paper and Curve.fi implementation for further details.

x_1**2 + x1 * (sum' - (A*n**n - 1) * D / (A * n**n)) = D ** (n + 1) / (n ** (2 * n) * prod' * A)
x_1**2 + b*x_1 = c
x_1 = (x_1**2 + c) / (2*x_1 + b)_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| a | uint256 | the amplification coefficient * n * (n - 1). See the StableSwap paper for details. |
| tokenIndex | uint8 | Index of token we are calculating for. |
| xp | uint256[] | a precision-adjusted set of pool balances. Array should be the same cardinality as the pool. |
| d | uint256 | the stableswap invariant |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the price of the token, in the same precision as in xp |

### getD

```solidity
function getD(uint256[] xp, uint256 a) internal pure returns (uint256)
```

Get D, the StableSwap invariant, based on a set of balances and a particular A.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| xp | uint256[] | a precision-adjusted set of pool balances. Array should be the same cardinality as the pool. |
| a | uint256 | the amplification coefficient * n * (n - 1) in A_PRECISION. See the StableSwap paper for details |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the invariant, at the precision of the pool |

### _xp

```solidity
function _xp(uint256[] balances, uint256[] precisionMultipliers) internal pure returns (uint256[])
```

Given a set of balances and precision multipliers, return the
precision-adjusted balances.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| balances | uint256[] | an array of token balances, in their native precisions. These should generally correspond with pooled tokens. |
| precisionMultipliers | uint256[] | an array of multipliers, corresponding to the amounts in the balances array. When multiplied together they should yield amounts at the pool's precision. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | an array of amounts "scaled" to the pool's precision |

### _xp

```solidity
function _xp(struct SwapUtils.Swap self) internal view returns (uint256[])
```

Return the precision-adjusted balances of all tokens in the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | the pool balances "scaled" to the pool's precision, allowing them to be more easily compared. |

### getVirtualPrice

```solidity
function getVirtualPrice(struct SwapUtils.Swap self) internal view returns (uint256)
```

Get the virtual price, to help calculate profit

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the virtual price, scaled to precision of POOL_PRECISION_DECIMALS |

### getY

```solidity
function getY(uint256 preciseA, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 x, uint256[] xp) internal pure returns (uint256)
```

Calculate the new balances of the tokens given the indexes of the token
that is swapped from (FROM) and the token that is swapped to (TO).
This function is used as a helper function to calculate how much TO token
the user should receive on swap.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| preciseA | uint256 | precise form of amplification coefficient |
| tokenIndexFrom | uint8 | index of FROM token |
| tokenIndexTo | uint8 | index of TO token |
| x | uint256 | the new total amount of FROM token |
| xp | uint256[] | balances of the tokens in the pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the amount of TO token that should remain in the pool |

### calculateSwap

```solidity
function calculateSwap(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx) internal view returns (uint256 dy)
```

Externally calculates a swap between two tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dx | uint256 | the number of tokens to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dy | uint256 | the number of tokens the user will get |

### calculateSwapInv

```solidity
function calculateSwapInv(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy) internal view returns (uint256 dx)
```

Externally calculates a swap between two tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dy | uint256 | the number of tokens to buy. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dx | uint256 | the number of tokens the user have to transfer + fee |

### _calculateSwap

```solidity
function _calculateSwap(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256[] balances) internal view returns (uint256 dy, uint256 dyFee)
```

Internally calculates a swap between two tokens.

_The caller is expected to transfer the actual amounts (dx and dy)
using the token contracts._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dx | uint256 | the number of tokens to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |
| balances | uint256[] |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dy | uint256 | the number of tokens the user will get in the token's precision. ex WBTC -> 8 |
| dyFee | uint256 | the associated fee in multiplied precision (POOL_PRECISION_DECIMALS) |

### _calculateSwapInv

```solidity
function _calculateSwapInv(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy, uint256[] balances) internal view returns (uint256 dx, uint256 dxFee)
```

Internally calculates a swap between two tokens.

_The caller is expected to transfer the actual amounts (dx and dy)
using the token contracts._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dy | uint256 | the number of tokens to buy. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |
| balances | uint256[] |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dx | uint256 | the number of tokens the user have to deposit in the token's precision. ex WBTC -> 8 |
| dxFee | uint256 | the associated fee in multiplied precision (POOL_PRECISION_DECIMALS) |

### calculateRemoveLiquidity

```solidity
function calculateRemoveLiquidity(struct SwapUtils.Swap self, uint256 amount) internal view returns (uint256[])
```

A simple method to calculate amount of each underlying
tokens that is returned upon burning given amount of
LP tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap |  |
| amount | uint256 | the amount of LP tokens that would to be burned on withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | array of amounts of tokens user will receive |

### _calculateRemoveLiquidity

```solidity
function _calculateRemoveLiquidity(uint256[] balances, uint256 amount, uint256 totalSupply) internal pure returns (uint256[])
```

### calculateTokenAmount

```solidity
function calculateTokenAmount(struct SwapUtils.Swap self, uint256[] amounts, bool deposit) internal view returns (uint256)
```

A simple method to calculate prices from deposits or
withdrawals, excluding fees but including slippage. This is
helpful as an input into the various "min" parameters on calls
to fight front-running

_This shouldn't be used outside frontends for user estimates._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| amounts | uint256[] | an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee. |
| deposit | bool | whether this is a deposit or a withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | if deposit was true, total amount of lp token that will be minted and if deposit was false, total amount of lp token that will be burned |

### getAdminBalance

```solidity
function getAdminBalance(struct SwapUtils.Swap self, uint256 index) internal view returns (uint256)
```

return accumulated amount of admin fees of the token with given index

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from |
| index | uint256 | Index of the pooled token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | admin balance in the token's precision |

### _feePerToken

```solidity
function _feePerToken(uint256 swapFee, uint256 numTokens) internal pure returns (uint256)
```

internal helper function to calculate fee per token multiplier used in
swap fee calculations

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| swapFee | uint256 | swap fee for the tokens |
| numTokens | uint256 | number of tokens pooled |

### swap

```solidity
function swap(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy) internal returns (uint256)
```

swap two tokens in the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dx | uint256 | the amount of tokens the user wants to sell |
| minDy | uint256 | the min amount the user would like to receive, or revert. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of token user received on swap |

### swapOut

```solidity
function swapOut(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy, uint256 maxDx) internal returns (uint256)
```

swap two tokens in the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dy | uint256 | the amount of tokens the user wants to buy |
| maxDx | uint256 | the max amount the user would like to send. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of token user have to transfer on swap |

### swapInternal

```solidity
function swapInternal(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy) internal returns (uint256)
```

swap two tokens in the pool internally

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dx | uint256 | the amount of tokens the user wants to sell |
| minDy | uint256 | the min amount the user would like to receive, or revert. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of token user received on swap |

### swapInternalOut

```solidity
function swapInternalOut(struct SwapUtils.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy, uint256 maxDx) internal returns (uint256)
```

Should get exact amount out of AMM for asset put in

### addLiquidity

```solidity
function addLiquidity(struct SwapUtils.Swap self, uint256[] amounts, uint256 minToMint) internal returns (uint256)
```

Add liquidity to the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| amounts | uint256[] | the amounts of each token to add, in their native precision |
| minToMint | uint256 | the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation allowed addresses. If the pool is not in the guarded launch phase, this parameter will be ignored. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of LP token user received |

### removeLiquidity

```solidity
function removeLiquidity(struct SwapUtils.Swap self, uint256 amount, uint256[] minAmounts) internal returns (uint256[])
```

Burn LP tokens to remove liquidity from the pool.

_Liquidity can always be removed, even when the pool is paused._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| amount | uint256 | the amount of LP tokens to burn |
| minAmounts | uint256[] | the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | amounts of tokens the user received |

### removeLiquidityOneToken

```solidity
function removeLiquidityOneToken(struct SwapUtils.Swap self, uint256 tokenAmount, uint8 tokenIndex, uint256 minAmount) internal returns (uint256)
```

Remove liquidity from the pool all in one token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| tokenAmount | uint256 | the amount of the lp tokens to burn |
| tokenIndex | uint8 | the index of the token you want to receive |
| minAmount | uint256 | the minimum amount to withdraw, otherwise revert |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount chosen token that user received |

### removeLiquidityImbalance

```solidity
function removeLiquidityImbalance(struct SwapUtils.Swap self, uint256[] amounts, uint256 maxBurnAmount) internal returns (uint256)
```

Remove liquidity from the pool, weighted differently than the
pool's current balances.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to read from and write to |
| amounts | uint256[] | how much of each token to withdraw |
| maxBurnAmount | uint256 | the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | actual amount of LP tokens burned in the withdrawal |

### withdrawAdminFees

```solidity
function withdrawAdminFees(struct SwapUtils.Swap self, address to) internal
```

withdraw all admin fees to a given address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to withdraw fees from |
| to | address | Address to send the fees to |

### setAdminFee

```solidity
function setAdminFee(struct SwapUtils.Swap self, uint256 newAdminFee) internal
```

Sets the admin fee

_adminFee cannot be higher than 100% of the swap fee_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to update |
| newAdminFee | uint256 | new admin fee to be applied on future transactions |

### setSwapFee

```solidity
function setSwapFee(struct SwapUtils.Swap self, uint256 newSwapFee) internal
```

update the swap fee

_fee cannot be higher than 1% of each swap_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtils.Swap | Swap struct to update |
| newSwapFee | uint256 | new swap fee to be applied on future transactions |

### exists

```solidity
function exists(struct SwapUtils.Swap self) internal view returns (bool)
```

Check if this stableswap pool exists and is valid (i.e. has been
initialized and tokens have been added).

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool true if this stableswap pool is valid, false if not. |

## SwapUtilsExternal

A library to be used within Swap.sol. Contains functions responsible for custody and AMM functionalities.

_Contracts relying on this library must initialize SwapUtils.Swap struct then use this library
for SwapUtils.Swap struct. Note that this library contains both functions called by users and admins.
Admin functions should be protected within contracts using this library._

### TokenSwap

```solidity
event TokenSwap(address buyer, uint256 tokensSold, uint256 tokensBought, uint128 soldId, uint128 boughtId)
```

### AddLiquidity

```solidity
event AddLiquidity(address provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 lpTokenSupply)
```

### RemoveLiquidity

```solidity
event RemoveLiquidity(address provider, uint256[] tokenAmounts, uint256 lpTokenSupply)
```

### RemoveLiquidityOne

```solidity
event RemoveLiquidityOne(address provider, uint256 lpTokenAmount, uint256 lpTokenSupply, uint256 boughtId, uint256 tokensBought)
```

### RemoveLiquidityImbalance

```solidity
event RemoveLiquidityImbalance(address provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 lpTokenSupply)
```

### NewAdminFee

```solidity
event NewAdminFee(uint256 newAdminFee)
```

### NewSwapFee

```solidity
event NewSwapFee(uint256 newSwapFee)
```

### RampA

```solidity
event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime)
```

### StopRampA

```solidity
event StopRampA(uint256 currentA, uint256 time)
```

### Swap

```solidity
struct Swap {
  uint256 initialA;
  uint256 futureA;
  uint256 initialATime;
  uint256 futureATime;
  uint256 swapFee;
  uint256 adminFee;
  contract LPToken lpToken;
  contract IERC20[] pooledTokens;
  uint256[] tokenPrecisionMultipliers;
  uint256[] balances;
  uint256[] adminFees;
}
```

### CalculateWithdrawOneTokenDYInfo

```solidity
struct CalculateWithdrawOneTokenDYInfo {
  uint256 d0;
  uint256 d1;
  uint256 newY;
  uint256 feePerToken;
  uint256 preciseA;
}
```

### ManageLiquidityInfo

```solidity
struct ManageLiquidityInfo {
  uint256 d0;
  uint256 d1;
  uint256 d2;
  uint256 preciseA;
  contract LPToken lpToken;
  uint256 totalSupply;
  uint256[] balances;
  uint256[] multipliers;
}
```

### POOL_PRECISION_DECIMALS

```solidity
uint8 POOL_PRECISION_DECIMALS
```

### FEE_DENOMINATOR

```solidity
uint256 FEE_DENOMINATOR
```

### MAX_SWAP_FEE

```solidity
uint256 MAX_SWAP_FEE
```

### MAX_ADMIN_FEE

```solidity
uint256 MAX_ADMIN_FEE
```

### MAX_LOOP_LIMIT

```solidity
uint256 MAX_LOOP_LIMIT
```

### A_PRECISION

```solidity
uint256 A_PRECISION
```

### MAX_A

```solidity
uint256 MAX_A
```

### MAX_A_CHANGE

```solidity
uint256 MAX_A_CHANGE
```

### MIN_RAMP_TIME

```solidity
uint256 MIN_RAMP_TIME
```

### getA

```solidity
function getA(struct SwapUtilsExternal.Swap self) external view returns (uint256)
```

Return A, the amplification coefficient * n * (n - 1)

_See the StableSwap paper for details_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter |

### getAPrecise

```solidity
function getAPrecise(struct SwapUtilsExternal.Swap self) external view returns (uint256)
```

Return A in its raw precision

_See the StableSwap paper for details_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter in its raw precision form |

### _getAPrecise

```solidity
function _getAPrecise(struct SwapUtilsExternal.Swap self) internal view returns (uint256)
```

Return A in its raw precision

_See the StableSwap paper for details_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | A parameter in its raw precision form |

### calculateWithdrawOneToken

```solidity
function calculateWithdrawOneToken(struct SwapUtilsExternal.Swap self, uint256 tokenAmount, uint8 tokenIndex) external view returns (uint256)
```

Calculate the dy, the amount of selected token that user receives and
the fee of withdrawing in one token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| tokenAmount | uint256 | the amount to withdraw in the pool's precision |
| tokenIndex | uint8 | which token will be withdrawn |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the amount of token user will receive |

### _calculateWithdrawOneToken

```solidity
function _calculateWithdrawOneToken(struct SwapUtilsExternal.Swap self, uint256 tokenAmount, uint8 tokenIndex, uint256 totalSupply) private view returns (uint256, uint256)
```

### calculateWithdrawOneTokenDY

```solidity
function calculateWithdrawOneTokenDY(struct SwapUtilsExternal.Swap self, uint8 tokenIndex, uint256 tokenAmount, uint256 totalSupply) public view returns (uint256, uint256, uint256)
```

Calculate the dy of withdrawing in one token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| tokenIndex | uint8 | which token will be withdrawn |
| tokenAmount | uint256 | the amount to withdraw in the pools precision |
| totalSupply | uint256 |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the d and the new y after withdrawing one token |
| [1] | uint256 |  |
| [2] | uint256 |  |

### getYD

```solidity
function getYD(uint256 a, uint8 tokenIndex, uint256[] xp, uint256 d) public pure returns (uint256)
```

Calculate the price of a token in the pool with given
precision-adjusted balances and a particular D.

_This is accomplished via solving the invariant iteratively.
See the StableSwap paper and Curve.fi implementation for further details.

x_1**2 + x1 * (sum' - (A*n**n - 1) * D / (A * n**n)) = D ** (n + 1) / (n ** (2 * n) * prod' * A)
x_1**2 + b*x_1 = c
x_1 = (x_1**2 + c) / (2*x_1 + b)_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| a | uint256 | the amplification coefficient * n * (n - 1). See the StableSwap paper for details. |
| tokenIndex | uint8 | Index of token we are calculating for. |
| xp | uint256[] | a precision-adjusted set of pool balances. Array should be the same cardinality as the pool. |
| d | uint256 | the stableswap invariant |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the price of the token, in the same precision as in xp |

### getD

```solidity
function getD(uint256[] xp, uint256 a) public pure returns (uint256)
```

Get D, the StableSwap invariant, based on a set of balances and a particular A.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| xp | uint256[] | a precision-adjusted set of pool balances. Array should be the same cardinality as the pool. |
| a | uint256 | the amplification coefficient * n * (n - 1) in A_PRECISION. See the StableSwap paper for details |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the invariant, at the precision of the pool |

### _xp

```solidity
function _xp(uint256[] balances, uint256[] precisionMultipliers) internal pure returns (uint256[])
```

Given a set of balances and precision multipliers, return the
precision-adjusted balances.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| balances | uint256[] | an array of token balances, in their native precisions. These should generally correspond with pooled tokens. |
| precisionMultipliers | uint256[] | an array of multipliers, corresponding to the amounts in the balances array. When multiplied together they should yield amounts at the pool's precision. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | an array of amounts "scaled" to the pool's precision |

### _xp

```solidity
function _xp(struct SwapUtilsExternal.Swap self) internal view returns (uint256[])
```

Return the precision-adjusted balances of all tokens in the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | the pool balances "scaled" to the pool's precision, allowing them to be more easily compared. |

### getVirtualPrice

```solidity
function getVirtualPrice(struct SwapUtilsExternal.Swap self) external view returns (uint256)
```

Get the virtual price, to help calculate profit

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the virtual price, scaled to precision of POOL_PRECISION_DECIMALS |

### getY

```solidity
function getY(uint256 preciseA, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 x, uint256[] xp) public pure returns (uint256)
```

Calculate the new balances of the tokens given the indexes of the token
that is swapped from (FROM) and the token that is swapped to (TO).
This function is used as a helper function to calculate how much TO token
the user should receive on swap.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| preciseA | uint256 | precise form of amplification coefficient |
| tokenIndexFrom | uint8 | index of FROM token |
| tokenIndexTo | uint8 | index of TO token |
| x | uint256 | the new total amount of FROM token |
| xp | uint256[] | balances of the tokens in the pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | the amount of TO token that should remain in the pool |

### calculateSwap

```solidity
function calculateSwap(struct SwapUtilsExternal.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx) external view returns (uint256 dy)
```

Externally calculates a swap between two tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dx | uint256 | the number of tokens to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dy | uint256 | the number of tokens the user will get |

### calculateSwapInv

```solidity
function calculateSwapInv(struct SwapUtilsExternal.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy) external view returns (uint256 dx)
```

Externally calculates a swap between two tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dy | uint256 | the number of tokens to buy. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dx | uint256 | the number of tokens the user have to transfer + fee |

### _calculateSwap

```solidity
function _calculateSwap(struct SwapUtilsExternal.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256[] balances) internal view returns (uint256 dy, uint256 dyFee)
```

Internally calculates a swap between two tokens.

_The caller is expected to transfer the actual amounts (dx and dy)
using the token contracts._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dx | uint256 | the number of tokens to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |
| balances | uint256[] |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dy | uint256 | the number of tokens the user will get in the token's precision. ex WBTC -> 8 |
| dyFee | uint256 | the associated fee in multiplied precision (POOL_PRECISION_DECIMALS) |

### _calculateSwapInv

```solidity
function _calculateSwapInv(struct SwapUtilsExternal.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy, uint256[] balances) internal view returns (uint256 dx, uint256 dxFee)
```

Internally calculates a swap between two tokens.

_The caller is expected to transfer the actual amounts (dx and dy)
using the token contracts._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| tokenIndexFrom | uint8 | the token to sell |
| tokenIndexTo | uint8 | the token to buy |
| dy | uint256 | the number of tokens to buy. If the token charges a fee on transfers, use the amount that gets transferred after the fee. |
| balances | uint256[] |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| dx | uint256 | the number of tokens the user have to deposit in the token's precision. ex WBTC -> 8 |
| dxFee | uint256 | the associated fee in multiplied precision (POOL_PRECISION_DECIMALS) |

### calculateRemoveLiquidity

```solidity
function calculateRemoveLiquidity(struct SwapUtilsExternal.Swap self, uint256 amount) external view returns (uint256[])
```

A simple method to calculate amount of each underlying
tokens that is returned upon burning given amount of
LP tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap |  |
| amount | uint256 | the amount of LP tokens that would to be burned on withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | array of amounts of tokens user will receive |

### _calculateRemoveLiquidity

```solidity
function _calculateRemoveLiquidity(uint256[] balances, uint256 amount, uint256 totalSupply) internal pure returns (uint256[])
```

### calculateTokenAmount

```solidity
function calculateTokenAmount(struct SwapUtilsExternal.Swap self, uint256[] amounts, bool deposit) external view returns (uint256)
```

A simple method to calculate prices from deposits or
withdrawals, excluding fees but including slippage. This is
helpful as an input into the various "min" parameters on calls
to fight front-running

_This shouldn't be used outside frontends for user estimates._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| amounts | uint256[] | an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee. |
| deposit | bool | whether this is a deposit or a withdrawal |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | if deposit was true, total amount of lp token that will be minted and if deposit was false, total amount of lp token that will be burned |

### getAdminBalance

```solidity
function getAdminBalance(struct SwapUtilsExternal.Swap self, uint256 index) external view returns (uint256)
```

return accumulated amount of admin fees of the token with given index

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from |
| index | uint256 | Index of the pooled token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | admin balance in the token's precision |

### _feePerToken

```solidity
function _feePerToken(uint256 swapFee, uint256 numTokens) internal pure returns (uint256)
```

internal helper function to calculate fee per token multiplier used in
swap fee calculations

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| swapFee | uint256 | swap fee for the tokens |
| numTokens | uint256 | number of tokens pooled |

### swap

```solidity
function swap(struct SwapUtilsExternal.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dx, uint256 minDy) external returns (uint256)
```

swap two tokens in the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from and write to |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dx | uint256 | the amount of tokens the user wants to sell |
| minDy | uint256 | the min amount the user would like to receive, or revert. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of token user received on swap |

### swapOut

```solidity
function swapOut(struct SwapUtilsExternal.Swap self, uint8 tokenIndexFrom, uint8 tokenIndexTo, uint256 dy, uint256 maxDx) external returns (uint256)
```

swap two tokens in the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from and write to |
| tokenIndexFrom | uint8 | the token the user wants to sell |
| tokenIndexTo | uint8 | the token the user wants to buy |
| dy | uint256 | the amount of tokens the user wants to buy |
| maxDx | uint256 | the max amount the user would like to send. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of token user have to transfer on swap |

### addLiquidity

```solidity
function addLiquidity(struct SwapUtilsExternal.Swap self, uint256[] amounts, uint256 minToMint) external returns (uint256)
```

Add liquidity to the pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from and write to |
| amounts | uint256[] | the amounts of each token to add, in their native precision |
| minToMint | uint256 | the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation allowed addresses. If the pool is not in the guarded launch phase, this parameter will be ignored. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of LP token user received |

### removeLiquidity

```solidity
function removeLiquidity(struct SwapUtilsExternal.Swap self, uint256 amount, uint256[] minAmounts) external returns (uint256[])
```

Burn LP tokens to remove liquidity from the pool.

_Liquidity can always be removed, even when the pool is paused._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from and write to |
| amount | uint256 | the amount of LP tokens to burn |
| minAmounts | uint256[] | the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | amounts of tokens the user received |

### removeLiquidityOneToken

```solidity
function removeLiquidityOneToken(struct SwapUtilsExternal.Swap self, uint256 tokenAmount, uint8 tokenIndex, uint256 minAmount) external returns (uint256)
```

Remove liquidity from the pool all in one token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from and write to |
| tokenAmount | uint256 | the amount of the lp tokens to burn |
| tokenIndex | uint8 | the index of the token you want to receive |
| minAmount | uint256 | the minimum amount to withdraw, otherwise revert |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount chosen token that user received |

### removeLiquidityImbalance

```solidity
function removeLiquidityImbalance(struct SwapUtilsExternal.Swap self, uint256[] amounts, uint256 maxBurnAmount) external returns (uint256)
```

Remove liquidity from the pool, weighted differently than the
pool's current balances.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to read from and write to |
| amounts | uint256[] | how much of each token to withdraw |
| maxBurnAmount | uint256 | the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | actual amount of LP tokens burned in the withdrawal |

### withdrawAdminFees

```solidity
function withdrawAdminFees(struct SwapUtilsExternal.Swap self, address to) external
```

withdraw all admin fees to a given address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to withdraw fees from |
| to | address | Address to send the fees to |

### setAdminFee

```solidity
function setAdminFee(struct SwapUtilsExternal.Swap self, uint256 newAdminFee) external
```

Sets the admin fee

_adminFee cannot be higher than 100% of the swap fee_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to update |
| newAdminFee | uint256 | new admin fee to be applied on future transactions |

### setSwapFee

```solidity
function setSwapFee(struct SwapUtilsExternal.Swap self, uint256 newSwapFee) external
```

update the swap fee

_fee cannot be higher than 1% of each swap_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to update |
| newSwapFee | uint256 | new swap fee to be applied on future transactions |

### rampA

```solidity
function rampA(struct SwapUtilsExternal.Swap self, uint256 futureA_, uint256 futureTime_) external
```

Start ramping up or down A parameter towards given futureA_ and futureTime_
Checks if the change is too rapid, and commits the new A value only when it falls under
the limit range.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to update |
| futureA_ | uint256 | the new A to ramp towards |
| futureTime_ | uint256 | timestamp when the new A should be reached |

### stopRampA

```solidity
function stopRampA(struct SwapUtilsExternal.Swap self) external
```

Stops ramping A immediately. Once this function is called, rampA()
cannot be called for another 24 hours

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct SwapUtilsExternal.Swap | Swap struct to update |

## RootManager

This contract exists at cluster hubs, and aggregates all transfer roots from messaging
spokes into a single merkle root

### DelayBlocksUpdated

```solidity
event DelayBlocksUpdated(uint256 previous, uint256 updated)
```

### RootAggregated

```solidity
event RootAggregated(uint32 domain, bytes32 receivedRoot, uint256 index)
```

### RootPropagated

```solidity
event RootPropagated(bytes32 aggregate, uint32[] domains, uint256 count)
```

### ConnectorAdded

```solidity
event ConnectorAdded(uint32 domain, address connector, uint32[] domains, address[] connectors)
```

### ConnectorRemoved

```solidity
event ConnectorRemoved(uint32 domain, address connector, uint32[] domains, address[] connectors, address caller)
```

### delayBlocks

```solidity
uint256 delayBlocks
```

Number of blocks to delay the processing of a message to allow for watchers to verify
the validity and pause if necessary.

### pendingInboundRoots

```solidity
struct QueueLib.Queue pendingInboundRoots
```

Queue used for management of verification for inbound roots from spoke chains. Once
the verification period elapses, the inbound messages can be aggregated into the merkle tree
for propagation to spoke chains.

_Watchers should be able to watch this queue for fraudulent messages and pause this contract
if fraud is detected._

### MERKLE

```solidity
contract MerkleTreeManager MERKLE
```

MerkleTreeManager contract instance. Will hold the active tree of aggregated inbound roots.
The root of this tree will be distributed crosschain to all spoke domains.

### onlyConnector

```solidity
modifier onlyConnector(uint32 _domain)
```

### constructor

```solidity
constructor(uint256 _delayBlocks, address _merkle, address _watcherManager) public
```

Creates a new RootManager instance.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delayBlocks | uint256 | The delay for the validation period for incoming messages in blocks. |
| _merkle | address | The address of the MerkleTreeManager on this domain. |
| _watcherManager | address | The address of the WatcherManager on this domain. |

### getPendingInboundRootsCount

```solidity
function getPendingInboundRootsCount() public view returns (uint256)
```

### setDelayBlocks

```solidity
function setDelayBlocks(uint256 _delayBlocks) public
```

Set the `delayBlocks`, the period in blocks over which an incoming message
is verified.

### addConnector

```solidity
function addConnector(uint32 _domain, address _connector) external
```

Add a new supported domain and corresponding hub connector to the system. This new domain
will receive the propagated aggregate root.

_Only owner can add a new connector. Address should be the connector on L1.
Cannot add address(0) to avoid duplicated domain in array and reduce gas fee while propagating._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The target spoke domain of the given connector. |
| _connector | address | Address of the hub connector. |

### removeConnector

```solidity
function removeConnector(uint32 _domain) public
```

Remove support for a connector and respective domain. That connector/domain will no longer
receive updates for the latest aggregate root.

_Only watcher can remove a connector.
TODO: Could add a metatx-able `removeConnectorWithSig` if we want to use relayers?_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The spoke domain of the target connector we want to remove. |

### propagate

```solidity
function propagate(uint32[] _domains, address[] _connectors) external
```

This is called by relayers to take the current aggregate tree root and propagate it to all
spoke domains (via their respective hub connectors).

_Should be called by relayers at a regular interval._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domains | uint32[] | Array of domains: should match exactly the array of `domains` in storage; used here to reduce gas costs, and keep them static regardless of number of supported domains. |
| _connectors | address[] | Array of connectors: should match exactly the array of `connectors` in storage (see `_domains` param's info on reducing gas costs). |

### aggregate

```solidity
function aggregate(uint32 _domain, bytes32 _inbound) external
```

Accept an inbound root coming from a given domain's hub connector, enqueuing this incoming
root into the current queue as it awaits the verification period.

_The aggregate tree's root, which will include this inbound root, will be propagated to all spoke
domains (via `propagate`) on a regular basis assuming the verification period is surpassed without
dispute._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The source domain of the given root. |
| _inbound | bytes32 | The inbound root coming from the given domain. |

## WatcherClient

This contract abstracts the functionality of the watcher manager.
Contracts can inherit this contract to be able to use the watcher manager's shared watcher set.

### WatcherManagerChanged

```solidity
event WatcherManagerChanged(address watcherManager)
```

### watcherManager

```solidity
contract WatcherManager watcherManager
```

### constructor

```solidity
constructor(address _watcherManager) public
```

### onlyWatcher

```solidity
modifier onlyWatcher()
```

### setWatcherManager

```solidity
function setWatcherManager(address _watcherManager) external
```

_Owner can enroll a watcher (abilities are defined by inheriting contracts)_

### unpause

```solidity
function unpause() external
```

### pause

```solidity
function pause() external
```

## WatcherManager

This contract manages a set of watchers. This is meant to be used as a shared resource that contracts can
inherit to make use of the same watcher set.

### WatcherAdded

```solidity
event WatcherAdded(address watcher)
```

### WatcherRemoved

```solidity
event WatcherRemoved(address watcher)
```

### watchers

```solidity
mapping(address => bool) watchers
```

### constructor

```solidity
constructor() public
```

### addWatcher

```solidity
function addWatcher(address _watcher) external
```

_Owner can enroll a watcher (abilities are defined by inheriting contracts)_

### removeWatcher

```solidity
function removeWatcher(address _watcher) external
```

_Owner can unenroll a watcher (abilities are defined by inheriting contracts)_

### isWatcher

```solidity
function isWatcher(address _watcher) external view returns (bool)
```

## Connector

This contract has the messaging interface functions used by all connectors.

_This contract stores information about mirror connectors, but can be used as a
base for contracts that do not have a mirror (i.e. the connector handling messaging on
mainnet). In this case, the `mirrorConnector`, `MIRROR_DOMAIN`, and `mirrorGas`
will be empty_

### NewConnector

```solidity
event NewConnector(uint32 domain, uint32 mirrorDomain, address amb, address rootManager, address mirrorConnector)
```

### MirrorConnectorUpdated

```solidity
event MirrorConnectorUpdated(address previous, address current)
```

### MirrorGasUpdated

```solidity
event MirrorGasUpdated(uint256 previous, uint256 current)
```

### DOMAIN

```solidity
uint32 DOMAIN
```

The domain of this Messaging (i.e. Connector) contract.

### AMB

```solidity
address AMB
```

Address of the AMB on this domain.

### ROOT_MANAGER

```solidity
address ROOT_MANAGER
```

RootManager contract address.

### MIRROR_DOMAIN

```solidity
uint32 MIRROR_DOMAIN
```

The domain of the corresponding messaging (i.e. Connector) contract.

### mirrorConnector

```solidity
address mirrorConnector
```

Connector on L2 for L1 connectors, and vice versa.

### mirrorGas

```solidity
uint256 mirrorGas
```

Gas costs forwarded to the `processMessage` call on the mirror domain

### onlyAMB

```solidity
modifier onlyAMB()
```

Errors if the msg.sender is not the registered AMB

### onlyRootManager

```solidity
modifier onlyRootManager()
```

Errors if the msg.sender is not the registered ROOT_MANAGER

### constructor

```solidity
constructor(uint32 _domain, uint32 _mirrorDomain, address _amb, address _rootManager, address _mirrorConnector, uint256 _mirrorGas) internal
```

Creates a new HubConnector instance

_The connectors are deployed such that there is one on each side of an AMB (i.e.
for optimism, there is one connector on optimism and one connector on mainnet)_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain this connector lives on |
| _mirrorDomain | uint32 | The spoke domain |
| _amb | address | The address of the amb on the domain this connector lives on |
| _rootManager | address | The address of the RootManager on mainnet |
| _mirrorConnector | address | The address of the spoke connector |
| _mirrorGas | uint256 | The gas costs required to process a message on mirror |

### setMirrorConnector

```solidity
function setMirrorConnector(address _mirrorConnector) public
```

Sets the address of the l2Connector for this domain

### setMirrorGas

```solidity
function setMirrorGas(uint256 _mirrorGas) public
```

Sets the address of the l2Connector for this domain

### processMessage

```solidity
function processMessage(bytes _data) external
```

Processes a message received by an AMB

_This is called by AMBs to process messages originating from mirror connector_

### verifySender

```solidity
function verifySender(address _expected) external returns (bool)
```

Checks the cross domain sender for a given address

### _sendMessage

```solidity
function _sendMessage(bytes _data) internal virtual
```

This function is used by the Connext contract on the l2 domain to send a message to the
l1 domain (i.e. called by Connext on optimism to send a message to mainnet with roots)

### _processMessage

```solidity
function _processMessage(bytes _data) internal virtual
```

This function is used by the AMBs to handle incoming messages. Should store the latest
root generated on the l2 domain.

### _verifySender

```solidity
function _verifySender(address _expected) internal virtual returns (bool)
```

Verify that the msg.sender is the correct AMB contract, and that the message's origin sender
is the expected address.

_Should be overridden by the implementing Connector contract._

### _setMirrorConnector

```solidity
function _setMirrorConnector(address _mirrorConnector) internal virtual
```

### _setMirrorGas

```solidity
function _setMirrorGas(uint256 _mirrorGas) internal
```

## ConnectorManager

This is an interface to allow the `Messaging` contract to be used
as a `XappConnectionManager` on all router contracts.

_Each nomad router contract has a `XappConnectionClient`, which references a
XappConnectionManager to get the `Home` (outbox) and approved `Replica` (inbox)
instances. At any point the client can replace the manager it's pointing to,
changing the underlying messaging connection._

### constructor

```solidity
constructor() internal
```

### home

```solidity
function home() public view returns (contract IOutbox)
```

Get the local inbox contract from the xAppConnectionManager

_The local inbox contract is a SpokeConnector with AMBs, and a
Home contract with nomad_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IOutbox | The local inbox contract |

### isReplica

```solidity
function isReplica(address _potentialReplica) public view returns (bool)
```

Determine whether _potentialReplica is an enrolled Replica from the xAppConnectionManager

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if _potentialReplica is an enrolled Replica |

### localDomain

```solidity
function localDomain() external view virtual returns (uint32)
```

Get the local domain from the xAppConnectionManager

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The local domain |

## HubConnector

This contract implements the messaging functions needed on the hub-side of a given AMB.
The HubConnector has a limited set of functionality compared to the SpokeConnector, namely that
it contains no logic to store or prove messages.

_This contract should be deployed on the hub-side of an AMB (i.e. on L1), and contracts
which extend this should implement the virtual functions defined in the BaseConnector class_

### constructor

```solidity
constructor(uint32 _domain, uint32 _mirrorDomain, address _amb, address _rootManager, address _mirrorConnector, uint256 _mirrorGas) internal
```

Creates a new HubConnector instance

_The connectors are deployed such that there is one on each side of an AMB (i.e.
for optimism, there is one connector on optimism and one connector on mainnet)_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain this connector lives on |
| _mirrorDomain | uint32 | The spoke domain |
| _amb | address | The address of the amb on the domain this connector lives on |
| _rootManager | address | The address of the RootManager on mainnet |
| _mirrorConnector | address | The address of the spoke connector |
| _mirrorGas | uint256 | The gas costs required to process a message on mirror |

### sendMessage

```solidity
function sendMessage(bytes _data) external
```

Sends a message over the amb

_This is called by the root manager *only* on mainnet to propagate the aggregate root_

## SendOutboundRootResolver

### CONNECTOR

```solidity
contract SpokeConnector CONNECTOR
```

### EXECUTION_INTERVAL

```solidity
uint256 EXECUTION_INTERVAL
```

### lastExecuted

```solidity
uint256 lastExecuted
```

### lastRootSent

```solidity
bytes32 lastRootSent
```

### constructor

```solidity
constructor(address _connector, uint256 _executionInterval) public
```

### changeExecutionInterval

```solidity
function changeExecutionInterval(uint256 _executionInterval) public
```

### sendMessage

```solidity
function sendMessage() external
```

### checker

```solidity
function checker() external view returns (bool canExec, bytes execPayload)
```

## SpokeConnector

This contract implements the messaging functions needed on the spoke-side of a given AMB.
The SpokeConnector extends the HubConnector functionality by being able to send, store, and prove
messages.

_If you are deploying this contract to mainnet, then the mirror values stored in the HubConnector
will be unused_

### SenderAdded

```solidity
event SenderAdded(address sender)
```

### SenderRemoved

```solidity
event SenderRemoved(address sender)
```

### AggregateRootReceived

```solidity
event AggregateRootReceived(bytes32 root)
```

### AggregateRootRemoved

```solidity
event AggregateRootRemoved(bytes32 root)
```

### Dispatch

```solidity
event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message)
```

### Process

```solidity
event Process(bytes32 leaf, bool success, bytes returnData)
```

### MessageStatus

```solidity
enum MessageStatus {
  None,
  Proven,
  Processed
}
```

### Proof

```solidity
struct Proof {
  bytes message;
  bytes32[32] path;
  uint256 index;
}
```

### delayBlocks

```solidity
uint256 delayBlocks
```

Number of blocks to delay the processing of a message to allow for watchers to verify
the validity and pause if necessary.

### MERKLE

```solidity
contract MerkleTreeManager MERKLE
```

MerkleTreeManager contract instance. Will hold the active tree of message hashes, whose root
will be sent crosschain to the hub for aggregation and redistribution.

### PROCESS_GAS

```solidity
uint256 PROCESS_GAS
```

Minimum gas for processing a received message (reserved for handle)

### RESERVE_GAS

```solidity
uint256 RESERVE_GAS
```

Reserved gas (to ensure tx completes in case message processing runs out)

### pendingAggregateRoots

```solidity
mapping(bytes32 => uint256) pendingAggregateRoots
```

This will hold the commit block for incoming aggregateRoots from the hub chain. Once
they are verified, (i.e. have surpassed the verification period in `delayBlocks`) they can
be used for proving inclusion of crosschain messages.

_NOTE: A commit block of 0 should be considered invalid (it is an empty entry in the
mapping). We must ALWAYS ensure the value is not 0 before checking whether it has surpassed the
verification period._

### provenAggregateRoots

```solidity
mapping(bytes32 => bool) provenAggregateRoots
```

This tracks the roots of the aggregate tree containing outbound roots from all other
supported domains. The current version is the one that is known to be past the delayBlocks
time period.

_This root is the root of the tree that is aggregated on mainnet (composed of all the roots
of previous trees)._

### provenMessageRoots

```solidity
mapping(bytes32 => bool) provenMessageRoots
```

This tracks whether the root has been proven to exist within the given aggregate root.

_Tracking this is an optimization so you dont have to prove inclusion of the same constituent
root many times._

### whitelistedSenders

```solidity
mapping(address => bool) whitelistedSenders
```

_This is used for the `onlyWhitelistedSender` modifier, which gates who
can send messages using `dispatch`._

### nonces

```solidity
mapping(uint32 => uint32) nonces
```

domain => next available nonce for the domain.

### messages

```solidity
mapping(bytes32 => enum SpokeConnector.MessageStatus) messages
```

Mapping of message leaves to MessageStatus, keyed on leaf.

### onlyWhitelistedSender

```solidity
modifier onlyWhitelistedSender()
```

### constructor

```solidity
constructor(uint32 _domain, uint32 _mirrorDomain, address _amb, address _rootManager, address _mirrorConnector, uint256 _mirrorGas, uint256 _processGas, uint256 _reserveGas, uint256 _delayBlocks, address _merkle, address _watcherManager) internal
```

Creates a new SpokeConnector instance.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain this connector lives on. |
| _mirrorDomain | uint32 | The hub domain. |
| _amb | address | The address of the AMB on the spoke domain this connector lives on. |
| _rootManager | address | The address of the RootManager on the hub. |
| _mirrorConnector | address | The address of the spoke connector. |
| _mirrorGas | uint256 | The gas costs required to process a message on mirror. |
| _processGas | uint256 | The gas costs used in `handle` to ensure meaningful state changes can occur (minimum gas needed to handle transaction). |
| _reserveGas | uint256 | The gas costs reserved when `handle` is called to ensure failures are handled. |
| _delayBlocks | uint256 | The delay for the validation period for incoming messages in blocks. |
| _merkle | address | The address of the MerkleTreeManager on this spoke domain. |
| _watcherManager | address | The address of the WatcherManager to whom this connector is a client. |

### addSender

```solidity
function addSender(address _sender) public
```

Adds a sender to the whitelist.

_Only whitelisted routers (senders) can call `dispatch`._

### removeSender

```solidity
function removeSender(address _sender) public
```

Removes a sender from the whitelist.

_Only whitelisted routers (senders) can call `dispatch`._

### setDelayBlocks

```solidity
function setDelayBlocks(uint256 _delayBlocks) public
```

Set the `delayBlocks`, the period in blocks over which an incoming message
is verified.
Set the delayBlocks, in case this needs to be configured later

### removePendingAggregateRoot

```solidity
function removePendingAggregateRoot(bytes32 _fraudulentRoot) public
```

Manually remove a pending aggregateRoot by owner if the contract is paused.

_This method is required for handling fraud cases in the current construction._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _fraudulentRoot | bytes32 | Target fraudulent root that should be erased from the `pendingAggregateRoots` mapping. |

### outboundRoot

```solidity
function outboundRoot() external view returns (bytes32)
```

This returns the root of all messages with the origin domain as this domain (i.e.
all outbound messages)

### localDomain

```solidity
function localDomain() external view returns (uint32)
```

This provides the implementation for what is defined in the ConnectorManager
to avoid storing the domain redundantly

### send

```solidity
function send() external
```

This returns the root of all messages with the origin domain as this domain (i.e.
all outbound messages)

### dispatch

```solidity
function dispatch(uint32 _destinationDomain, bytes32 _recipientAddress, bytes _messageBody) external returns (bytes32)
```

This function adds transfers to the outbound transfer merkle tree.

_The root of this tree will eventually be dispatched to mainnet via `send`. On mainnet (the "hub"),
it will be combined into a single aggregate root by RootManager (along with outbound roots from other
chains). This aggregate root will be redistributed to all destination chains.

NOTE: okay to leave dispatch operational when paused as pause is designed for crosschain interactions_

### proveAndProcess

```solidity
function proveAndProcess(struct SpokeConnector.Proof[] _proofs, bytes32 _aggregateRoot, bytes32[32] _aggregatePath, uint256 _aggregateIndex) external
```

Must be able to call the `handle` function on the BridgeRouter contract. This is called
on the destination domain to handle incoming messages.

Proving:
Calculates the expected inbound root from an origin chain given a leaf (message hash),
the index of the leaf, and the merkle proof of inclusion (path). Next, we check to ensure that this
calculated inbound root is included in the current aggregateRoot, given its index in the aggregator
tree and the proof of inclusion.

Processing:
After all messages have been proven, we dispatch each message to Connext (BridgeRouter) for
execution.

_Currently, ALL messages in a given batch must path to the same shared inboundRoot, meaning they
must all share an origin. See open TODO below for a potential solution to enable multi-origin batches.
Intended to be called by the relayer at specific intervals during runtime.
Will record a calculated root as having been proven if we've already proven that it was included
in the aggregateRoot._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proofs | struct SpokeConnector.Proof[] | Batch of Proofs containing messages for proving/processing. |
| _aggregateRoot | bytes32 | The target aggregate root we want to prove inclusion for. This root must have already been delivered to this spoke connector contract and surpassed the validation period. |
| _aggregatePath | bytes32[32] | Merkle path of inclusion for the inbound root. |
| _aggregateIndex | uint256 | Index of the inbound root in the aggregator's merkle tree in the hub. |

### receiveAggregateRoot

```solidity
function receiveAggregateRoot(bytes32 _newRoot) internal
```

This is either called by the Connector (AKA `this`) on the spoke (L2) chain after retrieving
latest `aggregateRoot` from the AMB (sourced from mainnet) OR called by the AMB directly.

_Must check the msg.sender on the origin chain to ensure only the root manager is passing
these roots._

### verifyAggregateRoot

```solidity
function verifyAggregateRoot(bytes32 _aggregateRoot) internal
```

Checks whether the given aggregate root has surpassed the verification period.

_Reverts if the given aggregate root is invalid (does not exist) OR has not surpassed
verification period.
If the target aggregate root is pending and HAS surpassed the verification period, then we will
move it over to the proven mapping._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _aggregateRoot | bytes32 | Target aggregate root to verify. |

### calculateMessageRoot

```solidity
function calculateMessageRoot(bytes32 _messageHash, bytes32[32] _messagePath, uint256 _messageIndex) internal view returns (bytes32)
```

Checks whether a given message is valid. If so, calculates the expected inbound root from an
origin chain given a leaf (message hash), the index of the leaf, and the merkle proof of inclusion.

_Reverts if message's MessageStatus != None (i.e. if message was already proven or processed)._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _messageHash | bytes32 | Leaf (message hash) that requires proving. |
| _messagePath | bytes32[32] | Merkle path of inclusion for the leaf. |
| _messageIndex | uint256 | Index of leaf in the merkle tree on the origin chain of the message. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | bytes32 Calculated root. |

### proveMessageRoot

```solidity
function proveMessageRoot(bytes32 _messageRoot, bytes32 _aggregateRoot, bytes32[32] _aggregatePath, uint256 _aggregateIndex) internal
```

Prove an inbound message root from another chain is included in the target aggregateRoot.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _messageRoot | bytes32 | The message root we want to verify. |
| _aggregateRoot | bytes32 | The target aggregate root we want to prove inclusion for. This root must have already been delivered to this spoke connector contract and surpassed the validation period. |
| _aggregatePath | bytes32[32] | Merkle path of inclusion for the inbound root. |
| _aggregateIndex | uint256 | Index of the inbound root in the aggregator's merkle tree in the hub. |

### process

```solidity
function process(bytes _message) internal returns (bool _success)
```

Given formatted message, attempts to dispatch message payload to end recipient.

_Recipient must implement a `handle` method (refer to IMessageRecipient.sol)
Reverts if formatted message's destination domain is not the Replica's domain,
if message has not been proven,
or if not enough gas is provided for the dispatch transaction._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _message | bytes | Formatted message |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _success | bool | TRUE iff dispatch transaction succeeded |

## L2Message

```solidity
struct L2Message {
  address l2Sender;
  address to;
  uint256 l2Block;
  uint256 l1Block;
  uint256 l2Timestamp;
  uint256 value;
  bytes callData;
}
```

## IConnector

This interface is what the Connext contract will send and receive messages through.
The messaging layer should conform to this interface, and should be interchangeable (i.e.
could be Nomad or a generic AMB under the hood).

_This uses the nomad format to ensure nomad can be added in as it comes back online.

Flow from transfer from polygon to optimism:
1. User calls `xcall` with destination specified
2. This will swap in to the bridge assets
3. The swapped assets will get burned
4. The Connext contract will call `dispatch` on the messaging contract to add the transfer
   to the root
5. [At some time interval] Relayers call `send` to send the current root from polygon to
   mainnet. This is done on all "spoke" domains.
6. [At some time interval] Relayers call `propagate` [better name] on mainnet, this generates a new merkle
   root from all of the AMBs
   - This function must be able to read root data from all AMBs and aggregate them into a single merkle
     tree root
   - Will send the mixed root from all chains back through the respective AMBs to all other chains
7. AMB will call `update` to update the latest root on the messaging contract on spoke domains
8. [At any point] Relayers can call `proveAndProcess` to prove inclusion of dispatched message, and call
   process on the `Connext` contract
9. Takes minted bridge tokens and credits the LP

AMB requirements:
- Access `msg.sender` both from mainnet -> spoke and vice versa
- Ability to read *our root* from the AMB

AMBs:
- PoS bridge from polygon
- arbitrum bridge
- optimism bridge
- gnosis chain
- bsc (use multichain for messaging)_

### MessageSent

```solidity
event MessageSent(bytes data, address caller)
```

Emitted whenever a message is successfully sent over an AMB

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | The contents of the message |
| caller | address | Who called the function (sent the message) |

### MessageProcessed

```solidity
event MessageProcessed(bytes data, address caller)
```

Emitted whenever a message is successfully received over an AMB

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | The contents of the message |
| caller | address | Who called the function |

### processMessage

```solidity
function processMessage(bytes _data) external
```

### verifySender

```solidity
function verifySender(address _expected) external returns (bool)
```

## IConnectorManager

Each router extends the `XAppConnectionClient` contract. This contract
allows an admin to call `setXAppConnectionManager` to update the underlying
pointers to the messaging inboxes (Replicas) and outboxes (Homes).

_This interface only contains the functions needed for the `XAppConnectionClient`
will interface with._

### home

```solidity
function home() external view returns (contract IOutbox)
```

Get the local inbox contract from the xAppConnectionManager

_The local inbox contract is a SpokeConnector with AMBs, and a
Home contract with nomad_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IOutbox | The local inbox contract |

### isReplica

```solidity
function isReplica(address _potentialReplica) external view returns (bool)
```

Determine whether _potentialReplica is an enrolled Replica from the xAppConnectionManager

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if _potentialReplica is an enrolled Replica |

### localDomain

```solidity
function localDomain() external view returns (uint32)
```

Get the local domain from the xAppConnectionManager

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The local domain |

## IHubConnector

### sendMessage

```solidity
function sendMessage(bytes _data) external
```

## DomainIndexer

This abstract contract was written to ensure domain and connector mutex is scalable for the
purposes of messaging layer operations. In particular, it aims to reduce gas costs to be relatively
static regardless of the number of domains kept in storage by enabling callers of `RootManager.propagate`
to supply the `domains` and `connectors` arrays as params, and check the hashes of those params against
those we keep in storage.

### domains

```solidity
uint32[] domains
```

Domains array tracks currently subscribed domains to this hub aggregator.
We should distribute the aggregate root to all of these domains in the `propagate` method.

_Whenever this domains array is updated, the connectors array should also be updated._

### domainsHash

```solidity
bytes32 domainsHash
```

A "quick reference" hash used in the `propagate` method below to validate that the provided
array of domains matches the one we have in storage.

_This hash should be re-calculated whenever the domains array is updated._

### connectors

```solidity
address[] connectors
```

Tracks the addresses of the hub connector contracts corresponding to subscribed spoke domains.
The index of any given connector in this array should match the index of that connector's target spoke
domain in the `domains` array above.

_This should be updated whenever the domains array is updated._

### connectorsHash

```solidity
bytes32 connectorsHash
```

A "quick reference" hash used in the `propagate` method below to validate that the provided
array of connectors matches the one we have in storage.

_This hash should be re-calculated whenever the connectors array is updated._

### domainToIndexPlusOne

```solidity
mapping(uint32 => uint256) domainToIndexPlusOne
```

Shortcut to reverse lookup the index by domain. We index starting at one so the zero value can
be considered invalid (see fn: `isDomainSupported`).

_This should be updated whenever the domains array is updated._

### isDomainSupported

```solidity
function isDomainSupported(uint32 _domain) public view returns (bool)
```

Convenience shortcut for supported domains. Used to sanity check adding new domains.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | Domain to check. |

### getDomainIndex

```solidity
function getDomainIndex(uint32 _domain) public view returns (uint256)
```

Gets the index of a given domain in the domains and connectors arrays.

_Reverts if domain is not supported._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain for which to get the index value. |

### getConnectorForDomain

```solidity
function getConnectorForDomain(uint32 _domain) public view returns (address)
```

Gets the corresponding hub connector address for a given spoke domain.

_Inefficient, should only be used by caller if they have no index reference._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | The domain for which to get the hub connector address. |

### validateDomains

```solidity
function validateDomains(uint32[] _domains, address[] _connectors) public view
```

Validate given domains and connectors arrays are correct (i.e. they mirror what is
currently saved in storage).

_Reverts if domains or connectors do not match, including ordering._

### addDomain

```solidity
function addDomain(uint32 _domain, address _connector) internal
```

Handles all mutex for adding support for a given domain.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | Domain for which we are adding support. |
| _connector | address | Corresponding hub connector address belonging to given domain. |

### removeDomain

```solidity
function removeDomain(uint32 _domain) internal returns (address)
```

Handles all mutex for removing support for a given domain.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _domain | uint32 | Domain we are removing. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the hub connector for the domain we removed. |

### updateHashes

```solidity
function updateHashes() internal
```

Calculate the new hashes for the domains and connectors arrays and update storage refs.

_Used for the Connector update functions `addConnector`, `removeConnector`._

## IGasTokenOracle

### getRate

```solidity
function getRate(uint32 originDomain) external view returns (uint256 num, uint256 den)
```

## IMessageRecipient

### handle

```solidity
function handle(uint32 _origin, uint32 _nonce, bytes32 _sender, bytes _message) external
```

