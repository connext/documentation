---
sidebar_position: 1
---

# Testing NXTP Against Testnets

We have deployed our contracts against various testnets to allow for easier testing of SDK integrations.

The supported testnets can be found in the [deployments.json](https://github.com/connext/nxtp/blob/main/packages/contracts/deployments.json).

## Connecting a Dapp to Testnets

Initialize the NXTP SDK with parameters for the desired testnets.

Example:

```typescript
const chainConfig = {
  4: {
    providers: ["https://rinkeby.infura.io/..."]),
  },
  5: {
    provider: new providers.FallbackProvider(["https://goerli.infura.io/..."]),
  },
};

// Get signer from metamask
await ethereum.request({ method: "eth_requestAccounts" });
const provider = new providers.Web3Provider(ethereum);
const _signer = provider.getSigner();

// Instantiate SDK
const sdk = await NxtpSdk.create(chainProviders, _signer);
```

## Testing Transfers Using Test ERC20s

For easy testing, we have also deployed a test ERC20 contract on each testnet. Within the [deployments.json](https://github.com/connext/nxtp/blob/main/packages/contracts/deployments.json) file, you can find the address of the test ERC20 contract under the key `TestERC20` for each chain.

The test ERC20 tokens can be freely minted by anyone. The signature of the `mint` function is:

```
function mint(address account, uint256 amount)
```

The test tokens are collateralized by routers on the test network, so swap requests should always be successful when using these assets.