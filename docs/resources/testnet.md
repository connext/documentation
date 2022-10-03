---
sidebar_position: 3 
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
          <a href="https://louper.dev/diamond/0xD9e8b18Db316d7736A3d0386C59CA3332810df3B?network=goerli">
            ConnextHandler
          </a>
        </td>
        <td>0xD9e8b18Db316d7736A3d0386C59CA3332810df3B</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0xC6d9D20d179CeCe15E226CdCa9Ef18B47E72fF86">
            TokenRegistry
          </a>
        </td>
        <td>0xC6d9D20d179CeCe15E226CdCa9Ef18B47E72fF86</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0xBf0AC6dE22A82DfAc78CD54f5F649E778d26F78B">
            PromiseRouter
          </a>
        </td>
        <td>0xBf0AC6dE22A82DfAc78CD54f5F649E778d26F78B</td>
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
          <a href="https://blockscout.com/optimism/goerli/address/0xA04f29c24CCf3AF30D4164F608A56Dc495B2c976">
            ConnextHandler
          </a>
        </td>
        <td>0xA04f29c24CCf3AF30D4164F608A56Dc495B2c976</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0xEEb6D6aA1bae7f62d08c8233149534788DEf4807">
            TokenRegistry
          </a>
        </td>
        <td>0xEEb6D6aA1bae7f62d08c8233149534788DEf4807</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0xba05fbdc1D6E70F5BA16559bc956F1074E723d9F">
            PromiseRouter
          </a>
        </td>
        <td>0xba05fbdc1D6E70F5BA16559bc956F1074E723d9F</td>
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
          <a href="https://blockscout.com/optimism/goerli/address/0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806">
            WETH
          </a>
        </td>
        <td>0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806</td>
        <td>Adopted</td>
      </tr>
    </tbody>
  </table>

  ### Mumbai

  Domain ID: 9991

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://louper.dev/diamond/0xfdA9C9aE45866D12E5008912318bf3c34fc30912?network=mumbai">
            ConnextHandler
          </a>
        </td>
        <td>0xfdA9C9aE45866D12E5008912318bf3c34fc30912</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0xc7031D586320f707b591Cc83BA71219d0c9cf982">
            TokenRegistry
          </a>
        </td>
        <td>0xc7031D586320f707b591Cc83BA71219d0c9cf982</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x8a38b3C20941c9b82AC7D77B650aac2Ad9Df5472">
            PromiseRouter
          </a>
        </td>
        <td>0x8a38b3C20941c9b82AC7D77B650aac2Ad9Df5472</td>
      </tr>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0xeDb95D8037f769B72AAab41deeC92903A98C9E16">
            TEST
          </a>
        </td>
        <td>0xeDb95D8037f769B72AAab41deeC92903A98C9E16</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69">
            nextWETH
          </a>
        </td>
        <td>0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62">
            WETH
          </a>
        </td>
        <td>0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62</td>
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
          <a href="https://louper.dev/diamond/0x549CE89d40Cf1D28597CbC535F669d1FEEFfbC6f?network=goerli">
            ConnextHandler
          </a>
        </td>
        <td>0x549CE89d40Cf1D28597CbC535F669d1FEEFfbC6f</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.etherscan.io/address/0x0e88035e46eEd61fB1d9c653208Bc3CC28403BEb">
            TokenRegistry
          </a>
        </td>
        <td>0x0e88035e46eEd61fB1d9c653208Bc3CC28403BEb</td>
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
          <a href="https://blockscout.com/optimism/goerli/address/0x2DB8F4D9D1dbE8787FF3131b64b0ae335e08Dc93">
            ConnextHandler
          </a>
        </td>
        <td>0x2DB8F4D9D1dbE8787FF3131b64b0ae335e08Dc93</td>
      </tr>
      <tr>
        <td>
          <a href="https://blockscout.com/optimism/goerli/address/0xC7d21A777409A6D0A3A5b10cE401D0277e5F42A9">
            TokenRegistry
          </a>
        </td>
        <td>0xC7d21A777409A6D0A3A5b10cE401D0277e5F42A9</td>
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
          <a href="https://blockscout.com/optimism/goerli/address/0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806">
            WETH
          </a>
        </td>
        <td>0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806</td>
        <td>Adopted</td>
      </tr>
    </tbody>
  </table>

  ### Mumbai

  Domain ID: 9991

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://louper.dev/diamond/0x73175967D3B06eC39A9097Ad7dEbb5edf6896e2f?network=mumbai">
            ConnextHandler
          </a>
        </td>
        <td>0x73175967D3B06eC39A9097Ad7dEbb5edf6896e2f</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x9F5ED51BC45aEbb0A440C102910f8019035c5673">
            TokenRegistry
          </a>
        </td>
        <td>0x9F5ED51BC45aEbb0A440C102910f8019035c5673</td>
      </tr>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0xeDb95D8037f769B72AAab41deeC92903A98C9E16">
            TEST
          </a>
        </td>
        <td>0xeDb95D8037f769B72AAab41deeC92903A98C9E16</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69">
            nextWETH
          </a>
        </td>
        <td>0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69</td>
        <td>Representation</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62">
            WETH
          </a>
        </td>
        <td>0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62</td>
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
