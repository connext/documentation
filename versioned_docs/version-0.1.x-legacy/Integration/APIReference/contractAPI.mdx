---
sidebar_position: 2
---

# Contract

## Functions

### getChainId

```solidity
  function getChainId(
  ) public view override returns (uint256 _chainId)
```

Gets the chain id of this contract. If not specified during init, will use the `block.chainId`.

### getStoredChainId

```solidity
  function getStoredChainId(
  ) external view override returns (uint256)
```

Gets the chain id that this contract has stored.

### addRouter

```solidity
  function addRouter(
    address router
  ) external override onlyOwner
```

Adds a router to the router list that can transact crosschain.

#### Parameters:

| Name      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `router`  | address  | The router address to add  |

### removeRouter

```solidity
  function removeRouter(
    address router
  ) external override onlyOwner
```

Removes a router from the router list that can transact crosschain.

#### Parameters:

| Name      | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `router`  | address  | The router address to remove  |

### addAssetId

```solidity
  function addAssetId(
    address assetId
  ) external override onlyOwner
```

Adds an asset to the asset list that can be transferred

- The asset address should be on the same chain as the contract.

#### Parameters:

| Name       | Type    | Description                           |
| :--------- | :------ | :------------------------------------ |
| `assetId`  | address | The asset address to add to the list  |

### removeAssetId

```solidity
  function removeAssetId(
    address assetId
  ) external override onlyOwner
```

Removes an asset from the asset list that can be transferred

- The asset address should be on the same chain as the contract.

#### Parameters:

| Name       | Type    | Description                                |
| :--------- | :------ | :----------------------------------------- |
| `assetId`  | address | The asset address to remove from the list  |

### addLiquidityFor

```solidity
  function addLiquidityFor(
    uint256 amount,
    address assetId,
    address router
  ) external payable override nonReentrant
```

Adds liquidity to a router.

#### Parameters:

| Name      | Type    | Description                                                        |
| :-------- | :------ | :----------------------------------------------------------------- |
| `amount`  | uint256 | The amount of assetId to add as liquidity                          |
| `assetId` | address | The address (or `address(0)` for native asset) of the asset to add |
| `router`  | address | The router to add liquidity                                        |

### addLiquidity

```solidity
  function addLiquidity(
    uint256 amount,
    address assetId
  ) external payable override nonReentrant
```

Adds liquidity to a router.

This function should be called from a router, since it passes `msg.sender` as a router to `_addLiquidityForRouter`.

#### Parameters:

| Name      | Type    | Description                                                        |
| :-------- | :------ | :----------------------------------------------------------------- |
| `amount`  | uint256 | The amount of assetId to add as liquidity                          |
| `assetId` | address | The address (or `address(0)` for native asset) of the asset to add |

### removeLiquidity

```solidity
  function removeLiquidity(
    uint256 amount,
    address assetId,
    address payable recipient
  ) external override nonReentrant
```

Removes liquidity from a router.

This function should be called from a router.

#### Parameters:

| Name        | Type    | Description                                                           |
| :---------- | :------ | :-------------------------------------------------------------------- |
| `amount`    | uint256 | The amount of assetId to remove as liquidity                          |
| `assetId`   | address | The address (or `address(0)` for native asset) of the asset to remove |
| `recipient` | address | The address to transfer removed liquidity to                          |

### prepare

```solidity
  function prepare(
    PrepareArgs calldata args
  ) external payable override nonReentrant returns (TransactionData memory)
```

Creates a crosschain transaction.

When called on the sending chain, the user is expected to lock up funds.
When called on the receiving chain, the router deducts the transfer amount from the available liquidity.
The majority of the information about a given transfer does not change between chains,
with three notable exceptions: `amount`, `expiry`, and `preparedBlock`.
The `amount` and `expiry` are decremented between sending and receiving chains to provide an incentive for
the router to complete the transaction and time for the router to fulfill the transaction on the sending chain
after the unlocking signature is revealed, respectively.

#### Parameters:

| Name   | Type                                   | Description                                                                     |
| :----- | :------------------------------------- | :------------------------------------------------------------------------------ |
| `args` | struct ITransactionManager.PrepareArgs | The parameters for crosschain transaction, encoded as `PrepareArgs` in calldata |

#### Return Values:

