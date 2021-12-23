---
sidebar_position: 2
---

# เริ่มต้นที่จะเป็น Router

## ฮาร์ดแวร์ที่ต้องใช้ขึ้นต่ำ

- 4GB RAM
- 30GB Storage

## ซอร์ฟแวร์ที่ต้องมี

- [ Docker CE (Community Edition) ](https://docs.docker.com/install/) เวอร์ชั่น 20.10.5 หรือสูงกว่า
- [ Docker Compose ](https://docs.docker.com/compose/install/) เวอร์ชั่น 1.27.4 หรือสูงกว่า

## การตั้งค่าเน็ตเวิร์ค

router นั้นจำเป็นต้องใช้ port ดังกล่าวเพื่อให้เป็นสาธารณะ:

- `4222`

:::danger
**อย่า** เปิด `ROUTER_EXTERNAL_PORT` ให้ใครก็ตาม! เลข port นี้ควรมีสิทธิในการเข้าถึงแค่จากผู้รัน router เอง หรือในกลุ่มที่เชื่อถือได้
:::

## การ Clone Repository

ในการเริ่มเป็น router, ขั้นตอนแรกคือ clone repository ของ [`nxtp-router-docker-compose`](https://github.com/connext/nxtp-router-docker-compose)

```shell
$ git clone https://github.com/connext/nxtp-router-docker-compose.git
```

## การตั้งค่าพื้นฐาน

### การตั้งค่า Environment

สร้างไฟล์ `.env` ใน root directory ของ repository ให้เหมือนกับในไฟล์ `env.example`

แก้ไขตัวแปร environment เหล่านี้:

* `ROUTER_VERSION` - เวอร์ชั่นของ router ที่จะใช้ (เช่น `v0.1.0`) สามารถดู[หน้า releases page](https://github.com/connext/nxtp/releases) สำหรับเวอร์ชั่นต่างๆ
* `ROUTER_EXTERNAL_PORT` - port ที่จะเปิดเผยของ router ระวังไม่ให้เลข port นี้เป็นสาธารณะ
* `GRAFANA_EXTERNAL_PORT` - port ที่จะเปิดเผยของ Grafana dashboard

### Web3Signer Config

ติดตั้งไฟล์ตั้งค่าของ [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) เพื่อที่จะตั้งค่า private key อย่างปลอดภัย

### การตั้งค่า Router

สร้างไฟล์ `config.json` อิงจากไฟล์ `config.example.json` และอย่างน้อย ควรเปลี่ยนค่าเหล่านี้:

- `adminToken` - โทเคนลับในการเรียกใช้คำสั่งที่ต้องให้ความระมัดระวัง
- `chainConfig` - เพิ่มบล็อคเชนที่ต้องการ และ URL ของ provider **โน้ตเพิ่มเติม:** อย่าลืมเพิ่ม providers ของ chain 1 (Ethereum mainnet)
- `web3SignerUrl` - ตั้งให้เป็น `"http://signer:9000"`.
- `routerContractAddress` - ตั้งให้เป็น address ของ router 
- `swapPools` - เปลี่ยนเป็นสินทรัพย์ที่ต้องการ

สามารถดูในส่วนของ [การตั้งค่า](../Reference/configuration) สำหรับข้อมูลเพิ่มเติม

## การ Deploy Router Contract

ในแต่ละเชนที่คุณต้องการทำงานด้วย คุณต้องทำการ deploy ตัว router contract ก่อน ซึ่ง contract นี้จะทำหน้าที่เป็นเหมือน "กระเป๋า" และอนุญาตให้ relayers ส่งธุรกรรมในฐานะ router ได้เพื่อที่จะรับค่าธรรมเนียม

คุณสามารถ deploy ตัว router contract ด้วยการไปที่ block explorer บนบล็อคเชนของคุณที่คุณต้องการจะ deploy router บนนั้น จากนั้นใช้งานฟังก์ชั่น Write Contract บนตัว explorer ภายใน `RouterFactory` contract เพื่อเรียกใช้คำสั่ง `createRouter` บน contract `RouterFactory` ด้วยตัวแปรเหล่านี้:
- `routerSigner`: EOA address ที่สอดคล้องกับ signer ที่ตั้งไว้ของ router และจะเหมือนกันกับทุกเชน
- `recipient`: Address ที่ router จะได้รับเงินคืนเมื่อเรียกใช้ `removeLiquidity()`.
- `msg.sender`: นี่คือเจ้าของของ Router Contract สิ่งนี้สามารถเป็น EOA ใดก็ได้ที่ต้องการเก็บเป็นความลับ คุณจะต้องใช้มันในกรณีที่คุณต้องการเปลี่ยนผู้รับหรือ `removeRelayerFee` บน contract Router.sol สำหรับความปลอดภัยเพิ่มเติม คุณสามารถใช้งานฟังก์ชั่น `setOwner()` บน contract และตั้งค่า address นี้เป็น burn address เพื่อป้องกันใครก็ตามมาเปลี่ยนแปลงผู้รับ

ปัจจุบัน router factory address บนทุกเชนนั้นคือ `0x73a37b3EB030cC3f9739CA5C16b7E6802F294122` และ contract นั้นได้รับการยอมรับบนทุกเชนแล้ว หากคุณมีปัญหาหรือคำถามเกี่ยวกับสิ่งนี้ สามารถติดต่อมาที่ทีมงาน Connext ได้เลย! กระบวนการนี้ต้องสำเร็จบนทุกเชน!

โปรดเช็คว่าทีมงาน Connext นั้นรู้ contract address ของ router คุณ รวมทั้ง EOA signer address ด้วย ในกรณีที่ต้องมีการ whitelist เกิดขึ้น!

## การเริ่มต้นรัน Router

รัน router ด้วยคำสั่ง `docker-compose`

```shell
$ docker-compose up -d
```

ทดสอบว่าระบบทำงานปกติไหนด้วยการให้คำสั่ง `/config` endpoint จากนั้น เข้าระบบไปสู่ host หรือ router container และรันทำสั่ง curl ตามนี้

```shell
# สมมติว่า ROUTER_EXTERNAL_PORT คือ 8000 ภายใน container ก็จะเป็น 8000
$ curl localhost:8000/config
{"signerAddress":"0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a"}
```

## การดู Logs

ใช้คำสั่ง docker เพื่อดู logs ของ container ต่างๆที่ยังรันอยู่

```shell
$ docker logs router
# or
$ docker logs --follow --tail 100 router
```

## Grafana Dashboard

router สามารถใช้งาน Grafana Dashboard ซึ่งจะสามารถให้ใช้ได้ด้วยการตั้งค่า `GRAFANA_EXTERNAL_PORT`