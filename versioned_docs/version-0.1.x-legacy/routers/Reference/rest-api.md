---
sidebar_position: 1
---

# REST API

The router contains a REST API that can be used to query information as well as perform sensitive tasks. The API is available at the router's IP address and at the `ROUTER_EXTERNAL_PORT` in the `.env` file.

:::danger
As described in the [Spinning Up](../Guides/spinning-up) section, do NOT expose this API to the internet. The queries in this document must be done from a trusted environment, i.e. inside a VPC or directly on the router host machine.
:::

We have examples for the requests in the [NXTP repository](https://github.com/connext/nxtp/blob/main/packages/router/example.http).

## Endpoints

### GET /ping

Pings the router.

#### Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="curl"
  values={[
    { label: 'cURL', value: 'curl', },
  ]
}>
<TabItem value="curl">

```shell
curl -X GET http://ROUTER_EXTERNAL_IP:ROUTER_EXTERNAL_PORT/ping
```

</TabItem>
</Tabs>

#### Example Response

```
pong
```

### GET /config

Gets the router's config.

#### Example Request

<Tabs
  defaultValue="curl"
  values={[
    { label: 'cURL', value: 'curl', },
  ]
}>
<TabItem value="curl">

```shell
curl -X GET http://ROUTER_EXTERNAL_IP:ROUTER_EXTERNAL_PORT/config
```

</TabItem>
</Tabs>

#### Example Response

```json
{"signerAddress":"0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1"}
```

### POST /remove-liquidity

Remove's router's liquidity.

#### Request Body

- `adminToken`: The admin token.
- `chainId`: ChainId to remove liquidity from.
- `assetId`: AssetId of the asset to remove liquidity from.
- `amount`: Amount in true units to remove.
- `recipientAddress`: Address to send the removed liquidity to.

#### Example Request

<Tabs
  defaultValue="curl"
  values={[
    { label: 'cURL', value: 'curl', },
  ]
}>
<TabItem value="curl">

```shell
curl --request POST \
  --url http://ROUTER_EXTERNAL_IP:ROUTER_EXTERNAL_PORT/remove-liquidity \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"adminToken": "blahblah","chainId": "100","assetId": "0x0000000000000000000000000000000000000000","amount": "1000000000000000000","recipientAddress": "0x5A9e792143bf2708b4765C144451dCa54f559a19"}'
```

</TabItem>
</Tabs>

#### Example Response

```json
{"transactionHash":"0x76ed04081dc333c51575b0123459e46d8e7d85563b28b16da78e2597aada4791"}
```

### POST /cancel-sender

Manually cancels sender's transaction.

:::danger

This is a dangerous operation. If you cancel the sender side transaction and the router has prepared (or is in the process of preparing) the receiving side transaction, the router will lose funds.

:::

#### Request Body

- `adminToken`: The admin token.
- `senderChainId`: The sender chainId to cancel the transaction on.
- `transactionId`: The assetId from transaction to cancel.
- `user`: The user's address.

#### Example Request

<Tabs
  defaultValue="curl"
  values={[
    { label: 'cURL', value: 'curl', },
  ]
}>
<TabItem value="curl">

```shell
curl --request POST \
  --url http://ROUTER_EXTERNAL_IP:ROUTER_EXTERNAL_PORT/cancel-sender \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"adminToken": "blahblah","transactionId": "0x76ed04081dc333c51575bf785389e46d8e7d85563b28b16da78e2597aada4791","senderChainId": 137,"user": "0xf4cf09a03f2d9e3b86105d043dd7c45de9d9753c"}'
```

</TabItem>
</Tabs>

#### Example Response

```json
{"transactionHash":"0x76ed04081dc333c51575b0123459e46d8e7d85563b28b16da78e2597aada4791"}
```