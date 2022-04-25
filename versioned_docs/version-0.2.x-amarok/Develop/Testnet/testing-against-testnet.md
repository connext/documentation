---
sidebar_position: 1
---

# Testnet Reference

The Connext testnet contains various pieces of infrastructure and smart contracts.

## Deployed Contract Addresses

A full reference to deployed contracts can be found in the [deployments.json](https://github.com/connext/nxtp/blob/amarok/packages/deployments/contracts/deployments.json) file.

### Kovan (chainId: 42, domainId: 2221)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | 0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F |
| Connext | 0x983d9d70c1003baAE321fAA9C36BEb0eA37BD6E3 |

### Rinkeby (chainId: 4, domainId: 1111)

| Contract | Address |
| --- | --- |
| Test Token (TEST ERC20) | 0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2 |
| Connext | 0x3e99898Da8A01Ed909976AF13e4Fa6094326cB10 |

## Test Token (TEST)

The Test ERC20 Token has an open mint function with the signature `mint(address account, uint256 amount)`. These test ERC20 tokens can be freely minted by anyone and they are collateralized by routers on the test network to enable swaps between them on the different chains.

Please ping the team to request for more testnet assets and swaps added!

## Nomad Domain IDs

Domain IDs for testnet can be found in Nomad's staging deployments which are available at [staging configs](https://github.com/nomad-xyz/rust/blob/main/configuration/configs/staging.json).

## Sequencer

URL: `https://sequencer.testnet.connext.ninja`
