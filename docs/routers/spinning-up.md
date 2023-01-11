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
- [Monitor router logs](./spinning-up#view-logs).

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
# Manual Setup

Refer to [https://github.com/connext/router-docker-compose](https://github.com/connext/router-docker-compose) for source code and more info!

**1. Update and install packages**
```
sudo apt update && sudo apt upgrade -y
apt install git sudo unzip wget curl -y
```

**2. Install Docker and Docker-compose latest version**
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh
```
```
DOCKER_VER="$(curl -fsSLI -o /dev/null -w %{url_effective} https://github.com/docker/compose/releases/latest | awk 'BEGIN{FS="v"} {print $2}')"
```
```
curl -SL https://github.com/docker/compose/releases/download/v$DOCKER_VER/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

**3. Install Router**
```
cd $HOME
mkdir -p connext && cd connext
git clone https://github.com/connext/router-docker-compose.git
cd $HOME/connext/router-docker-compose
```

**Get and pull the latest released Router version**
> The latest router version will be posted in the Connext `routers` Discord channel. Please contact a team member if you are not part of this channel.

***
## :warning: Basic configuration
<details><summary>Read more about configuration files...</summary>

### Network Configuration

The router does not require any ports to be open for inbound access.

:::danger
Do NOT expose the `ROUTER_EXTERNAL_PORT` to anyone untrusted! It should only be accessible by the operator in a trusted environment.
:::

### Environment Config

Create a `.env` file in the root directory of the repository based on the `env.example` file.

Modify the following environment variables:

* `ROUTER_VERSION` - The version of the router to use (e.g. `sha-a1b8465`). See the `routers` private channel in the Connext Discord for the latest release. DO NOT USE `latest` tag as this is experimental code!
* `ROUTER_EXTERNAL_PORT` - Exposed port of the router. Remember to not expose this port to the public.
* `GRAFANA_EXTERNAL_PORT` - Exposed port of the Grafana dashboard.
* `LOGDNA_KEY` - This key is used by logna container. You can get this key by sign up [here](https://app.logdna.com/)

### Redis Config

The router uses an internal Redis instance in Docker by default. However, if you prefer to use your external Redis instance, you can set the corresponding `host` and `port` field in `config.json`. Instructions can be found on the [Redis website](https://redis.io/).

### Web3Signer Config

Set up [Web3Signer](https://docs.web3signer.consensys.net/en/latest/) config files to set the private key securely. Create a key.yaml file based on the key.example.yaml file. Fill the private key of your signer to `key.yaml`.

### Router Config

Create a `config.json` file based on the `config.example.json` file. At minumum, change or confirm the following values:

- `server`
  - `adminToken` - Secret token to make sensitive HTTP requests.
- `web3SignerUrl` - Set to `"http://signer:9000"`.
- `redis`
  - `host` - Set to `redis`.
  - `port` - Set to 6379.
- `messageQueue`
  - `uri` - Set to "amqp://guest:guest@rabbitmq:5672"
- `logLevel` - One of `debug`, `info`, `warn`, `error` for log verbosity.
- `network` - Set to `mainnet` or `testnet`.
- `environment` - Not required for mainnet, set to `production` for testnet.
- `chains` - Add your desired chains, assets, and provider URLs. Use [Domain IDs](./developers/testing-against-testnet#domain-ids). instead of `chainIds`. For more domain ids of chains, please check https://raw.githubusercontent.com/connext/chaindata/main/crossChain.json . Make sure you use multiple providers for each chain! The assets addresses should match the Connext bridge minted assets, which are NOT the normal addresses you would use. Example with the current mainnet assets:
```json
{
  ...
  "chains": {
    "1634886255": {
      "assets": [
        {
          "address": "0x85fb8e2903ad92a2ab0c6a725806636666ee2ab4",
          "name": "USDC"
        },
        {
          "address": "0xfd5c16a50b717338cbcb44e34e10d735709e9cb9",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://arb-mainnet.g.alchemy.com/v2/...",
        "https://rpc.ankr.com/arbitrum"
      ]
    },
    "1869640809": {
      "assets": [
        {
          "address": "0x85FB8e2903Ad92A2ab0C6a725806636666ee2Ab4",
          "name": "USDC"
        },
        {
          "address": "0xfD5C16a50b717338Cbcb44e34e10d735709E9Cb9",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://opt-mainnet.g.alchemy.com/v2/...",
        "https://rpc.ankr.com/optimism"
      ]
    },
    "1886350457": {
      "assets": [
        {
          "address": "0x2ABe2d4F09ea3124DE56AD91ae0950A3B71eCD11",
          "name": "USDC"
        },
        {
          "address": "0x2BD5B3cfB2b16F2B10e7BA41dc1cb93d61B36bB8",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://polygon-mainnet.g.alchemy.com/v2/...",
        "https://rpc.ankr.com/polygon"
      ]
    },
    "6450786": {
      "assets": [
        {
          "address": "0xe4f1ce2dc807084a874e957d5d2ac6502820bc15",
          "name": "USDC"
        },
        {
          "address": "0x6b205aeaae9de574d76d4e45af92998aefca205b",
          "name": "WETH"
        }
      ],
      "providers": [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://rpc.ankr.com/bsc"
      ]
    },
    "6648936": {
      "assets": [
        {
          "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          "name": "USDC"
        },
        {
          "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "name": "WETH"
        }
      ],
      "providers": ["https://eth-mainnet.alchemyapi.io/v2/...", "https://rpc.ankr.com/eth"]
    },
    "6778479": {
      "assets": [
        {
          "address": "0x67e79CC8d6b7C164Da28864875242b9210BFeb15",
          "name": "USDC"
        },
        {
          "address": "0x735c7e2035ff902EC8F7115355191Cabb05D86fd",
          "name": "WETH"
        }
      ],
      "providers": ["https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis"]
    }
  }
}
```

See the [Configuration](./Reference/configuration) section for more details.
  
</details>

***


**4. Setup `.env` file**
```
cp .env.example .env
```
Change or confirm the `ROUTER_VERSION` at minimum.

**5. Setup `key.yaml` file**
```
cp key.example.yaml key.yaml
```
**Run this command and paste your private key from Metamask**
```
read -p "Insert your Private Key from Metamask: " yourpk
```
```
sed -i 's/dkadkjasjdlkasdladadasda/'${yourpk}'/g' key.yaml
```

**6. Setup `config.json` file.**
See above.

**Run this command and paste your Project ID from Infura**
```
read -p "Insert your Project ID from Infura: " PROJECT_ID
```
```
sed -i 's/project_ID/'${PROJECT_ID}'/g' $HOME/connext/router-docker-compose/config.json
```

**7. Run your Router**<br/>
```
cd $HOME/connext/router-docker-compose
docker-compose down
docker-compose up -d
```

**Check logs:**
```
cd $HOME/connext/router-docker-compose
docker logs --follow --tail 100 router
```

Now you can check data of your provider at infura.io
<img width="1000" alt="screenshot_infura" src="https://user-images.githubusercontent.com/88688304/170814579-3c421ab0-3ff4-4b7a-8715-b131f2ea7c2e.png"/>


## Useful commands

#### Open Router menu:
```
router_menu
```
#### Check logs:
Add this command as variable:
```
. <(wget -qO- https://raw.githubusercontent.com/SecorD0/utils/main/miscellaneous/insert_variable.sh) -n router_log -v "docker logs --follow --tail 100 router" -a
```
Check logs:
```
router_log
```

#### Restart Docker containers:
```
cd $HOME/connext/nxtp-router-docker-compose
docker-compose restart
```

#### Stop all running Docker containers:
```
docker stop $(docker ps -a -q)
```

#### Restart Docker deamon:
```
sudo systemctl restart docker
sudo systemctl status docker
```

#### Delete Router and everything relating to it:
```
cd ~/connext/router-docker-compose
docker-compose down
docker system prune -a
cd && rm -rf $HOME/connext
```
---
## Update Router Version:<br/>
**Check current version of Router:**<br/>
The output will show you which current version
```
CURRENT=$(cat $HOME/connext/router-docker-compose/.env | grep ROUTER_VERSION | awk -F '=' '{print$2}') && echo $CURRENT
```

**If you need to update run the commands below:**<br/>
Modify the `.env` file:
```
sed -i.bak -e "s/$CURRENT/$NEW/" $HOME/connext/router-docker-compose/.env
```

**Ensure `.env` file has a new version:**
```
cat $HOME/connext/router-docker-compose/.env | grep ROUTER_VERSION | awk -F '=' '{print$2}'
```

**Now update the stack and check logs:**
```
cd $HOME/connext/router-docker-compose
docker-compose down
docker-compose pull
docker-compose up -d
docker logs --follow --tail 100 router
```
---

## Next Steps
* See the [management guide](./Guides/management.md) for details on router administration.
* See the [liquidity guide](./Guides/liquidity) for details on how to add liquidity to your router.
* See the [security guide](./Reference/configuration) reference for details on the security for the router.

---
## Useful links
- How to deploy your router using helm — [Guide](https://github.com/connext/nxtp-router-helm/tree/amarok)<br/>
