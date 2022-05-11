---
sidebar_position: 1
id: sdk-quickstart
---

# SDK Quickstart

The Connext SDK allows developers to interact with the Connext protocol in standard Node.js or web environments. This quickstart will show you how to build on top of Connext using the TypeScript SDK. 

This example (and others) can be found in our xApp Starter Kit, under `src/sdk-interactions`.

[xApp Starter Kit](https://github.com/connext/xapp-starter/)

--- 

## Cross-Chain Transfer

In this quickstart, we'll demonstrate how to execute an `xcall` to transfer funds from your wallet on Kovan to a destination address on Rinkeby.

### 1. Setup project

If you have an existing project, you can skip to [Install dependencies](./sdk-quickstart.md#2-install-dependencies).

Create the project folder and initialize the package.

```bash
mkdir simple-xtransfer && cd simple-xtransfer
yarn init
```

We'll use TypeScript / Node.js in this example.

```bash
yarn add @types/node typescript 
yarn add -D @types/chai
yarn tsc --init
```

We want to use top-level await so we'll set the compiler options accordingly. Replace the contents of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es2017",
    "module": "esnext",
    "moduleResolution": "node"
  },
  "exclude": ["node_modules"]
}
```

And add these scripts to your `package.json`:

```json
"scripts": {
  "build": "tsc && mv dist/index.js dist/index.mjs",
  "xtransfer": "node dist/index.mjs"
}
```

Create an `index.ts` in your project directory, where we will write all the code in this example.

```bash
mkdir src && touch src/index.ts
```

### 2. Install dependencies

Install the SDK. When prompted, choose the latest `0.2.0-alpha.N` version.

```bash
yarn add @connext/nxtp-sdk@amarok
```

Also, install `ethers`.

```bash
yarn add ethers
```

### 3. Pull in imports

Let's start populating `index.ts`. We only need a few imports for this example.

```ts
import { create, NxtpSdkConfig } from "@connext/nxtp-sdk";
import { ethers } from "ethers";
```

### 4. Create a Signer

Use your MetaMask wallet as a [Signer](https://docs.ethers.io/v5/api/signer/).

```ts
const privateKey = "<your_private_key>";
let signer = new ethers.Wallet(privateKey);
```

And connect it to a [Provider](https://docs.ethers.io/v5/api/providers/) on the sending chain. You can get providers from [Infura](https://infura.io/), [Alchemy](https://www.alchemy.com/), or whatever you prefer.

```ts
const provider = new ethers.providers.JsonRpcProvider("<kovan_rpc_url>");
signer = signer.connect(provider);
const signerAddress = await signer.getAddress();
```

### 5. Construct the `NxtpSdkConfig`

Fill in the placeholders with the appropriate provider URLs.

```ts
const nxtpConfig: NxtpSdkConfig = {
  logLevel: "info",
  signerAddress: signerAddress,
  chains: {
    "1111": {
      providers: ["<rinkeby_rpc_url>"],
      assets: [
        {
          name: "TEST",
          address: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C",
        },
      ],
    },
    "2221": {
      providers: ["<kovan_rpc_url>"],
      assets: [
        {
          name: "TEST",
          address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
        },
      ],
    },
  },
};
```

Not sure where those IDs came from? They refer to the [Nomad Domain IDs](../testing-against-testnet.md#nomad-domain-ids) which are a custom mapping of ID to specific execution environment (not always equivalent to "chain", hence we have Domain IDs). 

### 6. Create the SDK

Simply call `create()` with the config from above.

```ts
const {nxtpSdkBase} = await create(nxtpConfig);
```

### 7. Construct the `xCallArgs`

Now, we construct the arguments that will be passed into the `xcall`.

```ts
const callParams = {
  to: "<destination_address>", // the address that should receive the funds
  callData: "0x", // empty calldata for a simple transfer
  originDomain: "2221", // send from Kovan
  destinationDomain: "1111", // to Rinkeby
};

const xCallArgs = {
  params: callParams,
  transactingAssetId: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F", // the Kovan Test Token
  amount: "1000000000000000000", // amount to send (1 TEST)
  relayerFee: "0", // relayers on testnet don't take a fee
};
```

### 8. Approve the asset transfer

This is necessary because funds will first be sent to the Connext contract before being bridged.

`approveIfNeeded()` is a helper function that finds the right Connext contract and executes the standard "increase allowance" flow for an asset.

```ts
const approveTxReq = await nxtpSdkBase.approveIfNeeded(
  xCallArgs.params.originDomain,
  xCallArgs.transactingAssetId,
  xCallArgs.amount
)
const approveTxReceipt = await signer.sendTransaction(approveTxReq);
const approveResult = await approveTxReceipt.wait();
```

### 9. Send it!

Send the `xcall`.

```ts
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
xcallTxReq.gasLimit = ethers.BigNumber.from("30000000"); 
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt); // so you can see the transaction hash
const xcallResult = await xcallTxReceipt.wait();
```

Finally, run the following to fire off the cross-chain transfer!

```shell
yarn build
yarn xtransfer
```

### 10. Track the `xcall`

You can use the transaction hash from the transaction receipt we logged above to track the status of the `xcall`, following instructions here.

[Tracking an xcall](../xcall-status.md)
