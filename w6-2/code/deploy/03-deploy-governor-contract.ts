import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from 'hardhat'
import { VOTING_DELAY,VOTING_PERIOD,QUORUM_PERCENTAGE } from "../helper-hardhat-config"


const deployGovernorContract: DeployFunction = async function(
    hre : HardhatRuntimeEnvironment
){
      // 这里账户 跟配置文件有关系 hardhat.config.ts
      const { getNamedAccounts, deployments, network} = hre;
   
      const { deploy ,log, get} = deployments;
  
      const {deployer }= await getNamedAccounts();

      const governanceToken = await get("GovernanceToken");
      const timeLock = await get("TimeLock");
 
      log("部署governorcontract")


      const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
          governanceToken.address,
          timeLock.address,
          QUORUM_PERCENTAGE,
          VOTING_PERIOD,
          VOTING_DELAY,
        ],
        log: true,
        // we need to wait if on a live network so we can verify properly
     //   waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
      })

}


export default deployGovernorContract