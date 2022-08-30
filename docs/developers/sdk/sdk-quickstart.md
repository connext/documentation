---
sidebar_position: 1
id: sdk-quickstart
---

# SDK Quickstart

The Connext SDK allows developers to interact with the Connext protocol in standard Node.js or web environments. This quickstart will go through how to build on top of Connext using the TypeScript SDK. 

These examples (and others) can be found in our xApp Starter Kit, under `src/sdk-interactions`.

[xApp Starter Kit](https://github.com/connext/xapp-starter/)

--- 

## Cross-Chain Transfer

In this quickstart, we'll demonstrate how to execute an `xcall` to transfer funds from a wallet on Goerli to a destination address on Optimism-Goerli.

### 1. Setup project

If you have an existing project, you can skip to [Install dependencies](./sdk-quickstart#2-install-dependencies).

Create the project folder and initialize the package.

```bash
mkdir node-examples && cd node-examples
yarn init
```

We'll use TypeScript / Node.js in this example.

```bash
yarn add @types/node typescript 
yarn add -D @types/chai
yarn tsc --init
```

We want to use top-level await so we'll set the compiler options accordingly.

```json title="tsconfig.json"
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

And add the following to `package.json`:

```json title="package.json"
"type": "module",
"scripts": {
  "build": "tsc && node dist/xtransfer.js",
  "xtransfer": "node dist/xtransfer.js"
}
```

Create `xtransfer.ts` in project directory, where we will write all the code in this example.

```bash
mkdir src && touch src/xtransfer.ts
```

### 2. Install dependencies

Install the SDK. Use the latest `0.2.0-beta.*` version for Amarok (see versions [here](https://www.npmjs.com/package/@connext/nxtp-sdk))

```bash
yarn add @connext/nxtp-sdk
```

Also, install `ethers`.

```bash
yarn add ethers
```

### 3. Pull in imports

We only need a few imports for this example.

```ts title="src/xtransfer.ts"
import { create, NxtpSdkConfig } from "@connext/nxtp-sdk";
import { ethers } from "ethers";
```

The rest of this guide will be working with this file.

### 4. Create a Signer

Use a wallet (i.e. MetaMask) as a [Signer](https://docs.ethers.io/v5/api/signer/).

```ts
const privateKey = "<PRIVATE_KEY>";
let signer = new ethers.Wallet(privateKey);
```

And connect it to a [Provider](https://docs.ethers.io/v5/api/providers/) on the sending chain ([Infura](https://infura.io/), [Alchemy](https://www.alchemy.com/), etc).

```ts
const provider = new ethers.providers.JsonRpcProvider("<GOERLI_RPC_URL>");
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
```

> Not sure where those IDs came from? They refer to the Domain IDs which are a custom mapping of ID to specific execution environment (not always equivalent to "chain", hence we have Domain IDs). The chain id is a hashed value of the chain name.

### 6. Create the SDK

Simply call `create()` with the config from above. We'll also fetch the signer address and set the amount to send.

```ts
const {nxtpSdkBase} = await create(nxtpConfig);

const signerAddress = await signer.getAddress();

const amount = 1000000000000000000; // amount to send (1 TEST)
```

### 7. Construct the `xCallArgs`

Now, we construct the arguments that will be passed into the `xcall`.

```ts
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
```

A detailed reference of all the `xcall` arguments can be found [here](../xcall-params.md).

### 8. Approve the asset transfer

This is necessary because funds will first be sent to the ConnextHandler contract before being bridged.

`approveIfNeeded()` is a helper function that finds the right contract address and executes the standard "increase allowance" flow for an asset.

```ts
const approveTxReq = await nxtpSdkBase.approveIfNeeded(
  xCallArgs.params.originDomain,
  xCallArgs.transactingAsset,
  xCallArgs.transactingAmount
)
const approveTxReceipt = await signer.sendTransaction(approveTxReq);
await approveTxReceipt.wait();
```

### 9. Send it!

Send the `xcall`.

```ts
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
xcallTxReq.gasLimit = ethers.BigNumber.from("20000000"); 
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt);
const xcallResult = await xcallTxReceipt.wait();
```

Finally, run the following to fire off the cross-chain transfer!

```shell
yarn xtransfer
```

### 10. Track the `xcall`

We can use the transaction hash from the transaction receipt we logged above to track the status of the `xcall`, following instructions here.

[Tracking an xcall](../xcall-status)

After the DestinationTransfer shows up on the Optimism-Goerli side, the freshly transferred tokens should show up in the destination wallet.

--- 

## Cross-Chain Mint (unauthenticated)

We can also send arbitrary `calldata`, along with the `xcall`, to be executed on the destination domain.

In this example, we're going to construct some `calldata` targeting an existing contract function to avoid having to deploy a new contract. We'll aim for the `mint` function of the [Test ERC20 Token (TEST) contract](https://blockscout.com/optimism/goerli/address/0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF/write-contract) to demonstrate this. 

> Minting usually requires authentication but the Test Token has a public `mint` function (callable by anyone!) that we can leverage for this example. Hence, this is an "unauthenticated" `xcall` with calldata - nothing extra needs to be done on the destination side.

### 7. Encode the `calldata`

After creating the SDK (steps 1-6 above), we have to create and encode the `calldata`.

To do this, we'll just grab the Test Token contract's ABI (we only care about the `mint` function here) and encode the `calldata` with the correct arguments.

```js
const contractABI = [
  "function mint(address account, uint256 amount)"
];
const iface = new ethers.utils.Interface(contractABI);

const calldata = iface.encodeFunctionData(
  "mint", 
  [
    await signer.getAddress(), // the address that should receive the minted funds
    ethers.BigNumber.from("100000000000000000000") // amount to mint (100 TEST)
  ]
)
```

### 8. Construct the `xCallArgs`

Now with the `calldata` ready, we supply it to the `xCallArgs`.

```js
const callParams = {
  to: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF", // Opt-Goerli Test Token contract - the target
  callData: calldata, 
  originDomain: "1735353714", // send from Goerli
  destinationDomain: "1735356532", // to Optimism-Goerli
  agent: signerAddress, // address allowed to transaction on destination side in addition to relayers
  recovery: await signer.getAddress(), // fallback address to send funds to if execution fails on destination side
  forceSlow: false, // option to force AMB slow path (~30 mins) instead of paying 0.05% fee
  receiveLocal: false, // option to receive the local AMB-flavored asset instead of the adopted asset
  callback: ethers.constants.AddressZero, // no callback so use the zero address
  callbackFee: "0", // fee paid to relayers for the callback; no fees on testnet
  relayerFee: "0", // fee paid to relayers for the forward call; no fees on testnet
  destinationMinOut: "0", // not sending funds so minimum can be 0
};

const xCallArgs = {
  params: callParams,
  transactingAsset: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1", // not sending funds so use any registered asset
  transactingAmount: "0", // not sending funds with this calldata-only xcall
  originMinOut: "0" // not sending funds so minimum can be 0
};
```

### 9. Send it!

Notice that we specified the zero address for `transactingAssetId` and `amount: "0"` above since we're not sending any funds with this `xcall`. Therefore, we can skip the approval dance and just send the transaction.

```ts title="*same code*"
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
xcallTxReq.gasLimit = ethers.BigNumber.from("20000000"); 
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt);
const xcallResult = await xcallTxReceipt.wait();
```

Add a new script to `package.json`:

```json title="package.json"
"scripts": {
  "xmint": "tsc && node dist/xmint.js"
}
```

Finally, run the following to fire off the cross-chain mint!

```shell
yarn xmint
```

### 10. Track the `xcall`

Again, we use the transaction hash from the transaction receipt to track the status of the xcall and we can check the destination wallet to make sure the right amount of funds were minted.

[Tracking an xcall](../xcall-status)
