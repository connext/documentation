---
sidebar_position: 2
---

# การเรียกใช้ Contract บนบล็อคเชนที่รอรับ

NXTP Routers นั้นสามารถทำหน้าที่เป็น ตัวส่งต่อธุรกรรมเมต้า (meta transaction) ข้ามบล็อคเชน ซึ่งหมายความว่า NXTP Routers จะสามารถเรียกใช้ contract บนบล็อคเชนที่รอรับด้วยข้อมูลที่ส่งมาจากบล็อคเชนที่ส่งมา ทำให้สิ่งนี้สามารถส่งเสริมประสบการณ์ผู้ใช้งานด้วยการให้ผู้ใช้งานสื่อสารกับบล็อคเชนที่รอรับโดยไม่ต้องอาศัยเงินสำหรับค่าแก๊ส (gas) บนฝั่งที่รอรับ นอกจากนี้ สิ่งนี้สามารถทำให้มีการสื่อสารระหว่างบล็อคเชนชนิด "money legos" เกิดขั้นได้

:::note

มันเป็นไปไม่ได้ที่จะยืนยันผลลัพท์บนบล้อคเชนที่ส่งข้อมูลออกไป เนื่องจากการไม่เชื่อมต่อกัน (asynchronous) โดยธรรมชาติระหว่างธุรกรรมในแต่ละบล็อคเชน

:::

กระบวนการจะเป็นไปตามนี้:
- ผู้ส่งจะเตรียมธุรกรรมจากบล้อคเชนที่ส่งไปพร้อมกับ calldata และ callTo address ตั้งค่าบนบล็อคเชน
- router จะเตรียมธุรกรรมเดียวกันบนฝั่งที่รอรับ
- ผู้ส่งจะเซ็น (sign) ข้อมูลเมื่อได้รับการยืนยันจากฝั่งผู้รอรับ และเงินจะถูกล็อคไว้
- ผู้ส่งต่อ (relayer) จะเติมเต็ม (fulfills) ธุรกรรมบนฝั่งที่รอรับ และส่งเงินไปสู่ interpreter address จากนั้นจะเรียกใช้ contract ที่ระบุไว้ใน `callTo` ด้วยการใช้ calldata

## FulfillHelper Contract

ระบบ NXTP นั้นใช้งาน [FulfillHelper](https://github.com/connext/nxtp/blob/22f84b1bf3437231b064143026022df545a25855/packages/contracts/contracts/interpreters/FulfillInterpreter.sol) contract เพื่อทำให้ธุรกรรมเมต้า (meta transaction) สามารถใช้งานได้ อย่างไรก็ตาม ขั้นตอนต่อไปนี้นั้นจำเป็นที่จะต้องทำให้สำเร็จเพื่อเรียก contract จากบล็อคเชนที่รอรับ:

- สร้าง calldata ที่ใช้ในการเรียน contract บนบล็อคเชนที่รอรับ
- ส่งต่อตัวแปร `callData` (สร้างจากข้อด้านบน) และ `callTo` (address ของ contract ที่จะเรียกบนอีกบล็อคเชน) ไปยัง method `getTransferQuote` และ `prepareTransfer` บน [NXTP SDK](../APIReference/sdkAPI)

router และ relayer จะ `เตรียมการ` (`prepare`) และ `เติมเต็ม` (`fullfil`) ธุรกรรมบนฝั่งบล็อคเชนที่รอรับด้วย `callData` และ `callTo`

:::ระวัง

หากธุรกรรมถูกย้อนกลับ เงินจะถูกส่งกลับไปหา `receivingAddress` ที่เตรียมไว้

:::

## โค้ดตัวอย่าง

การทำ [integration tests](https://github.com/connext/nxtp/blob/main/packages/contracts/test/interpreters/fulfillInterpreter.spec.ts#L119) ใน contract ของ repo นั้นแสดงให้เห็นการทำธุรกรรมเมต้า (meta transaction) ข้ามบล็อคเชน

นี่คือตัวอย่างโค้ดที่ทำมาอย่างง่าย:

```typescript
const callData = counter.interface.encodeFunctionData("incrementAndSend", [
  assetId,
  other.address,
  amount,
]); // encode data using ABI

const bid = await sdk.getTransferQuote({
  callData,
  sendingChainId,
  sendingAssetId,
  receivingChainId,
  receivingAssetId,
  callTo: counter.address,
  receivingAddress: user.address,
  amount: "1000000",
}); // get quote for transfer

// wait for receiver prepared event
const prepared = await sdk.waitFor(
  NxtpSdkEvents.ReceiverTransactionPrepared,
  100_000,
  (data) => data.txData.transactionId === transfer.transactionId // filter function
);

// sign the transfer
await sdk.fulfillTransfer(prepared);
// on completion, the contract will be called
```
