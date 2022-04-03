
   
import { HardhatRuntimeEnvironment } from "hardhat/types"


import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from 'hardhat'


const deployGovernanceToken : DeployFunction = async function(
     hre : HardhatRuntimeEnvironment
){
   
    // 这里账户 跟配置文件有关系 hardhat.config.ts
    const { getNamedAccounts, deployments, network} = hre;
   
    const { deploy ,log} = deployments;

    const {deployer }= await getNamedAccounts();

    log("部署dao合约币")

    const governanceToken= await deploy("GovernanceToken",{
        from : deployer,
        args : [],
        log: true
    });
    // verify 
    log(` 部署dao币,它的地址是： ${governanceToken.address}`)
    
    await delegate(governanceToken.address,deployer);
    log(" 已授权 ")

}



const delegate = async (
    governanceTokenAddress: string,
    delegatedAccount : string
) =>{
   const governanceToken = await ethers.getContractAt(
       "GovernanceToken",
       governanceTokenAddress
   );

const tx =await governanceToken.delegate(delegatedAccount);
await tx.wait(1)
console.log(
    `checkpoints  ${await  governanceToken.numCheckpoints(delegatedAccount) }`
);


}

export default deployGovernanceToken;