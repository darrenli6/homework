 
import { TestUniswap } from '../typechain/TestUniswap'
import { Token } from '../typechain/Token'
import { ethers } from 'hardhat'

// 部署闪电兑换的合约
async function main() {
  // await hre.run('compile');

  let eth: Token
  let dai: Token 

  let testUniswap : TestUniswap 


  const TestUniswap = await ethers.getContractFactory("TestUniswap");
   //testUniswap=await TestUniswap.deploy() as TestUniswap
testUniswap =await TestUniswap.attach("0x6288b014019dbF32e852Ef5F7B4F76eA2e16f657") as TestUniswap
//uniswapFlashSwap 的合约地址:0x6288b014019dbF32e852Ef5F7B4F76eA2e16f657
  console.log("uniswapFlashSwap 的合约地址:"+testUniswap.address)
  

  const Token = await ethers.getContractFactory("Token");

  dai = await Token.attach("0xb795A877bFc364b2b23A09b3FF1A6726Db4118b2")  as Token
  eth = await Token.attach("0xa2Dbc54213De0Ff4B7534b030c3cD08216679361")  as Token
 
  let amountIn= 200000 
  let number = await testUniswap.getAmountOutMin(dai.address,eth.address,amountIn); 
  console.log("预计可以用dai换dTH ",number) 


  // 需要给 TestUniswap approve
  let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")
  await (await dai.connect(owner).approve(testUniswap.address,99999999999)).wait() 
    
  await testUniswap.swap(dai.address,eth.address,amountIn,0,owner.address); 
  console.log("成功swap "+number) 
   
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });