 
import { Token } from '../typechain/Token'
import { ethers } from 'hardhat'

// 往账户地址里存钱
async function main() {
  // await hre.run('compile');

  let eth: Token
  let dai: Token 

  const Token = await ethers.getContractFactory("Token");
  dai = await Token.attach("0xb795A877bFc364b2b23A09b3FF1A6726Db4118b2")  as Token
  eth = await Token.attach("0xa2Dbc54213De0Ff4B7534b030c3cD08216679361")  as Token
 
  
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