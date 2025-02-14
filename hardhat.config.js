/* eslint-disable quotes */
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
    },
    moralis-test: {
      url: "https://eb4ejfe7kz43.usemoralis.com:2053/server",
      chainId: "43113",
      accounts: [""]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.5.5",
      },
      {
        version: "0.6.12",
      },
    ],
  },
};
