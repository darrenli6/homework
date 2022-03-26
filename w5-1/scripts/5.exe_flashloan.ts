 
import { TestUniswapFlashSwap } from '../typechain/TestUniswapFlashSwap'
import { Token } from '../typechain/Token'
import { ethers } from 'hardhat'

// 执行闪电贷
async function main() {
 

  let eth: Token
  let dai: Token 

  let uniswapFlashSwap : TestUniswapFlashSwap 




  const FlashSwap = await ethers.getContractFactory("TestUniswapFlashSwap");
  uniswapFlashSwap=await FlashSwap.attach("0xAb5186829296fd0cDC7A860dDEB2c8F562dDF505") as TestUniswapFlashSwap

  console.log("uniswapFlashSwap 的合约地址:"+uniswapFlashSwap.address)

  const Token = await ethers.getContractFactory("Token");

  dai = await Token.attach("0xb795A877bFc364b2b23A09b3FF1A6726Db4118b2")  as Token
  eth = await Token.attach("0xa2Dbc54213De0Ff4B7534b030c3cD08216679361")  as Token
  await uniswapFlashSwap.testFlashSwap(dai.address,3000) 

   /*
   
  从uniswap pair 借到 我的合约
  从我的合约  还本金+利息  到uniswap pair
From 0xbca4229f04c8a81dfeb561292fc0faa98c2517fcTo 0xab5186829296fd0cdc7a860ddeb2c8f562ddf505 For 30 DAI (DAI)
From 0xab5186829296fd0cdc7a860ddeb2c8f562ddf505To 0xbca4229f04c8a81dfeb561292fc0faa98c2517fc For 30.1 DAI (DAI)
   */

  console.log("flash loan")



   
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });