---
sidebar_position: 3
---

# เหตุการณ์ (Event)

`NxtpSdk` จะปล่อย events ที่จะมอบประสบการณ์ที่ดีให้กับผู้ใช้งานด้วยการแจ้งเตือนพวกเขาถึงสิ่งที่จะมีการโอนหรือเคลื่อนย้ายระหว่างธุรกรรมการโอน

## การรอฟัง Event (Listener)

SDK จะรองรับวิธีต่างๆเพื่อรอรับฟัง events โดยได้รับแรงบันดาลใจอย่างมากมาจาก interface ของ [Evt](https://www.evt.land) และเราสามารถเรียกใช้ methods ได้ตรงๆจากระบบ SDK ดังนี้:

- `.attach(eventName, callbackFn, filterFn)` - คอยฟัง event และเรียกใช้ handler บนทุกๆ event ที่จับได้ และยังสามารถเพิ่มฟังก์ชั่นสำหรับการคัดกรอง event
- `.attachOnce(eventName, callbackFn, filterFn)` - คอยฟัง event และเรียกใช้ handler บน event แรกที่จับได้ และยังสามารถเพิ่มฟังก์ชั่นสำหรับการคัดกรอง event จะมีการถอดถอน listener หลังจากเสร็จสิ้น
- `.waitFor(eventName, timeoutMs, filterFn)` - คอยฟัง event และ resolve promise ด้วยข้อมูล event แรกที่จับได้ และยังสามารถเพิ่มฟังก์ชั่นสำหรับการคัดกรอง event
- `.detach(eventName)` - ถอดถอน listeners จาก event ที่เรียกฟังอยู่ด้วยชื่อของ event นั้นๆ หากไม่มีการระบุ จะถอด listener ทั้งหมด

## Events

- `SenderTransactionPrepareTokenApproval`
- `SenderTokenApprovalMined`
- `SenderTransactionPrepareSubmitted`
- `SenderTransactionPrepared`
- `SenderTransactionFulfilled`
- `SenderTransactionCancelled`
- `ReceiverPrepareSigned`
- `ReceiverTransactionPrepared`
- `ReceiverTransactionFulfilled`
- `ReceiverTransactionCancelled`

ตัวข้อมูล event จะมีการ typing อย่างครบถ้วน และ callbacks จะมีการ typing ด้วย event ที่เราฟังอยู่

## ตัวอย่าง

```ts title="การรัน callback บนทุกๆการเรียกใช้สำหรับ transactionId ที่ระบุไว้"
sdk.attach(
  NxtpSdkEvents.SenderTransactionPrepared,
  (data) => {
    console.log("SenderTransactionPrepared:", data); // data จะมีการ typing อย่างครบถ้วน
  },
  (data) => data.txData.transactionId === transactionId
);
```

```ts title="การรัน callback บนการเรียกใช้เพียงครั้งเดียวสำหรับ transactionId ที่ระบุไว้"
sdk.attachOnce(NxtpSdkEvents.SenderTransactionPrepared, (data) => {
  console.log("SenderTransactionPrepared:", data); // data จะมีการ typing อย่างครบถ้วน
});
```

```ts title=การรอรับ event ที่ระบุไว้"
try {
  const data = await sdk.waitFor(
    NxtpSdkEvents.ReceiverTransactionPrepared,
    100_000,
    (data) => data.txData.transactionId === transactionId
  );
  console.log("ReceiverTransactionPrepared:", data); // data จะมีการ typing อย่างครบถ้วน
} catch (e) {
  // ไม่ได้รับ event ภายในระยะเวลาที่กำหนด
}
```
