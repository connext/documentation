![image](https://user-images.githubusercontent.com/88688304/178145701-0447ede1-b90a-4d9a-ae0f-dd588a6b34e5.png)
# Spinning up NXTP Router full version guide.
## Automatic script, manual installing commands, liquidity providing.

#### What is in:
+ Using the automatic script you can spin up a router from scratch or upgrade to the latest or another one version you like to. 
<img width="700" alt="image" src="https://user-images.githubusercontent.com/88688304/178146039-058cacdc-13cb-4bc1-83b8-9ab65dbb4b2a.png"/>

| №           | Menu | Detail | 
| ------------ | :--------: | :--------: | 
| 1            | Install + Auto PKey | Automatic setup router and generate private key| 
| 2            | Install + Your PKey | Automatic setup router with your private key | 
| 3            | Auto Upgrade | Auto upgrade router to the latest released version | 
| 4            | Manual Upgrade | Manual upgrade router version |  
| 5            | Backup PKey | Backup and show your private key | 
| 6            | Delete | Delete Router and everything relating to it |  
| 7            | Check Version | Checking latest released Router version, latest docker image and your current version | 
| 8            | Quit | Quit on menu | 

+ Using manual installing commands you can understand exactly how the installation process step by step works.
+ You will know what to do next when the installation is complete. Add liquidity to your router and take part in the testnet.

----
## :warning: Preparation
>**Minimum Hardware Requirements**<br/>
>:black_square_button: 8GB RAM<br/>
>:black_square_button: 30GB Storage<br/>

1. **Private key of your wallet** from Metamask.<br/>
For safety reason create a new wallet address for router.
You can create it in Metamask extention or get it automatically during installation.<br/>


2. **Setup provider endpoints.** You have to add it to `config.json` file to use your own endpoints.
For that we will use the nodes provided by the service [Infura](https://infura.io/). 
> You can use also [blastapi.io](blastapi.io) as RPC privider to get endpoints for almost any network ([the guide how to get it](https://medium.com/@alexzhurba/adding-rpcs-for-connext-36094191ae4f)).

  2.1 Register at [infura.io](https://infura.io/) and create new project:
  
  <img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812549-0cc07f55-abae-4ad4-9ede-6a9ba7d812ce.png">

<img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812576-f7d57b0f-b455-4cab-b6fb-8cdf48f148b8.png">

  2.2 Open settings:
  
  <img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812595-66f5557e-8fc3-42c8-a08e-82ff270bcab2.png">

  2.3 And copy your project ID. It will be the same on any network
  
  <img width="1000" alt="screenshot" src="https://user-images.githubusercontent.com/88688304/170812613-de163f51-3cd6-4a47-aeda-680d812e3b53.png">

**Keep this data handy, you will need it for further installation**

# Quick router setup
Copy and paste this code to run script in your terminal.<br/>
> Select install menu to setup Router and follow instructions.
> During the installation you will need to insert the private key from Metamask (not your public address), and the project ID from Infura.
```
wget -q -O nxtp-router.sh https://raw.githubusercontent.com/martynovalek/NXTP-Router-setup/main/Full%20version/nxtp-setup.sh && chmod +x nxtp-router.sh && . <(wget -qO- https://raw.githubusercontent.com/SecorD0/utils/main/miscellaneous/insert_variable.sh) -n router_menu -v "cd $HOME; sudo /bin/bash nxtp-router.sh" -a && router_menu
```
The script will add a command to the system to view the logs as a variable.<br/>
- To **view logs** use `router_log`
- To **open menu** use `router_menu`

---
# Manual install

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
git clone https://github.com/connext/nxtp-router-docker-compose.git
cd $HOME/connext/nxtp-router-docker-compose
git checkout amarok
```

**Get and pull the latest released Router version**
```
LATEST="$(curl -fsSLI -o /dev/null -w %{url_effective} https://github.com/connext/nxtp/releases/latest | awk 'BEGIN{FS="v"} {print $2}')" && echo $LATEST
docker pull ghcr.io/connext/router:$LATEST
```

**4. Setup `.env` file**
```
cp .env.example .env
sed -i 's/latest/'$LATEST'/g' .env
```

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
```
wget -O config.json https://raw.githubusercontent.com/martynovalek/NXTP-Router-setup/main/Full%20version/config.json
```

**Run this command and paste your Project ID from Infura**
```
read -p "Insert your Project ID from Infura: " PROJECT_ID
```
```
sed -i 's/project_ID/'${PROJECT_ID}'/g' $HOME/connext/nxtp-router-docker-compose/config.json
```

**7. Run your Router**<br/>
```
cd $HOME/connext/nxtp-router-docker-compose
docker-compose down
docker-compose up -d
```

**Check logs:**
```
cd $HOME/connext/nxtp-router-docker-compose
docker logs --follow --tail 100 router
```

Now you can check data of your provider at infura.io
<img width="1000" alt="screenshot_infura" src="https://user-images.githubusercontent.com/88688304/170814579-3c421ab0-3ff4-4b7a-8715-b131f2ea7c2e.png"/>


## Usefull commands
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
cd ~/connext/nxtp-router-docker-compose
docker-compose down
docker system prune -a
cd && rm -rf $HOME/connext
```
---
## Update Router Version:<br/>
You can check the latest version here: https://github.com/connext/nxtp/releases

**Check current version of Router:**<br/>
The output will show you which current version
```
CURRENT=$(cat $HOME/connext/nxtp-router-docker-compose/.env | grep ROUTER_VERSION | awk -F '=' '{print$2}') && echo $CURRENT
```

**Check new version of Router:**<br/>
The output will show you which new version
```
NEW="$(curl -fsSLI -o /dev/null -w %{url_effective} https://github.com/connext/nxtp/releases/latest | awk 'BEGIN{FS="v"} {print $2}')" && echo $NEW
```

**If you need to update run the commands below:**<br/>
Modify the `.env` file:
```
sed -i.bak -e "s/$CURRENT/$NEW/" $HOME/connext/nxtp-router-docker-compose/.env
```

**Ensure `.env` file has a new version:**
```
cat $HOME/connext/nxtp-router-docker-compose/.env | grep ROUTER_VERSION | awk -F '=' '{print$2}'
```

**Now update the stack and check logs:**
```
cd $HOME/connext/nxtp-router-docker-compose
docker-compose down
docker-compose pull
docker-compose up -d
docker logs --follow --tail 100 router
```
---

# Liquidity and testnet
Now we have to add liquidity on 3 test chains to our Router and make some transactions.

1. Go to https://amarok-testnet.coinhippo.io/ and connect wallet you have linked to your Router.
2. Under the form you'll see the Faucet. Get 1000 $TEST on each chain.
<img width="550" alt="faucet" src="https://user-images.githubusercontent.com/88688304/178159703-d72e7269-c13c-464b-ac5b-5946a826ec6f.png"><br/>
3. Go to https://testnet.amarok.connextscan.io/router/ROUTER_ADDR (paste your router address at the end of the link)<br/>
4. Select `manage router` and add some tokens to liquidity. Keep some tokens on your wallet balance to send a few transactions<br/>
   <img height="350" alt="image" src="https://user-images.githubusercontent.com/88688304/178160096-125d8b0c-fb20-4597-adce-627ddfe07c2b.png"> <img height="350" alt="image" src="https://user-images.githubusercontent.com/88688304/178160123-76b140c6-2a46-466a-b0b1-bfe21a2c00f3.png">
5. Go to https://amarok-testnet.coinhippo.io/ again and make some transactions.
6. The transactions takes usually 2-3 minutes. Sometimes it can takes much more time. Please give your feedback on discord channel [#testnet-feedback](https://discord.com/channels/454734546869551114/991374224293908562)
