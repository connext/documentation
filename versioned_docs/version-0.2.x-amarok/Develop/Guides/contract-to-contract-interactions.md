---
sidebar_position: 3
---

# Interacting from a Contract

It is possible to initiate an `xcall` from a smart contract. This allows Connext to be used as a base cross-chain layer that can be integrated into DeFi applications. For example, one can write a contract to swap on Uniswap or SushiSwap and directly transfer the received tokens across chains.

```
pragma solidity ^0.8.10;

import {IConnext} from "nxtp/interfaces/IConnext.sol";
import {ERC20} from "@solmate/tokens/ERC20.sol";

/**
 * @title XDomainTransfer
 * @notice Example of a cross-domain transfer.
 */
contract XDomainTransfer {
  event TransferInitiated(address asset, address from, address to);

  IConnext public immutable connext;

  constructor(IConnext _connext) {
    connext = _connext;
  }

  /**
  * Simple transfer of funds.
  * @notice This simple example is not terribly useful in practice but it demonstrates  
  *         how to use `xcall` to transfer funds from a user on one chain to a receiving  
  *         address on another.
  * @dev For list of Nomad Domain IDs, see: https://docs.nomad.xyz/bridge/domains.html
  */
  function transfer(
    address to,
    address asset,
    uint32 originDomain,
    uint32 destinationDomain,
    uint256 amount
  ) external {
    ERC20 token = ERC20(asset);
    require(token.allowance(msg.sender, address(this)) >= amount, "User must approve amount");

    // User sends funds to this contract
    token.transferFrom(msg.sender, address(this), amount);

    // This contract approves transfer to Connext
    token.approve(address(connext), amount);

    // Empty callData because this is a simple transfer of funds
    IConnext.CallParams memory callParams = IConnext.CallParams({
      to: to,
      callData: "",
      originDomain: originDomain,
      destinationDomain: destinationDomain
    });

    IConnext.XCallArgs memory xcallArgs = IConnext.XCallArgs({
      params: callParams,
      transactingAssetId: asset,
      amount: amount
    });

    connext.xcall(xcallArgs);

    emit TransferInitiated(asset, msg.sender, to);
  }
}
```

More contract-to-contract interaction examples can be found in the [xapp-starter](https://github.com/connext/xapp-starter/) repo.
