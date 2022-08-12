---
sidebar_position: 2
---

# Spinning Up a Router

Note: This is an easy way to get started with the router. The router is fully Docker-based so it can be run in various configurations such as Kubernetes, AWS Elastic Container Service, or similar alternatives.

## Minimum Hardware Requirements

- 8GB RAM
- 30GB Storage
- Redis

## Required Software

- [ Docker CE (Community Edition) ](https://docs.docker.com/install/) version 20.10.5 or higher
- [ Docker Compose ](https://docs.docker.com/compose/install/) version 1.27.4 or higher

## Network Configuration

The router does not require any ports to be open for inbound access. 

:::danger
Do NOT expose the `ROUTER_EXTERNAL_PORT` to anyone untrusted! It should only be accessible by the operator in a trusted environment.
:::

## Cloning the Repository

To spin up a router, first clone the [`nxtp-router-docker-compose`](https://github.com/connext/nxtp-router-docker-compose) repository. Check out the `amarok` branch to use the new hardfork version.

```shell
$ git clone https://github.com/connext/nxtp-router-docker-compose.git
$ cd nxtp-router-docker-compose/
$ git checkout amarok
```

## Basic Configuration

### Environment Config

Create a `.env` file in the root directory of the repository based on the `env.example` file.

Modify the following environment variables:

* `ROUTER_VERSION` - The version of the router to use (e.g. `0.2.0-alpha.16`). See the [releases page](https://github.com/connext/nxtp/releases) for the latest released version.
* `ROUTER_EXTERNAL_PORT` - Exposed port of the router. Remember to not expose this port to the public.
* `GRAFANA_EXTERNAL_PORT` - Exposed port of the Grafana dashboard.
* `LOGDNA_KEY` - This key is used by logna container. You can get this key by sign up [here](https://app.logdna.com/)

### Redis Config

The router uses an internal Redis instance in Docker by default. However, if you prefer to use your external Redis instance, you can set the corresponding `host` and `port` field in `config.json`. Instructions can be found on the [Redis website](https://redis.io/).

### Web3Signer Config

Set up [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) config files to set the private key securely. Fill the private key of your signer to `key.example.yaml`.

### Router Config

Create a `config.json` file based on the `config.example.json` file. At minumum, change the following values:

- `sequencerUrl` - The URL of the Sequencer node.
- `redis` - The Redis instance to use.
- `server` - Internal HTTP server config (`adminToken`).
- `chains` - Add your desired chains, assets, and provider URLs. Use [`domain` mappings](https://docs.nomad.xyz/dev/domain-ids.html) instead of `chainIds`. For more domain ids of chains, please check https://raw.githubusercontent.com/connext/chaindata/main/crossChain.json . Make sure you use multiple providers for each chain! Example with the current testnet assets:
```json
{
  ...
  "chains": {
    "1111": {
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ],
      "providers": ["https://rinkeby.infura.io/v3/...", "https://rpc.ankr.com/eth_rinkeby"]
    },
    "2221": {
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ],
      "providers": ["https://kovan.infura.io/v3/..."]
    },
    "3331": {
      "providers": [
        "https://goerli.infura.io/v3/..."
      ],
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ]
    }
  }
}
```
- `web3SignerUrl` - Set to `"http://signer:9000"`.
- `redis`
  - `host` - Set to the host name of your external Redis instance.
  - `port` - Set to the port of your external Redis instance.

See the [Configuration](./Reference/configuration) section for more details.

## Running the Router

Run the router with `docker-compose`.

```shell
$ docker-compose up -d
```

Test if it's working by querying the `/config` endpoint. Log into the host or the router container and run the following curl command:

```shell
# assumes ROUTER_EXTERNAL_PORT is 8080, on the container itself it will be 8080
$ curl localhost:8080/config
{"signerAddress":"0x627306090abaB3A6e1400e9345bC60c78a8BEf57"}
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
