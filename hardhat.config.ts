import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";

import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const {
  POLYGONSCAN_API_KEY,
  ETHERSCAN_API_KEY,
  PRIVATE_KEY,
  RINKEBY_URL,
  MUMBAI_URL,
} = process.env;

const rinkeby: NetworkUserConfig = {
  url: RINKEBY_URL!,
  chainId: 4,
  accounts: [PRIVATE_KEY!],
};

const mumbai: NetworkUserConfig = {
  url: MUMBAI_URL!,
  chainId: 80001,
  accounts: [PRIVATE_KEY!],
};

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    rinkeby: rinkeby,
    mumbai: mumbai,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY!,
      polygonMumbai: POLYGONSCAN_API_KEY!,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
