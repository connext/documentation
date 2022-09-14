---
sidebar_position: 1
id: sdk-example
---

# Cross-Chain Transfer

The main entrypoint for interacting with the Connext protocol is `xcall`. This method kicks off a crosschain interaction and all the user has to do is wait for it to complete on the destination chain. There are *no required user interactions past this transaction*!

The Connext SDK allows developers to interact with the Connext protocol in standard Node.js or web environments.
--- 

## Introduction

In this example, we'll demonstrate how to execute an `xcall` to transfer funds from a wallet on Goerli to a destination address on Optimism-Goerli.

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

Install the Connext SDK and ethers.

```bash npm2yarn
npm install @connext/nxtp-sdk
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
    "1735356532": {
      providers: ["<OPTIMISM_GOERLI_RPC_URL>"],
      assets: [
        {
          name: "TEST",
          symbol: "TEST",
          address: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
        },
      ],
    },
  },
};

// Create the SDK instance.
const {nxtpSdkBase} = await create(nxtpConfig);

// Fetch the signer address and set the amount to send.
const signerAddress = await signer.getAddress();
const amount = 1000000000000000000; // (1 TEST)

// Construct the arguments that will be passed into `xcall`.
const callParams = {
  to: signerAddress, // the address that should receive the funds
  callData: "0x", // empty calldata for a simple transfer
  originDomain: "1735353714", // send from Goerli
  destinationDomain: "1735356532", // to Optimism-Goerli
  agent: signerAddress, // address allowed to execute transaction on destination side in addition to relayers
  recovery: signerAddress, // fallback address to send funds to if execution fails on destination side
  forceSlow: false, // option to force slow path instead of paying 0.05% fee on fast liquidity transfers
  receiveLocal: false, // option to receive the local bridge-flavored asset instead of the adopted asset
  callback: ethers.constants.AddressZero, // zero address because we don't expect a callback
  callbackFee: "0", // fee paid to relayers; relayers don't take any fees on testnet
  relayerFee: "0", // fee paid to relayers; relayers don't take any fees on testnet
  destinationMinOut: (amount * 0.97).toString(), // the minimum amount that the user will accept due to slippage from the StableSwap pool (3% here)
};

const xCallArgs = {
  params: callParams,
  transactingAsset: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1", // the Goerli Test Token
  transactingAmount: amount.toString(), 
  originMinOut: (amount * 0.97).toString() // the minimum amount that the user will accept due to slippage from the StableSwap pool (3% here)
};

// Approve the asset transfer. This is necessary because funds will first be sent to the Connext contract before being bridged.
const approveTxReq = await nxtpSdkBase.approveIfNeeded(
  xCallArgs.params.originDomain,
  xCallArgs.transactingAsset,
  xCallArgs.transactingAmount
)
const approveTxReceipt = await signer.sendTransaction(approveTxReq);
await approveTxReceipt.wait();

// Send the xcall
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
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

We can use the transaction `hash` from the transaction receipt we logged above to track the status of this `xcall` by following these instruction.

[Tracking an xcall](../xcall-status)

After the transfer shows up on the Optimism-Goerli side, the transferred tokens should show up in the destination wallet.
