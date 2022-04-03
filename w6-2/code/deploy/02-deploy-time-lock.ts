
   
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from 'hardhat'
import { MIN_DEPLAY } from "../helper-hardhat-config"


const deployTimeLock: DeployFunction = async function(
    hre : HardhatRuntimeEnvironment
){
    // 这里账户 跟配置文件有关系 hardhat.config.ts
    const { getNamedAccounts, deployments, network} = hre;
   
    const { deploy ,log} = deployments;

    const {deployer }= await getNamedAccounts();

    log("部署timelock")
   
    const timelock= await deploy("TimeLock",{
        from :deployer,
        args: [MIN_DEPLAY,[],[]],
        log: true
    })

    


}

export default deployTimeLock;