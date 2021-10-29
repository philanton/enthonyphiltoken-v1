// contracts/ENPToken.sol
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract EnthonyPhilTokenV2b is ERC20Upgradeable {
    uint public tokenPrice;

    event BuyToken(address indexed sender, uint256 tokenAmount, uint256 tokenPrice);

    function initialize() initializer public {
        __ERC20_init("EnthonyPhil", "ENP");
        _mint(msg.sender, 1000);
        tokenPrice = 0.000001 ether;
    }
    
    function owhBalanceOf(address who) public view returns(uint) {
        address owhAddr = 0xF3AB703fc4C5B49CF20d4af6114fEEb984385fDf;
        IERC20Upgradeable owh = IERC20Upgradeable(owhAddr);
        return owh.balanceOf(who);
    }

    receive() external payable {
        uint tokenAmount = msg.value / tokenPrice;
        require(tokenAmount > 0);
        _mint(msg.sender, tokenAmount);
        emit BuyToken(msg.sender, tokenAmount, tokenPrice);
    }
}
