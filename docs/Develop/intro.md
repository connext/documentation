---
sidebar_position: 1
id: intro
---

# Getting Started 

Connext’s public testnet is currently available on Kovan ←→ Rinkeby. 

Deployed contract addresses and other information can be found in the Testnet Reference.

[Testnet Reference](./Testnet/testing-against-testnet.md)

## Interact from the SDK

Get started quickly using the Typescript SDK.

1. Install

  ```
  yarn add @connext/nxtp-sdk@0.2.0-alpha.6
  ```

2. Create SDK

  ```ts
  const config = {
    "logLevel": "info",
    "chains": {
      "1111": {
        "providers": ["https://rinkeby.infura.io/v3/..."],
        "assets": [
          {
            "name": "TEST",
            "address": "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C"
          }
        ]
      },
      "2221": {
        "providers": ["https://kovan.infura.io/v3/..."],
        "assets": [
          {
            "name": "TEST",
            "address": "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
          }
        ]
      }
    },
    "signerAddress": "0x..."
  });

  const sdk = NxtpSdk.create(
    {...config}, 
    <signer>
  );  

  ```

3. Construct `xCallArgs`

  ```
  struct CallParams {
    address to; // target contract or recipient address
    bytes callData; // encoded calldata to execute on receiving chain
    uint32 originDomain; // origin domain ID
    uint32 destinationDomain; // destination domain ID
  }

  struct XCallArgs {
    CallParams params;
    address transactingAssetId;
    uint256 amount;
  }
  ```

  [Domain IDs](./Testnet/testing-against-testnet.md/#nomad-chain-ids)

4. Call `xcall`

  ```
  const txResponse = await sdk.xcall(
    XCallArgs
  )
  ```

5. Track `xcall` status

  [Tracking an xcall](../Develop/Testnet/xcall-status.md)


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
    amount: amount
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

Complete contract examples be found in the [xapp-starter](https://github.com/connext/xapp-starter/) repo.

### System Overview

The System Overview section covers high level information about crosschain interoperability and how **nxtp**, the protocol underlying Connext, works.

[System Overview](./SystemOverview/intro)
### Testnet Reference

All the contracts, domain IDs, off-chain infra informtion, etc. -- all in one place.

[Testnet Reference](./Testnet/testing-against-testnet)

---

Don't know where to start? Come say hi in our community chat!

[Chat with us!](https://chat.connext.network)
