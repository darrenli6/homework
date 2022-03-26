 
import { MyV2FlashLoan } from '../typechain/MyV2FlashLoan'
import { ethers } from 'hardhat'

import { Token } from '../typechain/Token'

// 部署token
async function main() {
  // await hre.run('compile');

  let myV2FlashLoan: MyV2FlashLoan

  let USDC : Token
 

   
  const MyV2FlashLoan = await ethers.getContractFactory("MyV2FlashLoan");
 // myV2FlashLoan = await MyV2FlashLoan.deploy("0x88757f2f99175387aB4C6a4b3067c77A695b0349") as MyV2FlashLoan
  myV2FlashLoan = await MyV2FlashLoan.attach("0x5E9861De6b23a51424653f45C8037385735D49E1")  as MyV2FlashLoan
  console.log("MyV2FlashLoan的合约地址是: "+myV2FlashLoan.address) 
 
  await myV2FlashLoan.myFlashLoanCall()

  console.log("闪电贷款成功")
 
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });