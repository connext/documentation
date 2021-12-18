---
sidebar_position: 1
---

# ทดลอง NXTP บน Testnets

เราได้ทำการปล่อย contract บน testnet หลายที่เพื่อให้มีการใช้งาน SDK ได้อย่างง่ายขึ้น

โดย testnet ที่รองรับสามารถดูได้ใน [deployments.json](https://github.com/connext/nxtp/blob/main/packages/contracts/deployments.json)

## เชื่อมต่อ Dapps กับ Testnet

เริ่มต้น NXTP SDK ด้วยการตั้งค่าสำหรับ testnet ที่ต้องการ

ตัวอย่าง:

```typescript
const chainConfig = {
  4: {
    providers: ["https://rinkeby.infura.io/..."]),
  },
  5: {
    provider: new providers.FallbackProvider(["https://goerli.infura.io/..."]),
  },
};

// เรียก signer จาก metamask
await ethereum.request({ method: "eth_requestAccounts" });
const provider = new providers.Web3Provider(ethereum);
const _signer = provider.getSigner();

// เริ่มต้น SDK
const sdk = await NxtpSdk.create(chainProviders, _signer);
```

## ทดสองการโอนด้วยการใช้ Test ERC20s

สำหรับการทดสอบที่ง่าย เราได้ทำการปล่อย test ERC20 contract บน testnet ต่างๆ ภายในไฟล์ [deployments.json](https://github.com/connext/nxtp/blob/main/packages/contracts/deployments.json) คุณสามารถหา address ของ test ERC20 contract ภายใต้ key `TestERC20` สำหรับแต่ละบล็อคเชน

โทเคน test ERC20 จะสามารถสร้าง (mint) โดยใครก็ได้ โดยลักษณะของฟังก์ชั่น `mint` คือ:

```
function mint(address account, uint256 amount)
```

โทเคนสำหรับการทดสอบ (test tokens) นั้นจะถูกสำรองโดย routers บน testnet เพราะฉะนั้นการแลกเปลี่ยน (swap) จะสำเร็จตลอดเมื่อคุณใช้โทเคนเหล่านี้