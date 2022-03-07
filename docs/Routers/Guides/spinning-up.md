---
sidebar_position: 2
---

# Spinning Up a Router

## Minimum Hardware Requirements

- 4GB RAM
- 30GB Storage

## Required Software

- [ Docker CE (Community Edition) ](https://docs.docker.com/install/) version 20.10.5 or higher
- [ Docker Compose ](https://docs.docker.com/compose/install/) version 1.27.4 or higher

## Network Configuration

The router requires the following ports to be open to the public:

- `4222`

:::danger
Do NOT expose the `ROUTER_EXTERNAL_PORT` to anyone untrusted! It should only be accessible by the operator in a trusted environment.
:::

## Cloning the Repository

To spin up a router, first clone the [`nxtp-router-docker-compose`](https://github.com/connext/nxtp-router-docker-compose) repository.

```shell
$ git clone https://github.com/connext/nxtp-router-docker-compose.git
```

## Basic Configuration

### Environment Config

Create a `.env` file in the root directory of the repository based on the `env.example` file.

Modify the following environment variables:

* `ROUTER_VERSION` - The version of the router to use (e.g. `v0.1.0`). See the [releases page](https://github.com/connext/nxtp/releases) for the latest released version.
* `ROUTER_EXTERNAL_PORT` - Exposed port of the router. Remember to not expose this port to the public.
* `GRAFANA_EXTERNAL_PORT` - Exposed port of the Grafana dashboard.

### Web3Signer Config

Set up [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) config files to set the private key securely.

### Router Config

Create a `config.json` file based on the `config.example.json` file. At minumum, change the following values:

- `adminToken` - A secret string for performing sensitive operations.
- `chainConfig` - Add your desired chains and provider URLs. NOTE: Make sure to add chain 1 (Ethereum mainnet) providers.
- `web3SignerUrl` - Set to `"http://signer:9000"`.
- `routerContractAddress` - Set to the address of the router contract, see the section below.
- `swapPools` - Change to desired assets.

See the [Configuration](../reference/configuration) section for more details.

## Deploying a Router Contract

On each chain you want to operate on you must deploy a router contract. This contract will control act as the router's "wallet" and allow relayers to send transactions on behalf of the router, for a fee.

You can deploy the router contract by going to the block explorer on the chain you want to deploy the router on, then using the Write Contract functionality of the explorer on the `RouterFactory` contract. Call the `createRouter` method on the `RouterFactory` contract with the following parameters:
- `routerSigner`: EOA address which corresponds to the router's configured signer. Will be the same on all chains.
- `recipient`: Address at which router will get funds back when it calls `removeLiquidity()`.
- `msg.sender`: Will be the owner of the Router Contract. This can be any EOA that you can keep secret, you will need to use it in case you want to change recipient or `removeRelayerFee` on Router.sol contract. For extra security, you can use the `setOwner()` function on the contract and set this address to the burn address to prevent anyone from changing the recipient.

The current router factory address on every chain is `0x73a37b3EB030cC3f9739CA5C16b7E6802F294122` and the contract is verified on every chain. If you have any issues/questions about this, please contact the Connext team! This process needs to be completed on all chains!

Make sure the Connext team is aware of your router contract address and EOA signer address in case anything needs whitelisting!

## Running the Router

Run the router with `docker-compose`.

```shell
$ docker-compose up -d
```

Test if it's working by querying the `/config` endpoint. Log into the host or the router container and run the following curl command:

```shell
# assumes ROUTER_EXTERNAL_PORT is 8000, on the container itself it will be 8000
$ curl localhost:8000/config
{"signerAddress":"0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a"}
```

## View Logs

Use docker commands to check logs of any of the running containers.

```shell
$ docker logs router
# or
$ docker logs --follow --tail 100 router
```

## Grafana Dashboard

The router runs a Grafana dashboard which is available at the on the configured `GRAFANA_EXTERNAL_PORT`.