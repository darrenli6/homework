 
import { Option } from '../typechain/Option'
import { ethers } from 'hardhat'

// 部署token
async function main() {
  // await hre.run('compile');

  let option: Option
 

    
  let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")


  const Option = await ethers.getContractFactory("Option",owner);
  option = await Option.deploy("0xb795A877bFc364b2b23A09b3FF1A6726Db4118b2") as Option
  //option = await Option.attach("0x97E16DD1b87a8C6CaF9c9dD67C331872074ad4f3") as Option
  console.log("option address : ",option.address);  //0x97E16DD1b87a8C6CaF9c9dD67C331872074ad4f3
 
  





   
  // let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")

  // console.log()
   
  
}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });