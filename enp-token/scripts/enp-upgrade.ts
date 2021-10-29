import { ethers, upgrades } from "hardhat";

const v1Addr = "0x7F8fE6d79C9db5EB7e95c6A790d63Dc5756e994D";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const EnthonyPhil = await ethers.getContractFactory("EnthonyPhilTokenV2");
  const token = await upgrades.upgradeProxy(v1Addr, EnthonyPhil);

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });