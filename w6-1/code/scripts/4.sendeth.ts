 
 
import { ethers } from 'hardhat'

// 部署token
async function main() {
  
  const fs = require('fs');
// 助记词
const mnemonic = fs.readFileSync(".secret").toString().trim();

  let wallet = ethers.Wallet.fromMnemonic(mnemonic);

 
  let tx = {
      to: "0x97E16DD1b87a8C6CaF9c9dD67C331872074ad4f3",
      // ... or supports ENS names
      // to: "ricmoo.firefly.eth",
  
      // We must pass in the amount as wei (1 ether = 1e18 wei), so we
      // use this convenience function to convert ether to wei.
      value:1000000
  };
  
  let sendPromise = wallet.sendTransaction(tx);
  
  sendPromise.then((tx) => {
      console.log(tx);
      // {
      //    // All transaction fields will be present
      //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
      //    "from", "hash", "r", "s", "v"
      // }
  });

 
  





   
  // let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")

  // console.log()
   
  
}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });