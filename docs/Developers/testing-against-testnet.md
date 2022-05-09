---
sidebar_position: 2 
---

# Testnet Reference

The Connext testnet contains various pieces of infrastructure and smart contracts.

## Deployed Contract Addresses

A full reference to deployed contracts can be found in the [deployments.json](https://github.com/connext/nxtp/blob/amarok/packages/deployments/contracts/deployments.json) file.

### Rinkeby (chainId: 4, domainId: 1111)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | 0xB7b1d3cC52E658922b2aF00c5729001ceA98142C |
| Connext Handler | 0x979588965099F4DEA3CAd850d67ca3356284591e |

### Goerli (chainId: 5, domainId: 3331)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | 0xD426e23A6a9524101CDC017e01dDc3262B7aA65D |
| Connext Handler | 0xDc495507b830E5D1d8C073D4B12D144e76100816 |

### Kovan (chainId: 42, domainId: 2221)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | 0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F |
| Connext Handler | 0x71a52104739064bc35bED4Fc3ba8D9Fb2a84767f |

## Test Token (TEST)

The Test ERC20 Token has an open mint function with the signature `mint(address account, uint256 amount)`. These test ERC20 tokens can be freely minted by anyone and they are collateralized by routers on the test network to enable swaps between them on the different chains.

Please ping the team to request for more testnet assets and swaps added!

## Nomad Domain IDs

Domain IDs for testnet can be found in our [chain index](https://github.com/connext/chaindata/blob/main/crossChain.json#) under the `domainId` key for supported chains.

## Sequencer

URL: `https://sequencer.testnet.connext.ninja`
