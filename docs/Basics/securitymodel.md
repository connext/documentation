# Security Model

:::note

We assume below that you already have read the [How it works](./howitworks) section.

:::

In general, Connext adopts the same core security model as other locking systems such as HTLCs. Unlike other systems, Connext is less vulnerable to free options as all interactions across chains are with 1:1 assets (e.g. ETH on Optimism to ETH on Arbitrum).

## Risks

### Loss of Funds

Barring the possibility of a hack or user error, there is **no** way for users to lose funds in this system. Users' transfers will either be immediately routed through "fast liquidity" to the destination chain or will be subject to the 30-minute "slow liquidity" mechanism via Nomad.