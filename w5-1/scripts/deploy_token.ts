 
import { Token } from '../typechain/Token'
import { ethers } from 'hardhat'


async function main() {
  // await hre.run('compile');

  let eth: Token
  let dai: Token 

  const Token = await ethers.getContractFactory("Token");
  eth = await Token.deploy('Ethereum', 'DTH', 100000000000) as Token
  dai = await Token.deploy('DAI', 'DAI', 1000000000000000) as Token
  
  console.log("DTH的合约地址: "+eth.address) 
  console.log("DAI的合约地址: "+dai.address) 
  
  await (await eth.transfer("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0",2000)).wait()
  await (await dai.transfer("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0",10000000)).wait()
  await (await eth.transfer("0xD3Bbf16bdCb574803782f75d67e53513Ec2271Bc",2000)).wait()
  await (await dai.transfer("0xD3Bbf16bdCb574803782f75d67e53513Ec2271Bc",10000000)).wait() 
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });