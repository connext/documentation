---
sidebar_position: 6
id: sdk-guides
---

# SDK

The Connext SDK allows developers to interact with the Connext protocol in standard Node.js or web environments.
--- 

## Cross-Chain Transfer

This example demonstrates how to execute an `xcall` to transfer funds from a wallet on the source domain to the same address on the destination domain.

### 1. Setup

Install [Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/) and use **Node.js v18**. Follow the instructions to install `nvm`, a node version manager, which will make switching versions easier.

Create a project folder and initialize the package. Fill out the project information as you please.

```bash npm2yarn
mkdir connext-sdk-example && cd connext-sdk-example
npm init
```

We'll be using TypeScript so install the following and generate the `tsconfig.json` file.

```bash npm2yarn
npm install --save-dev @types/node @types/chai @types/mocha typescript 
npx tsc --init # or `yarn tsc --init`
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
{
  ...
  "type": "module",
  "scripts": {
    "xtransfer": "tsc && node dist/xtransfer.js"
  }
  ...
}
```

### 2. Install dependencies

Install the latest beta version of Connext SDK and ethers.

```bash npm2yarn
npm install @connext/sdk
npm install ethers@^5
```

### 3. The code

First, we'll configure the SDK. Create a `config.ts` file with the following contents.

```ts title="config.ts" showLineNumbers
import { SdkConfig } from "@connext/sdk";
import { ethers } from "ethers";

// Create a Signer and connect it to a Provider on the sending chain
const privateKey = "<PRIVATE_KEY>";

let signer = new ethers.Wallet(privateKey);

// Use the RPC url for the origin chain
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
signer = signer.connect(provider);
const signerAddress = await signer.getAddress();

const sdkConfig: SdkConfig = {
  signerAddress: signerAddress,
  // Use `mainnet` when you're ready...
  network: "testnet",
  // Add more chains here! Use mainnet domains if `network: mainnet`.
  // This information can be found at https://docs.connext.network/resources/supported-chains
  chains: {
    1735353714: { // Goerli domain ID
      providers: ["https://rpc.ankr.com/eth_goerli"],
    },
    1735356532: { // Optimism-Goerli domain ID
      providers: ["https://goerli.optimism.io"],
    },
  },
};

export { signer, sdkConfig };
```

Replace `<PRIVATE_KEY>` with your own private key on line 5.

Notice that the config supports Goerli and Optimism-Goerli. We've also hard-coded the origin chain provider on line 84.

Now create a `xtransfer.ts` file with the following:

```ts title="xtransfer.ts" showLineNumbers
import { create } from "@connext/sdk";
import { BigNumber } from "ethers";
import { signer, sdkConfig } from "./config.js";

const {sdkBase} = await create(sdkConfig);

const signerAddress = await signer.getAddress();

// xcall parameters
const originDomain = "1735353714";
const destinationDomain = "1735356532";
const originAsset = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1";
const amount = "1000000000000000000";
const slippage = "10000";

// Estimate the relayer fee
const relayerFee = (
  await sdkBase.estimateRelayerFee({
    originDomain, 
    destinationDomain
  })
).toString();

// Prepare the xcall params
const xcallParams = {
  origin: originDomain,           // send from Goerli
  destination: destinationDomain, // to Mumbai
  to: signerAddress,              // the address that should receive the funds on destination
  asset: originAsset,             // address of the token contract
  delegate: signerAddress,        // address allowed to execute transaction on destination side in addition to relayers
  amount: amount,                 // amount of tokens to transfer
  slippage: slippage,             // the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
  callData: "0x",                 // empty calldata for a simple transfer (byte-encoded)
  relayerFee: relayerFee,         // fee paid to relayers 
};

// Approve the asset transfer if the current allowance is lower than the amount.
// Necessary because funds will first be sent to the Connext contract in xcall.
const approveTxReq = await sdkBase.approveIfNeeded(
  originDomain,
  originAsset,
  amount
)

if (approveTxReq) {
  const approveTxReceipt = await signer.sendTransaction(approveTxReq);
  await approveTxReceipt.wait();
}

// Send the xcall
const xcallTxReq = await sdkBase.xcall(xcallParams);
xcallTxReq.gasLimit = BigNumber.from("20000000"); 
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt);
await xcallTxReceipt.wait();
```

Most of the parameters are hardcoded in this example. For a detailed description of each parameter, see the [SDK reference for xcall](../reference/SDK/sdk-base#xcall).

Information like asset addresses be found in the [Deployments](../../../resources/deployments) page.

### 4. Run it

Fire off the cross-chain transfer!

```bash npm2yarn
npm run xtransfer
```

### 5. Track the `xcall`

We can now use the transaction `hash` from the logged transaction receipt to track the status of this `xcall`.

[Tracking an xcall](./xcall-status)

After the transfer is `status: Executed` on the destination side, the transferred tokens should show up in the recipient wallet.
