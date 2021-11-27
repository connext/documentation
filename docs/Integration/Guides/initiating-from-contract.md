---
sidebar_position: 3
---

# เริ่มต้นทำธุรกรรมข้ามบล็อคเชนจาก Smart Contract

มันเป็นไปได้ที่จะเริ่มต้นธุรกรรมข้ามเช่น NXTP ผ่าน smart contract ที่สามารถให้ NXTP นั้นใช้งานเป็น "money lego" และต่อรวมกับแอพลิเคชั่น DeFi ตัวอย่างเช่น ใครก็สามารถเขียน contract เพื่อจะแลกเปลี่ยน (swap) บน Uniswap หรือ SushiSwap และโอนโทเคนที่ได้รับตรงไปสู่บล็อคเชนต่างๆ

## ขั้นตอน

เพื่อที่จะเริ่มต้นธุรกรรมข้ามบล็อคเชน คุณจะต้องได้รับ การประมูลที่ถูกเซ็นแล้ว (signed bid) จาก router โดยสิ่งนี้สามารถทำได้ด้วยการใช้ method `getTransferQuote` จาก SDK โดยสิ่งนี้สามารถนำไปใส่ในบล็อคเชนด้วยการใช้คำสั่ง `prepare`

ตัว smart contract สามารถเรียกใช้ฟังก์ชั่น [`prepare`](https://github.com/connext/nxtp/blob/main/packages/contracts/contracts/TransactionManager.sol#L287) บน contract `TransactionManager` ด้วยการใช้ [interface](https://github.com/connext/nxtp/blob/main/packages/contracts/contracts/interfaces/ITransactionManager.sol) ของมัน

contract ที่ปล่อยใช้แล้ว (deployed) จะสามารถหาเจอได้ใน [deployments.json](https://github.com/connext/nxtp/blob/main/packages/contracts/deployments.json)

## ตัวอย่าง

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
