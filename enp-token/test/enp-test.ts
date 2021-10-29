import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Enthony Phil", async function () {
  it("Should mint 1000 tokens to the owner and set token price", async function () {
    const [owner] = await ethers.getSigners();
    const EnthonyPhil = await ethers.getContractFactory("EnthonyPhilToken");
    const enp = await upgrades.deployProxy(EnthonyPhil);
    await enp.deployed();

    expect(await enp.totalSupply()).to.equal(1000);
    expect(await enp.balanceOf(owner.getAddress())).to.equal(1000);
    expect(await enp.tokenPrice()).to.equal(ethers.utils.parseEther("0.000001"));
  });
});
