---
sidebar_position: 2
title: Routers
id: routers
---

# Routers

This section contains a full API reference of all public functions & events related to routers and router liquidity management.

---

## Events

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

---

## Getters

### getRouterApproval

```solidity
function getRouterApproval(address _router) public view returns (bool)
```

Returns the approval status of a router for the given router address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if router is approved |

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

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Recipient address for router |

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

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Owner address of router |

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

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Proposed owner address of router |

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

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Currently proposed router owner timestamp |

### routerBalances

```solidity
function routerBalances(address _router, address _asset) public view returns (uint256)
```

Gets balance of asset for the specified router.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _router | address | The relevant router address |
| _asset | address | The relevant asset |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Balance the router owns of asset |

---

## Functions

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