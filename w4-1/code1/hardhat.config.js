require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

 
const fs = require('fs');
// 助记词
const mnemonic = fs.readFileSync(".secret").toString().trim();



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  networks:{
    dev :{
      url :"http://127.0.0.1:8545",
      chainId:31337,
    },
    rinkeby:{
      url: "https://rinkeby.infura.io/v3/420062e291fb4d81998324326d036ec4",
      chainId:4,
      accounts:{
       mnemonic:mnemonic,
     },
     
  },
  ropsten:{
    url: "https://ropsten.infura.io/v3/18c8ae876f7f46e881287af88b7bee80",
    chainId:3,
    accounts:{
     mnemonic:mnemonic,
   }
 }
}

};
