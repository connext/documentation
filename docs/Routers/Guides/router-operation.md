---
sidebar_position: 4
---

# การทำงานของ Router และขั้นตอน

ขั้นตอนโดยทั่วไปและการทำงานของ routers นั้นจะถูกอธิบายไว้ในเอกสารนี้

## การปิด router

Routers _ไม่สามารถ_ ปิดเวลาไหนก็ได้ตามที่ต้องการ การปิดนั้นจะต้องทำผ่านขั้นตอนที่ถูกต้อง เหมือนกับระบบ ETH2 และระบบอื่นๆที่ต้องใช้ validator โดยระบบเหล่านี้จะไม่ทนทานต่อการปิดที่ไม่ได้ตั้งใจ และจะทำให้มีการสูญเสียเงินเกิดขั้นได้ เพราะฉะนั้น การปิด router ควรทำตามขั้นตอนดังต่อไปนี้:

- เปลี่ยน [configuration](../Reference/configuration) ของ router ด้วยการตั้ง `cleanupMode` ให้เป็น `true`
- Restart router ด้วย `docker-compose restart` หรือ `docker-compose down` จากนั้น `docker-compose up -d`
- สังเกต logs ต่างๆด้วยคำสั่ง `docker logs --tail 100 --follow router` จนกว่าคุณจะเห็น log ขึ้นว่ามีธุรกรรมที่ใช้งานอยู่เป็น 0: `"transactions":0,"msg":"Got active transactions"}`
- เมื่อทำขั้นตอนก่อนหน้านี้สำเร็จแล้ว จะปลอดภัยที่จะปิด router ด้วย `docker-compose down` หรือ `docker-compose stop`

## การอัพเดท router

- อัพเดทไฟล์ `.env` ภายใน root directory ของ [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose) ด้วยเวอร์ชั่นที่ต้องการ แต่ถ้าหากคุณรู้ว่าคุณกำลังทำอะไรอยู่จริงๆ ให้เลือก releases จาก [หน้า releases](https://github.com/connext/nxtp/releases) โดนชื่อเวอร์ชั่นจะเริ่มต้นด้วย `v`
- อัพเดท key ใน `.env` ที่ชื่อ `ROUTER_VERSION` ให้ตรงกับเวอร์ชั่นที่เราต้องการ
- รันคำสั่ง `docker-compose up -d` เพื่ออัพเดทเวอร์ชั่นของ router โดยไม่ต้องปิด router