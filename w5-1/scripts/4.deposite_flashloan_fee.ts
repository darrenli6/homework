 
import { TestUniswapFlashSwap } from '../typechain/TestUniswapFlashSwap'
import { Token } from '../typechain/Token'
import { ethers } from 'hardhat'

// 存手续费
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
  let fee =10000000000 
  let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")
  await (await dai.connect(owner).approve(uniswapFlashSwap.address,fee)).wait() 
  await (await dai.connect(owner).transfer(uniswapFlashSwap.address,fee)).wait() 
    
  console.log("向地址:"+uniswapFlashSwap.address+ " 转账"+fee)  



   
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });