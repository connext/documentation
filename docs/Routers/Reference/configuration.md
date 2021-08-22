---
sidebar_position: 1
---

# Configuration

The router is accepts configuration using the config file `config.json` in the root directory of the [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose).

The JSON schema accepts the following keys:

* `adminToken` (_String_, required): Secret token used to authenticate admin requests.