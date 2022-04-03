import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from 'hardhat'
 

const deployBox: DeployFunction = async function(
   hre : HardhatRuntimeEnvironment
){
      // 这里账户 跟配置文件有关系 hardhat.config.ts
      const { getNamedAccounts, deployments, network} = hre;
   
      const { deploy ,log, get} = deployments;
  
      const {deployer }= await getNamedAccounts();


      log("部署提案Box");

      const box = await deploy("Box",{
          from : deployer,
          args:[],
          log:true
      });

      const timeLock = await ethers.getContract("TimeLock");

      const boxContract =await ethers.getContractAt("Box",box.address);

      const transferOwnerTx =await boxContract.transferOwnership(
          timeLock.address
      );

      await transferOwnerTx.wait(1);

      log("转移授权,转移给timelock合约");




}      
export default deployBox;
