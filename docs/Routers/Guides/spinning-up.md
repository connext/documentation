---
sidebar_position: 2
---

# เริ่มต้นที่จะเป็น Router

TODO:

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

### Router Config

Create a `config.json` file based on the `config.example.json` file. At minumum, change the following values:

- `adminToken` - A secret string for performing sensitive operations.
- `chainConfig` - Add your desired chains and provider URLs.
- `mnemonic` - Use a unique and secret mnemonic.
- `swapPools` - Change to desired assets.

See the [Configuration](../Reference/configuration) section for more details.

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