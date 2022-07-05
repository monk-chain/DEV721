import { ethers } from "hardhat";

async function main() {
  const DEV721 = await ethers.getContractFactory("DEV721");
  const NFTcontract = await DEV721.deploy();

  await NFTcontract.deployed();
  console.log("DEV721 address:", NFTcontract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
