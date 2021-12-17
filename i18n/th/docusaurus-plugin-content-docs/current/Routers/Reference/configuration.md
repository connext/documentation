---
sidebar_position: 1
---

# การตั้งค่า

router จะรับการตั้งค่าด้วยการใช้ไฟล์ `config.json` ที่อยู่ใน root directory ของ [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose)

JSON schema นั้นรับ keys ดังนี้

- `adminToken`: _จำเป็น_ โทเคนลับใช้ในการยืนยันคำร้องขอจากแอดมิน
- `mnemonic`: _จำเป็น_ รหัส mnemonic ใช้ในการสร้าง private key
- `chainConfig`: _จำเป็น_ การตั้งค่าบล็อคเชน เป็น JSON Object โดยมี key เป็น `chainId` และมี object schema ดังกล่าวเป็น value:
  - `providers`: _จำเป็น_ เป็น array ของ providers URLs สำหรับบล็อคเชนนั้นๆ ใช้ขั้นต่ำ 1 URL แต่ URLs ที่เหลือจะเป็นตัวรองรับในกรณีที่ provider มีปัญหา
  - `subgraph`: _ไม่จำเป็น_ เป็น array ของ subgraph URLs สำหรับบล็อคเชนนั้นๆ URLs อื่นๆจะเป็นตัวรองรับในกรณีที่ subgraph หลักมีปัญหา และหากไม่ระบุมาจะเป็นค่าเริ่มต้นที่ subgraph ที่ Connext เป็นเจ้าของ
  - `transactionManagerAddress`: _ไม่จำเป็น_ address ของ transaction manager contract หากไม่ระบุมาจะเป็นค่าเริ่มต้นที่ contract ที่ทำการ deploy ล่าสุด
  - `priceOracleAddress`: _ไม่จำเป็น_ address ของ price oracle contract หากไม่ระบุมาจะเป็นค่าเริ่มต้นที่ contract ที่ทำการ deploy ล่าสุด
  - `confirmations`: _ไม่จำเป็น_ จำนวนของการยืนยัน (confirmation) ที่ต้องการเพื่อที่จะถือว่าธุรกรรมนั้นใช้งานได้บนบล็อคเชนนั้นๆ ค่าเริ่มต้นจะถูกระบุไว้[ที่นี่](https://github.com/connext/chaindata/blob/29cc0250aff398cdf9326dcb7698d291f3e3015a/crossChain.json)
  - `minGas`: _ไม่จำเป็น_ ค่าแก๊สขั้นต่ำที่ต้องการที่จะให้ router เตรียมไว้สำหรับการเซ็นธุรกรรมที่ใช้ในการประมูล โดยจะมีหน่วยเป็น Wei และมีค่าเริ่มต้นที่ `100000000000000000` (0.1 Ether)
  - `defaultInitialGas`: _ไม่จำเป็น_ ค่าแก๊สเริ่มต้นที่จะใช้ในการส่งธุรกรรม หากไม่ระบุ จะเป็นการประเมินจาก gas station API หรือโดยตัว node เอง
  - `allowFulfillRelay`: _ไม่จำเป็น_ เป็นตัวแปรชนิด Boolean ที่ควบคุมว่า router จะเข้าร่วมในการส่งต่อ (relay) ธุรกรรมหรือไม่ ค่าเริ่มต้นที่เป็น `true`
  - `relayerFeeThreshold`: _ไม่จำเป็น_ ค่าขีดจำกัด (threshold) เป็นเปอร์เซ็นต์ที่ค่าธรรมเนียมผู้ส่งต่อ (relayer fee) สามารถต่ำกว่าปริมาณที่ router ประเมินไว้ได้ ค่าเริ่มต้นที่ `10`
  - `subgraphSyncBuffer`: _ไม่จำเป็น_ ตัวเลขของบล็อคที่อนุญาตให้ block number ล่าสุดของ subgraph ช้ากว่า block number ล่าสุดจาก provider
- `swapPools`: _จำเป็น_ เป็น array ของ swap pools แต่ละ pool จะมี JSON object ด้วย keys ดังนี้:
  - `name`: _ไม่จำเป็น_ ชื่อของ swap pool
  - `assets`: _จำเป็น_ เป็น array ของสินทรัพย์​ (assets) แต่ละสินทรัพย์จะมี JSON object ด้วย keys ดังนี้:
    - `assetId`: _จำเป็น_ ID ของสินทรัพย์ (address ของ ERC20 token) สำหรับโทเคนประจำบล็อคเชน (เช่น ETH บน Ethereum) ใช้ `0x0000000000000000000000000000000000000000`
    - `chainId`: _จำเป็น_ ID ของบล็อคเชน (chain ID)
- `logLevel`: _ไม่จำเป็น_ ระดับการ log ต้องเป็นหนึ่งในค่าเหล่านี้ `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent` โดยที่ค่าเริ่มต้นคือ `info`.
- `port`: _ไม่จำเป็น_ port ที่ router จะรอรับฟัง ค่าเริ่มต้นอยู่ที่ `8080`
- `host`: _ไม่จำเป็น_ IP Address ของ host router จะรอรับฟัง ค่าเริ่มต้นที่ `0.0.0.0`
- `network`: _ไม่จำเป็น_ ข้อความระบุว่าจะต่อกลับเครือข่าย (network) ไหน ต้องเป็นหนึ่งใน `testnet`, `mainnet`, `local` ค่าเริ่มต้นที่ `mainnet`
- `requestLimit`: _ไม่จำเป็น_ ระยะเวลาสั้นสุดในหน่วยมิลลิวินาทีที่ผู้ใช้งานสามารถเรียกใช้การประมูลสำหรับการแลกเปลี่ยน (swap) ไปหา router เพื่อป้องกันการ spam ค่าเริ่มต้นที่ 500 (ms)
- `cleanUpMode`: _ไม่จำเป็น_ เป็นตัวแปรชนิด Boolean ที่ใช้เลือกโหมดที่ต้องใช้ในการไม่รับการประมูลเพิ่มเติม และยังทำธุรกรรมที่รับไว้อยู่ต่อไป ค่าเริ่มต้นที่ `false`
- `diagnosticMode`: _ไม่จำเป็น_ เป็นตัวแปรชนิด Boolean ที่ใช้เลือกโหมดที่ต้องใช้ในการไม่รับการประมูลใหม่ และไม่รัน subgraph loops หรือ handler เพื่อการ debug โดยละเอียด ค่าเริ่มต้นที่ `false`

## ตัวอย่างไฟล์ตั่งค่า

```json
{
  "adminToken": "supersecret",
  "chainConfig": {
    "56": {
      "subgraphSyncBuffer": 250,
      "providers": [
        "https://bsc-dataseed.binance.org/",
        "https://bsc-dataseed1.defibit.io/",
        "https://bsc-dataseed1.ninicoin.io/"
      ]
    },
    "100": {
      "providers": [
        "https://foo.xdai.quiknode.pro/JFKJDKFJDKJ",
        "https://rpc.xdaichain.com/",
        "https://xdai.poanetwork.dev/",
        "https://dai.poa.network/"
      ]
    },
    "137": {
      "providers": ["https://polygon-rpc.com/"],
      "minGas": "100000000000000"
    },
    "250": {
      "providers": [
        "https://rpcapi.fantom.network",
        "https://rpc.ftm.tools",
        "https://foo.fantom.quiknode.pro/JFKJDKFJDKJ/"
      ],
      "minGas": "100000000000000"
    },
    "42161": {
      "providers": [
        "https://arb-mainnet.g.alchemy.com/v2/FJDKJFDKJD"
      ],
      "minGas": "100000000000000"
    },
    "43114": {
      "providers": ["https://api.avax.network/ext/bc/C/rpc"],
      "minGas": "100000000000000"
    },
    "1": {
      "providers": [
        "https://eth-mainnet.alchemyapi.io/v2/JFKJDKFJDKJ",
        "https://mainnet.infura.io/v3/JFKJDKFJDKJ",
        "https://cloudflare-eth.com"
      ]
    }
  },
  "cleanUpMode": false,
  "logLevel": "info",
  "network": "mainnet",
  "mnemonic": "test test test test test test test test test test test test",
  "swapPools": [
    {
      "name": "DAI",
      "assets": [
        {
          "chainId": 1,
          "assetId": "0x6B175474E89094C44Da98b954EedeAC495271d0F"
        },
        {
          "chainId": 56,
          "assetId": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
        },
        {
          "chainId": 100,
          "assetId": "0x0000000000000000000000000000000000000000"
        },
        {
          "chainId": 137,
          "assetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
        },
        {
          "chainId": 250,
          "assetId": "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e"
        },
        {
          "chainId": 42161,
          "assetId": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
        },
        {
          "chainId": 43114,
          "assetId": "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
        }
      ]
    },
    {
      "name": "USDC",
      "assets": [
        {
          "chainId": 1,
          "assetId": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          "chainId": 56,
          "assetId": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
        },
        {
          "chainId": 100,
          "assetId": "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83"
        },
        {
          "chainId": 137,
          "assetId": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        },
        {
          "chainId": 250,
          "assetId": "0x04068da6c83afcfa0e13ba15a6696662335d5b75"
        },
        {
          "chainId": 42161,
          "assetId": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
        },
        {
          "chainId": 43114,
          "assetId": "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
        }
      ]
    },
    {
      "name": "USDT",
      "assets": [
        {
          "chainId": 1,
          "assetId": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        },
        {
          "chainId": 56,
          "assetId": "0x55d398326f99059fF775485246999027B3197955"
        },
        {
          "chainId": 100,
          "assetId": "0x4ECaBa5870353805a9F068101A40E0f32ed605C6"
        },
        {
          "chainId": 137,
          "assetId": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
        },
        {
          "chainId": 250,
          "assetId": "0x049d68029688eabf473097a2fc38ef61633a3c7a"
        },
        {
          "chainId": 42161,
          "assetId": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
        },
        {
          "chainId": 43114,
          "assetId": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
        }
      ]
    }
  ]
}
```
