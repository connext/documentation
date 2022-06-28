---
sidebar_position: 2 
---

# Testnet Reference

The Connext testnet contains various pieces of infrastructure and smart contracts.

## Deployed Contract Addresses

A full reference to deployed contracts can be found in the [deployments.json](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/deployments.json) file.

### Rinkeby (chainId: 4, domainId: 1111)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | [0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9](https://rinkeby.etherscan.io/address/0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9) |
| ConnextHandler | [0x2307Ed9f152FA9b3DcDfe2385d279D8C2A9DF2b0](https://louper.dev/diamond/0x2307Ed9f152FA9b3DcDfe2385d279D8C2A9DF2b0?network=rinkeby) |
| PromiseRouter | [0x6e4Eaa2A41f9c211C8511540BbB1D971B1483128](https://rinkeby.etherscan.io/address/0x6e4Eaa2A41f9c211C8511540BbB1D971B1483128) |

### Goerli (chainId: 5, domainId: 3331)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | [0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9](https://goerli.etherscan.io/address/0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9) |
| ConnextHandler | [0xEC3A723DE47a644b901DC269829bf8718F175EBF](https://louper.dev/diamond/0xEC3A723DE47a644b901DC269829bf8718F175EBF?network=goerli) |
| PromiseRouter | [0x84bbbAC6B8fD5FA8Ab03890e4e7484a5fAa5C9fA](https://goerli.etherscan.io/address/0x84bbbAC6B8fD5FA8Ab03890e4e7484a5fAa5C9fA) |

## Test Token (TEST)

The Test ERC20 Token has an open mint function with the signature `mint(address account, uint256 amount)`. These test ERC20 tokens can be freely minted by anyone and they are collateralized by routers on the test network to enable swaps between them on the different chains.

Please ping the team to request for more testnet assets and swaps added!

## Nomad Domain IDs

Domain IDs for testnet can be found in our [chain index](https://github.com/connext/chaindata/blob/main/crossChain.json#) under the `domainId` key for supported chains.

## Sequencer

URL: `https://sequencer.testnet.connext.ninja`

## Testnet Bridge

Note this new Bridge UI is still under development. Here you can mint TEST tokens via the faucet and also send tokens. 

URL: `https://amarok-testnet.coinhippo.io/`

## Testnet Connextscan

This is the testnet scanner site where you can track the status of transfers by `transferId`. 

URL: `https://testnet.amarok.connextscan.io/`
