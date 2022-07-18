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
| ConnextHandler | [0x4cAA6358a3d9d1906B5DABDE60A626AAfD80186F](https://louper.dev/diamond/0x4cAA6358a3d9d1906B5DABDE60A626AAfD80186F?network=rinkeby) |
| TokenRegistry | [0x1A3BA482D98CCB858AEacB3B839f952390099cE6](https://rinkeby.etherscan.io/address/0x1A3BA482D98CCB858AEacB3B839f952390099cE6) |
| PromiseRouter | [0xC02530858cE0260a1c4f214CF2d5b7c4E5986485](https://rinkeby.etherscan.io/address/0xC02530858cE0260a1c4f214CF2d5b7c4E5986485) |

### Goerli (chainId: 5, domainId: 3331)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | [0x26FE8a8f86511d678d031a022E48FfF41c6a3e3b](https://goerli.etherscan.io/address/0x26FE8a8f86511d678d031a022E48FfF41c6a3e3b) |
| ConnextHandler | [0x6c9a905Ab3f4495E2b47f5cA131ab71281E0546e](https://louper.dev/diamond/0x6c9a905Ab3f4495E2b47f5cA131ab71281E0546e?network=goerli) |
| TokenRegistry | [0x51192fD98635FD32C2bfc0A2F4e362D864A4B8b1](https://goerli.etherscan.io/address/0x51192fD98635FD32C2bfc0A2F4e362D864A4B8b1) |
| PromiseRouter | [0xD7DAE26f3C54CEE823a02C6fD25d4301860F2B33](https://goerli.etherscan.io/address/0xD7DAE26f3C54CEE823a02C6fD25d4301860F2B33) |

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
