 
import { Option } from '../typechain/Option'
import { ethers } from 'hardhat'

// 部署token
async function main() {
  // await hre.run('compile');

  let option: Option
 

    
  let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")


  const Option = await ethers.getContractFactory("Option",owner);
  option = await Option.attach("0x589D6C97724d4049C87b4b0B0EA2FDA617c628aC") as Option
  console.log("option address : ",option.address);  //0x97E16DD1b87a8C6CaF9c9dD67C331872074ad4f3

   

  await option.mint(1000);




 
  





   
  // let owner= await ethers.getSigner("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0")

  // console.log()
   
  
}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });