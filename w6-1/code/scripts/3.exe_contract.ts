 
import { Option } from '../typechain/Option'

import { ERC20 } from '../typechain/ERC20'
import { ethers } from 'hardhat'

// 部署token
async function main() {
  // await hre.run('compile');

  let option: Option
  let dai : ERC20
 

    
  let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")


  const Option = await ethers.getContractFactory("Option",owner);
  option = await Option.attach("0x97E16DD1b87a8C6CaF9c9dD67C331872074ad4f3") as Option
  console.log("option address : ",option.address);  //0x97E16DD1b87a8C6CaF9c9dD67C331872074ad4f3
  const ERC20 = await ethers.getContractFactory("ERC20",owner);
  dai = await ERC20.attach("0xb795A877bFc364b2b23A09b3FF1A6726Db4118b2")  as ERC20
  console.log("dai ",dai.name().toString())
  let fee = 100
  // 将美金授权给合约
  await (await dai.connect(owner).approve(option.address,fee)).wait() 
 
  console.log("授权成功")
  let settlenum=10
  // 行权 
  // 
  await (await option.connect(owner).settlement(settlenum)).wait() 
   
 


  

 
  





   
  // let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")

  // console.log()
   
  
}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });