---
sidebar_position: 1
---

# Connext ทำงานอย่างไร?

ปัจจุบันนี้ Connext Network ใช้ [nxtp](https://github.com/connext/nxtp) ซึ่งเป็นโปรโตคอลขนาดเบาสำหรับการทำธุรกรรมข้ามบล็อคเชนต่างๆ

Nxtp นั้นถูกสร้างจาก contract อย่างง่ายที่ใช้ 
- รูปแบบการล็อคเพื่อเตรียมตัว (prepare) และเติมเต็ม (fulfill) ธุรกรรมนั้นๆ 
- เครือข่ายของ offchain router ที่เข้าร่วมในการประมูล การสื่อสารข้อมูลระหว่างบล็อคเชน
- sdk จากผู้ใช้งานที่หาเส้นทางและเรียกใช้ธุรกรรมบนบล็อคเชน

## วงจรชีวิตของธุรกรรม (Transaction Lifecycle)

![HighLevelFlow](/img/background/HighLevelFlow.png)

ธุรกรรมนั้นจะผ่านสามขั้นตอนหลักๆ:

1. **การหาเส้นทางประมูล (Route Auction):** ผู้ใช้งานจะประกาศเส้นทางที่ต้องการไปสู้เครือข่าย (network) จากนั้น routers จะตอบรับด้วยการเปิดประมูลข้อตกลง (commitments) เพื่อทำธุรกรรมให้เสร็จสมบูรณ์ในช่วงเวลาและราคาหนึ่ง
2. **การเตรียมตัว (Prepare):** เมื่อการประมูลจบลง ธุรกรรมจะถูกเตรียมการต่อ ผู้ใช้งานจะส่งธุรกรรมไปยัง `TransactionManager` contract ที่อยู่บนฝั่ง บล็อคเชนของผู้ส่ง (sender chain) ที่มีผลการประมูลที่เซ็น (sign) เรียบร้อยแล้ว ธุรกรรมดังกล่าวจะล็อคเงินของผู้ส่งบนบล็อคเชนของผู้ส่ง (sender chain) ทันทีที่มีการตรวจจับเหตุการณ์การเซ็น (sign) แล้ว การประมูล router จะส่งธุรกรรมตัวเดียวกันไปสู่ `TransactionManager` บนฝั่งบล็อคเชนที่รอรับ (receiver chain) และทำการล็อคสภาพคล่องในปริมาณที่เท่ากัน โดยปริมาณที่ล็อคไว้บนเชนฝั่งที่รอรับ (receiver chain) คือ `ปริมาณเงินที่ส่ง - ค่าธรรมเนียมประมูล` เพราะฉะนั้น router จะได้รับแรงจูงใจในการทำธุรกรรมให้สำเร็จ
3. **เติมเต็ม (Fullfil):** ทันทีที่มีการตรวจจับเหตุการณ์​ `TransactionPrepared` บนฝั่งบล็อคเชนที่รอรับ (receiver chain) ผู้ใช้งานจะเซ็น (sign) ข้อความและส่งไปหาผู้ส่งต่อ (relayer) ซึ่งเป็นผู้ที่จะได้ค่าธรรมเนียม จากนั้น ผู้ส่งต่อ (relayer) ซึ่งก็คือ router อีกอัน จะส่งข้อความไปหา `TransactionManager` เพื่อจะสำเร็จธุรกรรมของผู้ใช้บนบล็อคเชนผั่งรอรับ (receiver chain) และรับเงินที่ล็อคไว้โดย router โดยหน้าที่ของผู้ส่งต่อ (relayer) คือเพื่อให้ผู้ใช้งานสามารถส่งธุรกรรมด้วย calldata บนบล็อคเชนฝั่งรอรับ (receiver chain) โดยไม่เสียค่า gas จากนั้น router จะส่งข้อมูลที่เซ็น (sign) เรียบร้อยเพื่อสำเร็จธุรกรรมในฝั่งผู้ส่ง ปลดล็อคจำนวน `amount`

หากธุรกรรมนั้นไม่ถูกเติมเต็ม (fullfilled) ภายในระยะเวลา `expiry` ธุรกรรมนั้นจะถูกย้อนกลับและสามารถรับคืนได้โดยบุคคลที่เรียกคำสั่ง prepare ในแต่ละบล็อคเชน (เรียกว่า ผู้ริเริ่ม หรือ initiator) นอกจากนี้ ธุรกรรมยังสามารถยกเลิก โดยเจ้าของเงินบนบล็อคเชนนั้นๆ (ซึ่งคือ router สำหรับบล็อคเชนขอบผู้ส่ง (sender chain) และผู้ใช้งานสำหรับบล็อคเชนฝั่งรอรับ (receiver chain)) ก่อนจะถึงวันหมดอายุ `expiry`

เป็นเรื่องที่สำคัญว่าผู้เข้าร่วมไม่จำเป็นที่จะต้องเก็บธุรกรรมที่เสร็จสมบูรณ์ ทุกข้อมูลไม่ว่าจะเป็นธุรกรรม `prepare`, `fullfil` หรือ `cancel` ควรจะสามารถเรียกคืนได้ผ่าน contract event

## สถาปัตยกรรม

![Architecture](/img/background/Architecture.png)

ระบบนั้นประกอบไปด้วยชิ้นส่วนตั่างๆดังนี้:

- Contracts - เพื่อเก็บเงินสำหรับผู้เข้าร่วมในเครือข่าย สามารถล็อค/ปลดล็อคได้จากข้อมูลที่ส่งมาจากผู้ใช้งาน (user) หรือ เราเตอร์ (router)
- Subgraph - ทำให้มีความสามารถในการขยายการดึงข้อมูล/การตอบรับด้วยการ cache ข้อมูลบนบล็อคเชนและ event ต่างๆ
- TxService - พยายามส่งข้อมูลไปสู่บล็อคเชนต่างๆ (พร้อมส่งใหม่ ฯลฯ)
- Messaging - เตรียมตัว, ส่ง, และฟังข้อความจาก nats
- Router - ฟังเหตุการณ์จาก messaging และ subgraph จากนั้นกระจายธุรกรรมไปสู่ txService
- SDK - สร้างการประมูล, ฟังเหตุการณ์และสร้างธุรกรรมจากผู้ใช้งาน (user)