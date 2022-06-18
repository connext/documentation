---
sidebar_position: 1
---

# Checklist for Running a Router

- [Spin up the router](./spinning-up) and [configure](./configuration) for testnets.
- [Provide Liquidity](./providing-liquidity) and gas fees on testnets.
- Test the router on testnets.
- Change configuration to mainnets (use a different mnemonic!), or spin up a new mainnet router.
- Provide liquidity on mainnets.
- [Monitor router logs](./spinning-up#view-logs) and [Grafana](./spinning-up#grafana-dashboard).
- Make sure to fill with gas when it's low!.

## Who are Routers ?
The routers are the important part of Connext protocol because they help to provide liquidity and transter your asset to the other chain.

> For example; if you want to send 100 USDC from Polygon to Arbitrum, you deposit 100 USDC into a contract with the router on Polygon. It means you send it to in-chain router that receive a transfer to the router on Arbitrum.

## Why do we need the Routers in Conntext
- Routers will provide their funds on destination chain

## Security Assumptions and Risks
- Risks
  - Seqencer downtime (Connext's team will improve soon)
  - funds delayed because xApp disconnection
  - Comnpromised router private key