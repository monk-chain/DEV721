import { ethers } from "hardhat";

async function main() {
  const DevNFT = await ethers.getContractFactory("DevNFT");
  const NFTcontract = await DevNFT.deploy(
    "DevNFT",
    "DEV",
    "https://gateway.pinata.cloud/ipfs/Qme6pso8pJi2FEge6K5nCFHLysnkimprdhnwwHYVcVfJbh/",
    "https://gateway.pinata.cloud/ipfs/QmY3rrWQC43EMXERrcyE5y4uMqTDMc8zxuaTCw87rWCAKq",
    10
  );

  await NFTcontract.deployed();
  console.log("NFT address:", NFTcontract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
