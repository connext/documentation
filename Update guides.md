# Guía de configuración del router

## Configuración del router Connext

[![LOGO](https://images.squarespace-cdn.com/content/v1/619f86b8de2c6f4f7fa201c0/8eaeca35-ccf3-495f-9e9a-19fbec796187/connext__Logo+%2B+WhiteText+MultiColor.png)](https://www.connext.network/)

### Vamos a empezar nuestra instalación

#### 1. Inicialmente hay que actualizar los paquetes e instalar Docker
```
sudo apt update && sudo apt upgrade -y
sudo apt-get install ca-certificates curl gnupg lsb-release -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### 2. A continuación, debe instalar docker-compose
```
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
sudo chown $USER /var/run/docker.sock
```
#### 2.1 Compruebe la versión con el comando
```
docker-compose --version
```

#### 3. Instalar el propio router
```
cd ~
git clone https://github.com/connext/nxtp-router-docker-compose.git
cd nxtp-router-docker-compose
git checkout amarok
```

#### 4. Preparar los archivos de claves y de configuración
```
mv .env.example .env
mv key.example.yaml key.yaml
```

#### En el archivo .env se debe especificar la versión actual (en el momento de escribir este artículo sha-0039612)

#### 5. Ahora tenemos que editar la configuración
```
nano config.toml
```

#### 5.1 Introduzcamos en ella nuestra frase mnemotécnica después de “redis”
```
{
  "logLevel": "debug",
  "sequencerUrl": "https://sequencer.testnet.connext.ninja",
  "web3SignerUrl": "http://signer:9000",
  "mnemonic": "frase mnemotécnica",
  "redis": {
    "host": "redis",
    "port": 6379
  },
  "server": {
    "adminToken": "abacus",
    "port": 8080
  },
  "chains": {
    "1111": {
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ],
      "providers": ["https://rinkeby.infura.io/v3/a0bd8cc79d5a4c6d9c02327769a18777"]
    },
    "2221": {
      "providers": ["https://kovan.infura.io/v3/a0bd8cc79d5a4c6d9c02327769a18777"],
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ]
    },
        "3331": {
      "providers": ["https://goerli.infura.io/v3/a0bd8cc79d5a4c6d9c02327769a18777"],
      "assets": [
        {
          "address": "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          "name": "TEST"
        }
      ]
    }
  }
}
```

#### 6. Después, lanzamos nuestro contenedor
```
cd ~/nxtp-router-docker-compose
docker-compose create
docker-compose up -d
```

#### 7. Vaya al enlace https://testnet.amarok.connextscan.io/router/<dirección de la cartera>.
![Image text](https://github.com/VArt03/documentation/blob/0418fe5be8ef0213207229266e78a5774354cb9f/ocr%20(1).jpg)

#### Haga clic en Manage Router y añada cualquier número de fichas de prueba en cada red utilizando [el grifo](https://amarok-testnet.coinhippo.io/)
