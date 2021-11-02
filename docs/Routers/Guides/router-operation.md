---
sidebar_position: 4
---

# Router Operation and Procedures

Common procedures and operations for routers are described in this document.

## Shutting a Router Down

Routers _cannot_ be shut down anytime they desire. They must be shut down through a procedure. This is similar to ETH2 and other validator based systems where unexpected downtime can result in loss of funds. The procedure is as follows:

- Change the router [configuration](../Reference/configuration) to set `cleanupMode` to `true`.
- Restart the router with `docker-compose restart` or `docker-compose down` and then `docker-compose up -d`.
- Monitor logs with `docker logs --tail 100 --follow router` until you see a log containing 0 active transactions: `"transactions":0,"msg":"Got active transactions"}`.
- Now it is safe to turn off the router with `docker-compose down` or `docker-compose stop`.

## Updating Router Version

- Update the `.env` file in the root directory of the [docker-compose repo](https://github.com/connext/nxtp-router-docker-compose) with the desired version. Unless you really know what you are doing, choose releases from the [releases page](https://github.com/connext/nxtp/releases). The version number is the semantic version beginning with `v`.
- Update the key in the `.env` `ROUTER_VERSION` with the desired version.
- Run `docker-compose up -d` to update the router version without any downtime.