---
sidebar_position: 3
---

# เริ่มต้นทำธุรกรรมข้ามบล็อคเชนจาก Smart Contract

TODO:

It is possible to initiate an NXTP crosschain transaction from a smart contract. This allows NXTP to be used as a "money lego" and integrated into DeFi applications. For example, one can write a contract to swap on Uniswap or SushiSwap and directly transfer the received tokens across chains.

## Process

In order to initiate a crosschain transaction, you will need to retrieve a signed bid from a router. This can be done by using the `getTransferQuote` method in the SDK. This quote can then be put on chain using the `prepare` method.

Th smart contract can then use the [`prepare`](https://github.com/connext/nxtp/blob/main/packages/contracts/contracts/TransactionManager.sol#L287) function on the `TransactionManager` contract using its [interface](https://github.com/connext/nxtp/blob/main/packages/contracts/contracts/interfaces/ITransactionManager.sol).

The deployed contract addresses can be found in the [deployments.json](https://github.com/connext/nxtp/blob/main/packages/contracts/deployments.json).

## Example

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./interfaces/ITransactionManager.sol";

contract CrossChain {
  private immutable ITransactionManager transactionManager;

  constructor() public {
    transactionManager = ITransactionManager(0x80623b8534d855479Ff4621caBE65d451A81BDFe); // from deployments.json
  }

  function transfer(
    address user,
    InvariantTransactionData calldata invariantData, // contains swap info such as assets, router, chains
    uint256 expiry,
    bytes calldata encryptedCallData, // optional calldata
    bytes calldata encodedBid, // bid from router
    bytes calldata bidSignature // router's sig on bid
  ) public returns (TransactionData memory) {

    // ...
    // do some stuff
    // ...

    return transactionManager.prepare(
      invariantData,
      amount,
      expiry,
      encryptedCallData,
      encodedBid,
      bidSignature
    )
  }
}
```
