---
sidebar_position: 6
id: sdk-guides
---

# SDK

The Connext SDK allows developers to interact with the Connext protocol in standard Node.js or web environments.
--- 

## Cross-Chain Transfer

This example demonstrates how to execute an `xcall` to transfer funds from a wallet on Goerli to a destination address on Polygon-Mumbai.

### 1. Setup

Install [Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/) and use **Node.js v16**. Follow the instructions to install `nvm`, a node version manager, which will make switching versions easier.

Create a project folder and initialize the package. Fill out the project information as you please.

```bash npm2yarn
mkdir node-examples && cd node-examples
npm init
```

We'll be using TypeScript so install the following and generate the `tsconfig.json` file.

```bash npm2yarn
npm install --save-dev @types/node @types/chai @types/mocha typescript 
npx tsc --init # yarn tsc --init
```

We want to use top-level await so we'll set the compiler options accordingly.

```json title="tsconfig.json"
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es2017",
    "module": "esnext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules"]
}
```

Add `type` and `scripts` as root-level entries to `package.json` - they may already exist, so just replace them with the following.

```json title="package.json"
  "type": "module",
  "scripts": {
    "build": "tsc && node dist/xtransfer.js",
    "xtransfer": "node dist/xtransfer.js"
  }
```

Create `xtransfer.ts` in the `src` directory, where we will write all the code in this example.

```bash
mkdir src && touch src/xtransfer.ts
```

### 2. Install dependencies

Install the latest beta version of Connext SDK and ethers.

```bash npm2yarn
npm install @connext/nxtp-sdk@beta
npm install ethers
```

### 3. The code

This is the full code for the example. Read through the comments and replace any placeholders between `<...>`.

```ts title="src/xtransfer.ts"
import { create, NxtpSdkConfig } from "@connext/nxtp-sdk";
import { ethers } from "ethers";

// Instantiate a Wallet object using your private key (i.e. from Metamask) and use it as a Signer.
const privateKey = "<PRIVATE_KEY>";
let signer = new ethers.Wallet(privateKey);

// Connext to a Provider on the sending chain. You can use a provider like Infura (https://infura.io/) or Alchemy (https://www.alchemy.com/).
const provider = new ethers.providers.JsonRpcProvider("<GOERLI_RPC_URL>");
signer = signer.connect(provider);
const signerAddress = await signer.getAddress();

// Construct the `NxtpSdkConfig`. Values like Domain IDs and token addresses are already filled in for you. You can reference these in the "Resources" tab of the docs. 
const nxtpConfig: NxtpSdkConfig = {
  logLevel: "info",
  signerAddress: signerAddress,
  chains: {
    "1735353714": {
      providers: ["<GOERLI_RPC_URL>"],
      assets: [
        {
          name: "TEST",
          symbol: "TEST",
          address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
        },
      ],
    },
    "9991": {
      providers: ["<MUMBAI_RPC_URL>"],
      assets: [
        {
          name: "TEST",
          symbol: "TEST",
          address: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
        },
      ],
    },
  },
};

// Create the SDK instance.
cconst {nxtpSdkBase} = await create(nxtpConfig);

// Address of the TEST token
const asset = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1" 

// Send 1 TEST
const amount = "1000000000000000000"; 

// Prepare the xcall params
const xcallParams = {
  origin: "1735353714",    // send from Goerli
  destination: "9991",     // to Mumbai
  to: signerAddress,       // the address that should receive the funds on destination
  asset: asset,            // address of the token contract
  delegate: signerAddress, // address allowed to execute transaction on destination side in addition to relayers
  amount: amount,          // amount of tokens to transfer
  slippage: "30",          // the maximum amount of slippage the user will accept in BPS, 0.3% in this case
  callData: "0x",          // empty calldata for a simple transfer
  relayerFee: "0",         // fee paid to relayers; relayers don't take any fees on testnet
};

// Approve the asset transfer. This is necessary because funds will first be sent to the Connext contract before being bridged.
const approveTxReq = await nxtpSdkBase.approveIfNeeded(
  xcallParams.origin,
  xcallParams.asset,
  xcallParams.amount
)
const approveTxReceipt = await signer.sendTransaction(approveTxReq);
await approveTxReceipt.wait();

// Send the xcall
const xcallTxReq = await nxtpSdkBase.xcall(xcallParams);
xcallTxReq.gasLimit = ethers.BigNumber.from("20000000"); 
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt);
const xcallResult = await xcallTxReceipt.wait();
```

### 4. Run it

Now we can run it to fire off the cross-chain transfer!

```bash npm2yarn
npm run build
npm run xtransfer
```

### 5. Track the `xcall`

We can now use the transaction `hash` from the logged transaction receipt to track the status of this `xcall`.

[Tracking an xcall](../xcall-status)

After the transfer is `status: Executed` on the Mumbai side, the transferred tokens should show up in the destination wallet.
