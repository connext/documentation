---
sidebar_position: 2
id: spinning-up
---
# Spinning Up

![image](https://user-images.githubusercontent.com/88688304/178145701-0447ede1-b90a-4d9a-ae0f-dd588a6b34e5.png)

## Checklist for Running a Router

- [Spin up the router](./spinning-up) and [configure](./Reference/configuration) for testnets.
- [Provide liquidity](./liquidity) and gas fees on testnets.
- Test the router on testnets.
- Change configuration to mainnets (use a different private key!), or spin up a new mainnet router.
- Provide liquidity on mainnets.
- Monitor router logs.

----
## :warning: Requirements
>**Minimum Hardware Requirements**<br/>
>:black_square_button: 8GB RAM<br/>
>:black_square_button: 30GB Storage<br/>

## Preparation
1. **Private key of your wallet** from Metamask.<br/>
For safety reason create a new wallet address for router.
You can create it in Metamask extention or get it automatically during installation.<br/>


2. **Setup provider endpoints.** You have to add it to `config.json` file to use your own endpoints.
For that we will use the nodes provided by the service [Infura](https://infura.io/). 
> You can use also [blastapi.io](https://blastapi.io) as RPC privider to get endpoints for almost any network ([the guide how to get it](https://medium.com/@alexzhurba/adding-rpcs-for-connext-36094191ae4f)). Many other RPC provider services exist as well.

  2.1 Register at [infura.io](https://infura.io/) and create new project:
  
  <img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812549-0cc07f55-abae-4ad4-9ede-6a9ba7d812ce.png"/>

<img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812576-f7d57b0f-b455-4cab-b6fb-8cdf48f148b8.png"/>

  2.2 Open settings:
  
  <img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812595-66f5557e-8fc3-42c8-a08e-82ff270bcab2.png"/>

  2.3 And copy your project ID. It will be the same on any network
  
  <img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812613-de163f51-3cd6-4a47-aeda-680d812e3b53.png"/>

**Keep this data handy, you will need it for further installation**

---
## Manual Setup With Docker Compose

Refer to [https://github.com/connext/router-docker-compose](https://github.com/connext/router-docker-compose) for instructions on spinning up using Docker Compose!

# #Next Steps
* See the [management guide](./Guides/management.md) for details on router administration.
* See the [liquidity guide](./Guides/liquidity) for details on how to add liquidity to your router.
* See the [security guide](./Reference/configuration) reference for details on the security for the router.

---
## Useful links
- How to deploy your router using helm — [Guide](https://github.com/connext/nxtp-router-helm/tree/amarok)<br/>
