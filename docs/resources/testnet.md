---
sidebar_position: 2
id: testnet
---

# Testnet

We maintain two testnet environments:
- `production`: a "stable" testnet for integrators
- `staging`: used primarily by the core team for testing; no expectations for stability

## Contract Deployments

A full list of deployed contracts can be found in the [deployments.json](https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/deployments.json) file. This contains deployments for all environments and is difficult to parse through manually. You should only need to reference it for automation or as a source of truth. For convenience, we extracted the important contract addresses and listed them here.

Note that the Test Token is a mintable ERC20. The open `mint` function has the signature `mint(address account, uint256 amount)` and can be freely called.

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

## Offchain Agents

### Routers

While there are multiple routers providing liquidity to the system, Connext runs our own as well.

- Connext Router (staging): `0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7`
- Connext Router (production): `0xD2aD711861ab345977B7379c81165708C8717fF1`
### Sequencer

Example endpoints can be found [here](https://github.com/connext/nxtp/blob/c694958e51b9f81cc100260d0776788276303087/packages/agents/sequencer/example.http#L15). For instance, you can check for queued transactions:

[https://sequencer.testnet.connext.ninja/queued](https://sequencer.testnet.connext.ninja/queued)

### Relayers

[https://relay.gelato.digital](https://relay.gelato.digital)

### Cartographer

The Cartographer is a Connext-hosted service that stores transfer data to a persistent datastore. The data schema is bespoke for Connext cross-chain transfers and a REST API is available for retrieving details like transfer status, transfer history by user, and more.

Example endpoints can be found [here](https://github.com/connext/nxtp/blob/c694958e51b9f81cc100260d0776788276303087/packages/agents/cartographer/api/example.http). For instance, you can query for all transfers: 

[https://postgrest.testnet.connext.ninja/transfers](https://postgrest.testnet.connext.ninja/transfers)


## User Interfaces

### Bridge UI

A bridge UI where users can transfer assets across domains. Here you can also mint `TEST` tokens with the faucet.

[https://amarok-testnet.coinhippo.io](https://amarok-testnet.coinhippo.io)

### Connextscan

This is the testnet scanner site where you can track the status of transfers by `transferId`. 

[https://testnet.amarok.connextscan.io](https://testnet.amarok.connextscan.io)