| Name | Type                                       | Description          |
| :--- | :----------------------------------------- | :------------------- |
|      | struct ITransactionManager.TransactionData | The transaction data |

### fulfill

```solidity
  function fulfill(
    FulfillArgs calldata args
  ) external override nonReentrant returns (TransactionData memory)
```

Completes a crosschain transaction.

When called on the receiving chain, the user reveals their signature on the transactionId and is sent the amount corresponding to
the number of shares the router locked when calling `prepare`. The router then uses this signature to unlock the corresponding funds on
the receiving chain, which are then added back to their available liquidity. The user includes a relayer fee since it is not
assumed they will have gas on the receiving chain. This function *must* be called before the transaction expiry has elapsed.

#### Parameters:

| Name   | Type                                   | Description                                                                                  |
| :----- | :------------------------------------- | :------------------------------------------------------------------------------------------- |
| `args` | struct ITransactionManager.FulfillArgs | The parameters for completing a crosschain transaction, encoded as `FulfillArgs` in calldata |

#### Return Values:

| Name | Type                                       | Description          |
| :--- | :----------------------------------------- | :------------------- |
|      | struct ITransactionManager.TransactionData | The transaction data |

### cancel

```solidity
  function cancel(
    CancelArgs calldata args
  ) external override nonReentrant returns (TransactionData memory)
```

Cancels a crosschain transaction.

Any crosschain transaction can be cancelled after it has been created to prevent indefinite lock up of funds.
After the transaction has expired, anyone can cancel it. Before the expiry, only the recipient of the funds on the given chain is
able to cancel. On the sending chain, this means only the router is able to cancel before the expiry, while only the user can
prematurely cancel on the receiving chain.

#### Parameters:

| Name   | Type                                  | Description                                                                                |
| :----- | :------------------------------------ | :----------------------------------------------------------------------------------------- |
| `args` | struct ITransactionManager.CancelArgs | The parameters for canceling a crosschain transaction, encoded as `CancelArgs` in calldata |

#### Return Values:

| Name | Type                                       | Description          |
| :--- | :----------------------------------------- | :------------------- |
|      | struct ITransactionManager.TransactionData | The transaction data |

### _addLiquidityForRouter

```solidity
  function _addLiquidityForRouter(
    uint256 amount,
    address assetId,
    address router
  ) internal
```

Adds liquidity to a router. This is a helper function containing the logic to verify, and to add liquidity to a given router.

#### Parameters:

| Name      | Type    | Description                                                        |
| :-------- | :------ | :----------------------------------------------------------------- |
| `amount`  | uint256 | The amount of assetId to add as liquidity                          |
| `assetId` | address | The address (or `address(0)` for native asset) of the asset to add |
| `router`  | address | The router to add liquidity                                        |

### transferAssetToContract

```solidity
  function transferAssetToContract(
    address assetId,
    uint256 specifiedAmount
  ) internal returns (uint256)
```

This is a helper function to handle transferring funds from msg.sender to the transaction manager contract. It is used in `prepare`, `_addLiquidityForRouter`.

#### Parameters:

| Name               | Type    | Description                                                             |
| :----------------- | :------ | :---------------------------------------------------------------------- |
| `assetId`          | address | The address (or `address(0)` for native asset) of the asset to transfer |
| `specifiedAmount`  | uint256 | The amount of assetId to transfer                                       |

#### Return Values:

| Name  | Type    | Description                                       |
| :---- | :------ | :------------------------------------------------ |
|       | uint256 | The amount of the asset that has been transferred |

### recoverCancelSignature

```solidity
  function recoverCancelSignature(
    bytes32 transactionId,
    uint256 receivingChainId,
    address receivingChainTxManagerAddress,
    bytes calldata signature
  ) internal pure returns (address)
```

This is a helper function to recover the signer address from the signature.

#### Parameters:

| Name                              | Type    | Description                                              |
| :-------------------------------- | :------ | :------------------------------------------------------- |
| `transactionId`                   | bytes32 | The transaction identifier of the recovering transaction |
| `receivingChainId`                | uint256 | The receiving chain id                                   |
| `receivingChainTxManagerAddress`  | address | The transaction manager address on the receiving chain   |
| `signature`                       | bytes   | The signature to recover the signer address from         |

#### Return Values:

