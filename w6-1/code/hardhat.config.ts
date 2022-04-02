import '@nomiclabs/hardhat-ethers'
import 'hardhat-watcher'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import { task } from 'hardhat/config'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const fs = require('fs');
// 助记词
const mnemonic = fs.readFileSync(".secret").toString().trim();




// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    compilers: [
      { version: "0.8.4" },
      { version: "0.7.6" },
      { version: "0.8.0" },
      { version: "0.6.12" }
    ]
  },
  networks:{
    dev: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
    },
    rinkeby:{
       url: "https://rinkeby.infura.io/v3/420062e291fb4d81998324326d036ec4",
       accounts:{
        mnemonic:mnemonic,
      },
      gas: 21000000,
      gasPrice: 8000000000
    }
  },
  watcher: {
    ci: {
      files: ["./contracts", "./test"],
      tasks: [
        { command: "compile", params: { quiet: true } },
        { command: "test", params: { noCompile: true } }
      ]
    }
  }
}

