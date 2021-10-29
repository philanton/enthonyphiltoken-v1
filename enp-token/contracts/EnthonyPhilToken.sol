// contracts/ENPToken.sol
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "hardhat/console.sol";

contract EnthonyPhilToken is ERC20Upgradeable {
    uint public tokenPrice;

    function initialize() initializer public {
        __ERC20_init("EnthonyPhil", "ENP");
        _mint(msg.sender, 1000);
        tokenPrice = 0.000001 ether;
    }
}
