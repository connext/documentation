---
sidebar_position: 3
---

# Get some native assets in testnet
You need to get some testnet native assets for creating and operating as a router.

[Here](https://cryptodevhub.io/wiki/ethereum-virtual-machine-testnet-faucets) link to available faucets

# Providing Liquidity

Deprecated: In order to provide liquidity, the router must be whitelisted by the Connext admins. Please contact the team to be whitelisted.

Once this is done, follow the following steps using the block explorer for the desired chain:

- Acquire assets by calling `Mint` function for providing liquidity (assets are listed in [testnet](../developers/testing-against-testnet.md#test-token-test) or mainnet (COMING SOON)).
- Approve tokens for the Connext.sol contract address.
- Call the function `addLiquidityFor` on the Connext.sol contract using your router address and the asset address as `local`.

You can use `Add liquidity UI` for adding liquidity: `https://testnet.amarok.connextscan.io/router/<YOUR_ROUTER_ADDRESS>`

Another way to provide liqudity is to use script:

```
from web3 import Web3
import argparse

#AddLiquidty function hex
smartcontract_method="0xe070da09"
#https://rpc.info
chain_dict = {
                "rinkeby": { "rpc": "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "connext_smart_contract": "0x979588965099F4DEA3CAd850d67ca3356284591e", "token_asset": "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C"},
                "kovan": { "rpc": "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "connext_smart_contract": "0x71a52104739064bc35bED4Fc3ba8D9Fb2a84767f", "token_asset": "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"},
                "goerli": { "rpc": "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "connext_smart_contract": "0xDc495507b830E5D1d8C073D4B12D144e76100816", "token_asset": "0xD426e23A6a9524101CDC017e01dDc3262B7aA65D" }
               }

def construct_txn_data(method, amount, asset_id, router_address):
    amount = str(hex(amount*1000000000000000000)[2:])
    while len(amount) < 64:
       amount = "0"+amount
    asset_id = "000000000000000000000000" + asset_id[2:]
    router_address = "000000000000000000000000" + router_address[2:]
    data = method+amount+asset_id+router_address
    return data.lower()

def create_txn(data, mnemonic, rpc_url, smart_contract, router_address):
    web3 = Web3(Web3.HTTPProvider(rpc_url))
    web3.eth.account.enable_unaudited_hdwallet_features()
    account = web3.eth.account.from_mnemonic(mnemonic, account_path="m/44'/60'/0'/0/0")
    private_key1 = account.key

    #build a transaction in a dictionary
    nonce = web3.eth.getTransactionCount(router_address)
    chainId = web3.eth.chain_id
    tx = {
        'nonce': nonce,
        'chainId': chainId,
        'to': smart_contract,
        'data': data,
        'gas': 2000000,
        'gasPrice': web3.toWei('50', 'gwei')
    }

    #sign the transaction
    signed_tx = web3.eth.account.sign_transaction(tx, private_key1)

    #send transaction
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)

    #get transaction hash
    return web3.toHex(tx_hash)

parser = argparse.ArgumentParser(description='Provide --network, --router_address, --amount  and --mnemonic')
parser.add_argument('--network', type=str, required = True,
                    help='testnet network can be rinkeby,goerli,kovan')
parser.add_argument('--router_address', type=str, required = True,
                    help='router address')
parser.add_argument('--mnemonic', type=str, required = True,
                    help='router mnemonic in ""')
parser.add_argument('--amount', type=int, required = True,
                    help='amount of Test tokens to stake without decimals')
args = parser.parse_args()

data = construct_txn_data(smartcontract_method,args.amount,chain_dict[args.network]["token_asset"],args.router_address)
print("TNX hash is: " + create_txn(data, args.mnemonic, chain_dict[args.network]["rpc"], chain_dict[args.network]["connext_smart_contract"], args.router_address))
```

Before running install `web3` using `pip`

`pip3 install web3`

Example of running script

`python3 add_liquidity.py --network rinkeby --mnemonic "test test test test" --router_address 0xA59057F7B69d68e6DfbfbBEb6821Bd1512424A81 --amount 20`
