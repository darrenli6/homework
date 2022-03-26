 
import { TestUniswapFlashSwap } from '../typechain/TestUniswapFlashSwap'
import { Token } from '../typechain/Token'
import { ethers } from 'hardhat'

// 部署闪电兑换的合约
async function main() {
  // await hre.run('compile');

  let eth: Token
  let dai: Token 

  let uniswapFlashSwap : TestUniswapFlashSwap 


  const FlashSwap = await ethers.getContractFactory("TestUniswapFlashSwap");
  uniswapFlashSwap=await FlashSwap.deploy() as TestUniswapFlashSwap

  console.log("uniswapFlashSwap 的合约地址:"+uniswapFlashSwap.address)

  //的合约地址:0xAb5186829296fd0cDC7A860dDEB2c8F562dDF505
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });