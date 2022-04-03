import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from 'hardhat'
import { time } from "console";
import { ADDRESS_ZERO } from "../helper-hardhat-config";

const setupContracts: DeployFunction = async function(
   hre : HardhatRuntimeEnvironment
){
      // 这里账户 跟配置文件有关系 hardhat.config.ts
      
      const { getNamedAccounts, deployments, network} = hre;
   
      const { deploy ,log, get} = deployments;
  
      const {deployer }= await getNamedAccounts();
      const governanceToken = await ethers.getContract("GovernanceToken", deployer)
      const timeLock = await ethers.getContract("TimeLock", deployer)
      const governor = await ethers.getContract("GovernorContract", deployer)
      log("设置角色");


      const proposerRole =await timeLock.PROPOSER_ROLE();
      const executorRole = await timeLock.EXECUTOR_ROLE();
      const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

      const proposerTx= await timeLock.grantRole(proposerRole,governor.address);

      await proposerTx.wait(1);

      const executorTx =await timeLock.grantRole(executorRole,ADDRESS_ZERO);
      await executorTx.wait(1);

      const revokeTx =await timeLock.revokeRole(adminRole,deployer);

      await revokeTx.wait(1);


};

export default setupContracts;