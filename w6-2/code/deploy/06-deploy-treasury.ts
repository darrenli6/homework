import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from 'hardhat'
 

const deployTreasury: DeployFunction = async function(
   hre : HardhatRuntimeEnvironment
){
      // 这里账户 跟配置文件有关系 hardhat.config.ts
      const { getNamedAccounts, deployments, network} = hre;
   
      const { deploy ,log, get} = deployments;
  
      const {deployer }= await getNamedAccounts();


      log("部署提案Treasury");

      const treasury = await deploy("Treasury",{
          from : deployer,
          args:[],
          log:true
      });

      const timeLock = await ethers.getContract("TimeLock");

      const boxContract =await ethers.getContractAt("Treasury",treasury.address);

      const transferOwnerTx =await boxContract.transferOwnership(
          timeLock.address
      );

      await transferOwnerTx.wait(1);

      log("Treasury转移授权,转移给timelock合约");

      
 





}      
export default deployTreasury;
