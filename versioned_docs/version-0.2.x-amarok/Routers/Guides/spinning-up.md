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
$ git checkout amarok
```

## Basic Configuration

### Environment Config

Create a `.env` file in the root directory of the repository based on the `env.example` file.

Modify the following environment variables:

* `ROUTER_VERSION` - The version of the router to use (e.g. `v0.1.0`). See the [releases page](https://github.com/connext/nxtp/releases) for the latest released version.
* `ROUTER_EXTERNAL_PORT` - Exposed port of the router. Remember to not expose this port to the public.
* `GRAFANA_EXTERNAL_PORT` - Exposed port of the Grafana dashboard.

### Redis Config

The router requires an external Redis instance to be available. Instructions can be found on the [Redis website](https://redis.io/). Advanced users can add Redis to their docker-compose configuration.

### Web3Signer Config

Set up [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) config files to set the private key securely.

### Router Config

Create a `config.json` file based on the `config.example.json` file. At minumum, change the following values:

- `server`
  - `adminToken` - A secret string to secure the REST API sensitive operations.
- `chains` - Add your desired chains, assets, and provider URLs. Use [`domain` mappings](https://docs.nomad.xyz/dev/domain-ids.html) instead of `chainIds`. Make sure you use multiple providers for each chain! Example with the correct testnet assets.:
```json
{
  ...
  "chains": {
    "2000": {
      "assets": [
        {
          "address": "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2",
          "name": "TEST"
        }
      ],
      "providers": ["https://rinkeby.infura.io/v3/...", "https://rpc.ankr.com/eth_rinkeby"]
    },
    "3000": {
      "assets": [
        {
          "address": "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
          "name": "TEST"
        }
      ],
      "providers": ["https://kovan.infura.io/v3/..."]
    }
  }
}
```
- `web3SignerUrl` - Set to `"http://signer:9000"`.
- `redis`
  - `host` - Set to the host name of your external Redis instance.
  - `port` - Set to the port of your external Redis instance.

See the [Configuration](../Reference/configuration) section for more details.

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