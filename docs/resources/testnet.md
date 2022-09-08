---
sidebar_position: 2
id: testnet
---

# Testnet

The Connext testnet includes various smart contracts and offchain infrastructure elements.

We maintain two testnet environments:
- `production`: a "stable" testnet for integrators
- `staging`: used primarily by the core team for testing; no expectations for stability

## Domain IDs

Domain IDs are unique to every bridge and differ from Chain IDs. Connext's `xcall` requires specifying which Domain ID should be the destination of a cross-chain transaction.

<table>
  <tr>
    <th>Name</th>
    <th>Chain ID</th>
    <th>Domain ID</th>
  </tr>
  <tr>
    <td>Goerli</td>
    <td>5</td>
    <td>1735353714</td>
  </tr>
  <tr>
    <td>Optimism-Goerli</td>
    <td>420</td>
    <td>1735356532</td>
  </tr>
</table>

## Contract Deployments

A full list of deployed contracts can be found in the [deployments.json](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/deployments.json) file. This contains deployments for all environments and is difficult to parse through manually. You should only need to reference it for automation or as a source of truth. For convenience, we extracted the important contract addresses and listed them here.

<details>

  <summary>Production Testnet Contracts</summary>

  ### Goerli 
  
  Domain ID: 1735353714

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://louper.dev/diamond/0xB4C1340434920d70aD774309C75f9a4B679d801e?network=goerli">
            ConnextHandler
          </a>
        </td>
        <td>0xB4C1340434920d70aD774309C75f9a4B679d801e</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0x3f95CEF37566D0B101b8F9349586757c5D1F2504">
            TokenRegistry
          </a>
        </td>
        <td>0x3f95CEF37566D0B101b8F9349586757c5D1F2504</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0xD25575eD38fa0F168c9Ba4E61d887B6b3433F350">
            PromiseRouter
          </a>
        </td>
        <td>0xD25575eD38fa0F168c9Ba4E61d887B6b3433F350</td>
      </tr>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1">
            TEST
          </a>
        </td>
        <td>0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1</td>
        <td>Canonical</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6">
            WETH
          </a>
        </td>
        <td>0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6</td>
        <td>Canonical</td>
      </tr>
    </tbody>
  </table>

  <br />

  ### Optimism-Goerli

  Domain ID: 1735356532

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0xe37f1f55eab648dA87047A03CB03DeE3d3fe7eC7">
            ConnextHandler
          </a>
        </td>
        <td>0xe37f1f55eab648dA87047A03CB03DeE3d3fe7eC7</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x67fE7B3a2f14c6AC690329D433578eEFE59954C8">
            TokenRegistry
          </a>
        </td>
        <td>0x67fE7B3a2f14c6AC690329D433578eEFE59954C8</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x7aA60f0D8E234EdCbcB119d0e569376E93431Ee2">
            PromiseRouter
          </a>
        </td>
        <td>0x7aA60f0D8E234EdCbcB119d0e569376E93431Ee2</td>
      </tr>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF">
            TEST
          </a>
        </td>
        <td>0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E">
            nextWETH
          </a>
        </td>
        <td>0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x4E283927E35b7118eA546Ef58Ea60bfF59E857DB">
            WETH
          </a>
        </td>
        <td>0x4E283927E35b7118eA546Ef58Ea60bfF59E857DB</td>
        <td>Adopted</td>
      </tr>
    </tbody>
  </table>

</details>


<details>

  <summary>Staging Testnet Contracts</summary>

  ### Goerli

  Domain ID: 1735353714

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://louper.dev/diamond/0x8664bE4C5C12c718838b5dCd8748B66F3A0f6A18?network=goerli">
            ConnextHandler
          </a>
        </td>
        <td>0x8664bE4C5C12c718838b5dCd8748B66F3A0f6A18</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0x458a2AE80fbe7e043ec18b62515423e63Ee5cBed">
            TokenRegistry
          </a>
        </td>
        <td>0x458a2AE80fbe7e043ec18b62515423e63Ee5cBed</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0x3E3d48C7636A446C59423C95A89F1dE40f3a1F22">
            PromiseRouter
          </a>
        </td>
        <td>0x3E3d48C7636A446C59423C95A89F1dE40f3a1F22</td>
      </tr>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1">
            TEST
          </a>
        </td>
        <td>0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1</td>
        <td>Canonical</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6">
            WETH
          </a>
        </td>
        <td>0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6</td>
        <td>Canonical</td>
      </tr>
    </tbody>
  </table>

  <br />

  ### Optimism-Goerli

  Domain ID: 1735356532 

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0xB7CF5324641bD9F82903504c56c9DE2193B4822F">
            ConnextHandler
          </a>
        </td>
        <td>0xB7CF5324641bD9F82903504c56c9DE2193B4822F</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x35d3a7C14de030dC9a1375009620c99369827a5E">
            TokenRegistry
          </a>
        </td>
        <td>0x35d3a7C14de030dC9a1375009620c99369827a5E</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0xdd247dc5C3f446825FB00eA5bA074B6BAE8E2cae">
            PromiseRouter
          </a>
        </td>
        <td>0xdd247dc5C3f446825FB00eA5bA074B6BAE8E2cae</td>
      </tr>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF">
            TEST
          </a>
        </td>
        <td>0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E">
            nextWETH
          </a>
        </td>
        <td>0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0x4E283927E35b7118eA546Ef58Ea60bfF59E857DB">
            WETH
          </a>
        </td>
        <td>0x4E283927E35b7118eA546Ef58Ea60bfF59E857DB</td>
        <td>Adopted</td>
      </tr>
    </tbody>
  </table>

</details>

## Test Token (TEST)

The Test ERC20 Token has an open mint function with the signature `mint(address account, uint256 amount)`. These test ERC20 tokens can be freely minted by anyone and they are collateralized by routers on the test network to enable swaps between them on the different chains.

Please ping the team to request for more testnet assets and swaps added!

## Sequencer

URL: `https://sequencer.testnet.connext.ninja`

## Testnet Bridge

Note this new Bridge UI is still under development. Here you can mint TEST tokens via the faucet and also send tokens. 

URL: `https://amarok-testnet.coinhippo.io/`

## Testnet Connextscan

This is the testnet scanner site where you can track the status of transfers by `transferId`. 

URL: `https://testnet.amarok.connextscan.io/`
