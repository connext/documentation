---
sidebar_position: 7
id: sdk-frontend-integration
---

# Integrating the SDK with a Frontend

A common pattern for the SDK is to use it in a frontend application. This guide will walk you through the steps to integrate the SDK with a frontend application.

## Next.JS

Next.JS is a popular frontend framework that allows you to build server-rendered React applications. It is a great choice for building a frontend application that uses the SDK.

### 1. Setup

Create a new Next.JS application using the `create-next-app` command (Typescript is recommended).

```bash
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app --typescript
```

Follow the instructions to create a new Next.JS application.

### 2. Install the SDK

Install the SDK using your package manager of choice.

```bash npm2yarn
npm install @connext/sdk
```

### 3. Configure Next.JS

The Connext SDK contains some dependencies that must be polyfilled to work on client-side applications. At minimum, your `next.config.js` file should contain the following configuration:

```js title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
```

Now you are ready to use the SDK in your Next.JS application!

For example:

```tsx title="pages/index.tsx"
"use client"; // this is a client component 👈🏽

import styles from "./page.module.css";
import { create, SdkConfig } from "@connext/sdk";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const sdkConfig: SdkConfig = {
  signerAddress: "0x2b8aA42fFb2c9c7B9f0B1e1b935F7D8331b6dC7c",
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

export default function Home() {
  useEffect(() => {
    const run = async () => {
      const { sdkBase } = await create(sdkConfig);
      console.log('sdkBase: ', sdkBase);
    }
    run();
  })
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  )
```

## Create React App (CRA)

React is a popular frontend framework that allows you to build client-rendered React applications. However, CRA is at end of life and the React team recommends other frameworks instead. 

We highly recommend using NextJS for easier integration. If, however, you still want to use CRA for your project then you should follow these steps.

### 1. Setup

Create a new CRA using the `create-react-app` command.

```bash
npx create-react-app my-app
# or
yarn create react-app my-app --template typescript
```

### 2. Install the SDK

Install the SDK using your package manager of choice.

```bash npm2yarn
npm install @connext/sdk
```

### 3. Configure CRA

1) Install necessary dependencies

```
yarn add -D @craco/craco zlib-browserify 
```

2) Create a `craco.config.js` in your project root with the following contents.

```js
const webpack from 'webpack';

module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig['resolve'] = {
        fallback: {
          fs: false,
          path: false,
          os: false,
          zlib: require.resolve("zlib-browserify"),
        },
      }
      return webpackConfig;
    },
		plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      }),
    ],
  },
};
```

3) Change scripts in `package.json` to use `craco` commands instead of `react-scripts`.

```json
"scripts": {
-  "start": "react-scripts start",
-  "build": "react-scripts build",
-  "test": "react-scripts test"
+  "start": "craco start",
+  "build": "craco build",
+  "test": "craco test"
}
```