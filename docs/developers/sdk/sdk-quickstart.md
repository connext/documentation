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

In this quickstart, we'll demonstrate how to execute an `xcall` to transfer funds from a wallet on Rinkeby to a destination address on Goerli.

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
  "build": "tsc",
  "xtransfer": "node dist/xtransfer.js"
}
```

Create `xtransfer.ts` in project directory, where we will write all the code in this example.

```bash
mkdir src && touch src/xtransfer.ts
```

### 2. Install dependencies

Install the SDK.

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
const privateKey = "<wallet_private_key>";
let signer = new ethers.Wallet(privateKey);
```

And connect it to a [Provider](https://docs.ethers.io/v5/api/providers/) on the sending chain ([Infura](https://infura.io/), [Alchemy](https://www.alchemy.com/), etc).

```ts
const provider = new ethers.providers.JsonRpcProvider("<rinkeby_rpc_url>");
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
          address: "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
        },
      ],
    },
    "3331": {
      providers: ["<goerli_rpc_url>"],
      assets: [
        {
          name: "TEST",
          address: "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
        },
      ],
    },
  },
};
```

> Not sure where those IDs came from? They refer to the [Nomad Domain IDs](../testing-against-testnet#nomad-domain-ids) which are a custom mapping of ID to specific execution environment (not always equivalent to "chain", hence we have Domain IDs). 

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
  originDomain: "1111", // send from Rinkeby
  destinationDomain: "3331", // to Goerli
  recovery: "<destination_address>", // fallback address to send funds to if execution fails on destination side
  callback: ethers.constants.AddressZero, // zero address because we don't expect a callback for a simple transfer 
  callbackFee: "0", // relayers on testnet don't take a fee
  forceSlow: false, // option that allows users to take the Nomad slow path (~30 mins) instead of paying routers a 0.05% fee on their transaction
  receiveLocal: false // option for users to receive the local Nomad-flavored asset instead of the adopted asset on the destination side
};

const xCallArgs = {
  params: callParams,
  transactingAssetId: "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9", // the Rinkeby Test Token
  amount: "1000000000000000000", // amount to send (1 TEST)
  relayerFee: "0", // relayers on testnet don't take a fee
};
```

A detailed reference of all the `xcall` arguments can be found [here](../xcall-params.md).

### 8. Approve the asset transfer

This is necessary because funds will first be sent to the ConnextHandler contract before being bridged.

`approveIfNeeded()` is a helper function that finds the right contract address and executes the standard "increase allowance" flow for an asset.

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
console.log(xcallTxReceipt); // so we can see the transaction hash
const xcallResult = await xcallTxReceipt.wait();
```

Finally, run the following to fire off the cross-chain transfer!

```shell
yarn build
yarn xtransfer
```

### 10. Track the `xcall`

We can use the transaction hash from the transaction receipt we logged above to track the status of the `xcall`, following instructions here.

[Tracking an xcall](../xcall-status)

After the DestinationTransfer shows up on the Goerli side, the freshly transferred tokens should show up in the destination wallet.

--- 

## Cross-Chain Mint (unpermissioned)

We can also send arbitrary `calldata`, along with the `xcall`, to be executed on the destination domain.

In this example, we're going to construct some `calldata` targeting an existing contract function to avoid having to deploy a new contract. We'll aim for the `mint` function of the [Test ERC20 Token (TEST) contract](https://goerli.etherscan.io/address/0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9#writeContract) to demonstrate this. 

> Minting usually requires permissioning but the Test Token has a public `mint` function (callable by anyone!) that we can leverage for this example. Hence, this is an "unpermissioned" `xcall` with calldata - nothing extra needs to be done on the destination side.

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
    "0x6d2A06543D23Cc6523AE5046adD8bb60817E0a94", // address to mint tokens for
    ethers.BigNumber.from("100000000000000000000") // amount to mint (100 TEST)
  ]
)
```

### 8. Construct the `xCallArgs`

Now with the `calldata` ready, we supply it to the `xCallArgs`.

```js
const callParams = {
  to: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C", // Rinkeby Test Token - this is the contract we are targeting
  //highlight-next-line
  callData: calldata, 
  originDomain: "1111", // send from Rinkeby
  destinationDomain: "3331", // to Goerli
  recovery: "<destination_address>", // fallback address to send funds to if execution fails on destination side
  callback: ethers.constants.AddressZero, // zero address because we don't expect a callback 
  callbackFee: "0", // relayers on testnet don't take a fee
  forceSlow: false, // option that allows users to take the Nomad slow path (~30 mins) instead of paying routers a 0.05% fee on their transaction
  receiveLocal: false // option for users to receive the local Nomad-flavored asset instead of the adopted asset on the destination side
};

const xCallArgs = {
  params: callParams,
  transactingAssetId: "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9", // the Rinkeby Test Token
  amount: "0", // not sending any funds
  relayerFee: "0", // relayers on testnet don't take a fee
};
```

### 9. Send it!

Notice that we specified `amount: "0"` above so we're not sending any funds with this `xcall`. Therefore, we can skip the approval dance and just send the transaction.

```ts title="*same code*"
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
xcallTxReq.gasLimit = ethers.BigNumber.from("30000000"); 
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt); // so we can see the transaction hash
const xcallResult = await xcallTxReceipt.wait();
```

Add a new script to `package.json`:

```json title="package.json"
"scripts": {
  "xmint": "node dist/xmint.js"
}
```

Finally, run the following to fire off the cross-chain mint!

```shell
yarn build
yarn xmint
```

### 10. Track the `xcall`

Again, we use the transaction hash from the transaction receipt to track the status of the xcall and we can check the destination wallet to make sure the right amount of funds were minted.

[Tracking an xcall](../xcall-status)
