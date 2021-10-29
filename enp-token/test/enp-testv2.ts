import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { takeCoverage } from "v8";

describe("Enthony Phil", async function () {
  it("Should upgrade previous smart contract successfully", async function () {
    const [owner] = await ethers.getSigners();
    const EnthonyPhil = await ethers.getContractFactory("EnthonyPhilToken");
    const EnthonyPhilV2 = await ethers.getContractFactory("EnthonyPhilTokenV2");

    const enp = await upgrades.deployProxy(EnthonyPhil);
    const enpV2 = await upgrades.upgradeProxy(enp.address, EnthonyPhilV2);
    await enpV2.deployed();

    expect(await enpV2.totalSupply()).to.equal(1000);
    expect(await enpV2.balanceOf(owner.getAddress())).to.equal(1000);
    expect(await enpV2.tokenPrice()).to.equal(ethers.utils.parseEther("0.000001"));

    const tx = await owner.sendTransaction({
      value: ethers.utils.parseEther("0.00001"),
      to: enpV2.address
    });
    await tx.wait();

    enpV2.on("BuyToken", (sender, tokenAmount, tokenPrice) => {
      expect(sender).to.equal(owner.getAddress());
      expect(tokenAmount).to.equal(10);
      expect(tokenPrice).to.equal(ethers.utils.parseEther("0.00001"));
    })
    expect(await enpV2.totalSupply()).to.equal(1010);
    expect(await enpV2.balanceOf(owner.getAddress())).to.equal(1010);
  });
});
