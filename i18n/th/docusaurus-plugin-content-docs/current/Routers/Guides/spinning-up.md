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

### การตั้งค่า Router

สร้างไฟล์ `config.json` อิงจากไฟล์ `config.example.json` และอย่างน้อย ควรเปลี่ยนค่าเหล่านี้:

- `adminToken` - โทเคนลับในการเรียกใช้คำสั่งที่ต้องให้ความระมัดระวัง
- `chainConfig` - เพิ่มบล็อคเชนที่ต้องการ และ URL ของ provider
- `mnemonic` - ใช้รหัส mneumonic ที่ใหม่
- `swapPools` - เปลี่ยนเป็นสินทรัพย์ที่ต้องการ

สามารถดูในส่วนของ [การตั้งค่า](../Reference/configuration) สำหรับข้อมูลเพิ่มเติม

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