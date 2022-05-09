---
sidebar_position: 1
id: getting-started
---

# Getting Started 

Details of the transaction flow based on the Amarok upgrade.

[Transaction Flow](../Basics/howitworks.md)

Deployed contract addresses, domain IDs, and other information can be found in the Testnet Reference.

[Testnet Reference](./testing-against-testnet.md)

## Interact from the SDK

Get started quickly using the Typescript SDK.

In this example, we'll demonstrate how to execute an `xcall` to transfer funds from your wallet on Kovan to a destination address on Rinkeby.

1. Install the SDK.

  ```
  yarn add @connext/nxtp-sdk@amarok
  ```

  When prompted, choose the latest 0.2.0-alpha.N version.

2. Construct the `NxtpSdkConfig` and create the SDK.

  ```ts
  // Use your MetaMask wallet as a signer, for example
  const privateKey = "<your_private_key";

  // Connect to a provider on the sending chain
  const provider = new ethers.providers.JsonRpcProvider("<kovan_rpc_url");
  const signer = new ethers.Wallet(privateKey).connect(provider);
  const signerAddress = await signer.getAddress();

  // Replace the placeholders with your own providers
  const nxtpConfig: NxtpSdkConfig = {
    logLevel: "info",
    signerAddress: signerAddress,
    chains: {
      "1111": {
        providers: ["<rinkeby_rpc_url"],
        assets: [
          {
            name: "TEST",
            address: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C",
          },
        ],
      },
      "2221": {
        providers: ["<kovan_rpc_url"],
        assets: [
          {
            name: "TEST",
            address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
          },
        ],
      },
    },
  };

  const { nxtpSdkBase } = await create(nxtpConfig);
  ```

3. Construct the `xCallArgs` for a simple transfer.

  ```ts
  const callParams = {
    // `to` is the address that should receive the funds
    to: "<destination_address>",
    // Empty calldata for a simple transfer
    callData: "0x",
    // Send from Kovan -> Rinkeby
    originDomain: "2221",
    destinationDomain: "1111",
  };

  const xCallArgs = {
    params: callParams,
    // This should be the Kovan Test Token
    transactingAssetId: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
    // Desired amount to send
    amount: "1000000000000000000",
    // Relayers on testnet don't take a fee
    relayerFee: "0",
  };
  ```

4. Approve the asset transfer.

  ```ts
  const approveTxReq = await nxtpSdkBase.approveIfNeeded(
    xCallArgs.params.originDomain,
    xCallArgs.transactingAssetId,
    xCallArgs.amount
  )
  const approveTxReceipt = await signer.sendTransaction(approveTxReq);
  const approveResult = await approveTxReceipt.wait();
  ```

5. Send it!

  ```ts
  const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
  xcallTxReq.gasLimit = ethers.BigNumber.from("30000000"); 
  const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
  const xcallResult = await xcallTxReceipt.wait();
  ```

6. Track the `xcall` status.

  [Tracking an xcall](../Developers/xcall-status.md)


## Interact from a Contract

You can also initiate an `xcall` from a smart contract. This allows Connext to be used as a base cross-chain layer that can be integrated into dApps, turning them into **xApps**.

For example, here are interesting use cases that the protocol enables:
- Hold a governance vote on one chain and execute the outcome of it on another (plus other DAO operations)
- Lock-and-mint or burn-and-mint token bridging
- Perform a swap and transfer the received tokens across chains
- Connecting DEX liquidity across chains in a single seamless transaction
- Crosschain vault zaps and vault strategy management
- Critical protocol operations such as replicating/syncing global constants (e.g. PCV) across chains
- Bringing UniV3 TWAPs to every chain without introducing oracles
- Chain-agnostic veToken governance
- Metaverse-to-metaverse interoperability


### Skeleton of a xApp

The contract that initiates the cross-chain interaction.
```solidity
...
IConnext public immutable connext;

constructor(IConnext _connext) {
  connext = _connext;
}

function deposit(
  address to,
  address asset,
  uint32 originDomain,
  uint32 destinationDomain,
  uint256 amount
) external payable {
  ERC20 token = ERC20(asset);
  token.transferFrom(msg.sender, address(this), amount);
  token.approve(address(connext), amount);

  bytes4 selector = bytes4(keccak256("deposit(address,uint256,address)"));

  bytes memory callData = abi.encodeWithSelector(
    selector,
    asset,
    amount,
    msg.sender
  );

  IConnext.CallParams memory callParams = IConnext.CallParams({
    to: to,
    callData: callData,
    originDomain: originDomain,
    destinationDomain: destinationDomain
  });

  IConnext.XCallArgs memory xcallArgs = IConnext.XCallArgs({
    params: callParams,
    transactingAssetId: asset,
    amount: amount,
    relayerFee: 0
  });

  connext.xcall(xcallArgs);
...
```

The target contract and function on the receiving chain.

```solidity
...
function deposit(
  address asset,
  uint256 amount,
  address onBehalfOf
) public payable returns (uint256) {
  ERC20 token = ERC20(asset);
  balances[asset][onBehalfOf] += amount;
  token.transferFrom(msg.sender, address(this), amount);

  return balances[asset][onBehalfOf];
}
...
```

### xApp Starter Kit

Complete contract examples be found in our starter kit.

[xapp-starter](https://github.com/connext/xapp-starter/)


---

Don't know where to start? Come say hi in our community chat!

[Chat with us!](https://chat.connext.network)
