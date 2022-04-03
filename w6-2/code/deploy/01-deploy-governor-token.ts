
   
import { HardhatRuntimeEnvironment } from "hardhat/types"


import { DeployFunction } from "hardhat-deploy/types"


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
    
  

}


export default deployGovernanceToken;