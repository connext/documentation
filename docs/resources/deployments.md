---
sidebar_position: 2
id: deployments
---

# Deployments

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
          <a href="https://louper.dev/diamond/0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649?network=goerli">
            Connext
          </a>
        </td>
        <td>0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649</td>
      </tr>
    </tbody>
  </table>

   <table>
    <tbody> 
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Flavor</th>
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
          <a href="https://goerli-optimism.etherscan.io/address/0x5Ea1bb242326044699C3d81341c5f535d5Af1504">
            Connext
          </a>
        </td>
        <td>0x5Ea1bb242326044699C3d81341c5f535d5Af1504</td>
      </tr>
    </tbody>
  </table>

  <table>
    <tbody>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Flavor</th>
      </tr>
      <tr>
        <td>
          <a href="https://goerli-optimism.etherscan.io/address/0x68db1c8d85c09d546097c65ec7dcbff4d6497cbf">
            TEST
          </a>
        </td>
        <td>0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF</td>
        <td>Local/Adopted</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli-optimism.etherscan.io/address/0x39b061b7e41de8b721f9aeceb6b3f17ecb7ba63e">
            nextWETH
          </a>
        </td>
        <td>0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E</td>
        <td>Local</td>
      </tr>
      <tr>
        <td>
          <a href="https://goerli-optimism.etherscan.io/address/0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806">
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
          <a href="https://louper.dev/diamond/0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a?network=mumbai">
            Connext
          </a>
        </td>
        <td>0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a</td>
      </tr>
    </tbody>
  </table>

  <table>
    <tbody>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Flavor</th>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0xeDb95D8037f769B72AAab41deeC92903A98C9E16">
            TEST
          </a>
        </td>
        <td>0xeDb95D8037f769B72AAab41deeC92903A98C9E16</td>
        <td>Local/Adopted</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69">
            nextWETH
          </a>
        </td>
        <td>0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69</td>
        <td>Local</td>
      </tr>
      <tr>
        <td>
          <a href="https://mumbai.polygonscan.com/address/0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9">
            WETH
          </a>
        </td>
        <td>0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9</td>
        <td>Adopted</td>
      </tr>
    </tbody>
  </table>

  ### Arbitrum-Goerli

  Domain ID: 421613

  <table>
    <tbody>
      <tr>
        <th>Core Contract</th>
        <th>Address</th>
      </tr>
      <tr>
        <td>
          <a href="https://louper.dev/diamond/0x2075c9E31f973bb53CAE5BAC36a8eeB4B082ADC2?network=arbitrum_goerli">
            Connext
          </a>
        </td>
        <td>0x2075c9E31f973bb53CAE5BAC36a8eeB4B082ADC2</td>
      </tr>
    </tbody>
  </table>

  <table>
    <tbody>
      <tr>
        <th>Asset Contract</th>
        <th>Address</th>
        <th>Flavor</th>
      </tr>
      <tr>
        <td>
          <a href="https://goerli.arbiscan.io/address/0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f">
            TEST
          </a>
        </td>
        <td>0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f</td>
        <td>Local/Adopted</td>
      </tr>
        <td>
          <a href="https://goerli.arbiscan.io/address/0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2">
            WETH
          </a>
        </td>
        <td>0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2</td>
        <td>Local/Adopted</td>
      </tr>
    </tbody>
  </table>

</details>

## Offchain Agents

### Sequencer

Example endpoints can be found [here](https://github.com/connext/nxtp/blob/c694958e51b9f81cc100260d0776788276303087/packages/agents/sequencer/example.http#L15). For instance, you can check for queued transactions:

[https://sequencer.testnet.connext.ninja/queued](https://sequencer.testnet.connext.ninja/queued)

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
