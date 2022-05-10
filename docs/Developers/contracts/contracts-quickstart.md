---
sidebar_position: 1
id: contracts-quickstart
---

# Contracts Quickstart

This quickstart will show you how to write smart contracts in Solidity that interact with Connext's deployed contracts. 

This example (and others) can be found in our xApp Starter Kit, under `src/contract-to-contract-interactions`.

[xApp Starter Kit](https://github.com/connext/xapp-starter/)

---

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