| Name  | Type    | Description                         |
| :---- | :------ | :---------------------------------- |
|       | address | The signer address of the signature |

### recoverFulfillSignature

```solidity
  function recoverFulfillSignature(
    bytes32 transactionId,
    uint256 relayerFee,
    uint256 receivingChainId,
    address receivingChainTxManagerAddress,
    bytes calldata signature
  ) internal pure returns (address)
```

This is a helper function to recover the signer address from the signature.

#### Parameters:

| Name                              | Type    | Description                                                             |
| :-------------------------------- | :------ | :---------------------------------------------------------------------- |
| `transactionId`                   | bytes32 | The transaction identifier of the recovering transaction                |
| `relayerFee`                      | uint256 | The fee paid to the relayer for submitting the transaction for the user |
| `receivingChainId`                | uint256 | The receiving chain id                                                  |
| `receivingChainTxManagerAddress`  | address | The transaction manager address on the receiving chain                  |
| `signature`                       | bytes   | The signature to recover the signer address from                        |

#### Return Values:

| Name  | Type    | Description                         |
| :---- | :------ | :---------------------------------- |
|       | address | The signer address of the signature |

### recoverSignature

```solidity
  function recoverSignature(
    bytes memory encodedPayload,
    bytes calldata signature
  ) internal pure returns (address)
```

This is a helper function to recover the signer address from the signature and the encodedPayload.

#### Parameters:

| Name             | Type  | Description                                       |
| :--------------- | :---- | :------------------------------------------------ |
| `encodedPayload` | bytes | The encoded payload that was signed               |
| `signature`      | bytes | The signature to recover the signer address from  |

#### Return Values:

| Name  | Type    | Description                         |
| :---- | :------ | :---------------------------------- |
|       | address | The signer address of the signature |

### hashInvariantTransactionData

```solidity
  function hashInvariantTransactionData(
    TransactionData calldata txData
  ) internal pure returns (bytes32)
```

This is a helper function to get the hash of only the invariant portions of a given crosschain transaction.

#### Parameters:

| Name     | Type                                       | Description                                                    |
| :------- | :----------------------------------------- | :------------------------------------------------------------- |
| `txData` | struct ITransactionManager.TransactionData | The transaction data, encoded as `TransactionData` in calldata |

#### Return Values:

| Name  | Type    | Description                                |
| :---- | :------ | :----------------------------------------- |
|       | bytes32 | The hash of the invariant transaction data |

### hashVariantTransactionData

```solidity
  function hashVariantTransactionData(
    uint256 amount,
    uint256 expiry,
    uint256 preparedBlockNumber
  ) internal pure returns (bytes32)
```

This is a helper function to get the hash of only the variant portions of a given crosschain transaction.

#### Parameters:

| Name                  | Type    | Description                   |
| :-------------------- | :------ | :---------------------------- |
| `amount`              | uint256 | The amount of the transaction |
| `expiry`              | uint256 | The expiry of the transaction |
| `preparedBlockNumber` | uint256 | The prepared block number     |

#### Return Values:

| Name  | Type    | Description                              |
| :---- | :------ | :--------------------------------------- |
|       | bytes32 | The hash of the variant transaction data |

### _receivingChainFulfill

```solidity
  function _receivingChainFulfill(
    TransactionData calldata txData,
    uint256 relayerFee,
    bytes calldata callData
  ) internal returns (bool, bool, bytes memory)
```

This is a helper function to handle the receiving-chain fulfillment.
This function should pay the relayer and either send funds to the specified address or execute the calldata.
Returns a tuple of boolean, bytes indicating the success and return data of the external call.

#### Parameters:

| Name         | Type                                       | Description                                                             |
| :----------- | :----------------------------------------- | :---------------------------------------------------------------------- |
| `txData`     | struct ITransactionManager.TransactionData | The transaction data, encoded as `TransactionData` in calldata          |
| `relayerFee` | uint256                                    | The fee paid to the relayer for submitting the transaction for the user |
| `callData`   | bytes                                      | The prepared block number                                               |

#### Return Values:

| Name  | Type    | Description                                                                   |
| :---- | :------ | :---------------------------------------------------------------------------- |
|       | bool    | The result of calling the external call (false if it is simply sending funds) |
|       | bool    | True if it is external call and the `txData.callTo` is a contract             |
|       | bytes   | The return data of the external call                                          |
