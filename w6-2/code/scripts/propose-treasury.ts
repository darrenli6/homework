import { ethers ,network} from 'hardhat'
import { TREASURY_FUNC,TREASURY_proposalsFile ,TREASURY_PROPOSAL_DESCRIPTION,developmentChains, VOTING_DELAY} from '../helper-hardhat-config';
import { moveBlocks } from '../utils/move-blocks';
import * as fs from "fs"
export async function propose(
    functionToCall:string
    ,proposalDescription: string
    ){
    const governor = await ethers.getContract("GovernorContract");
    const treasury = await ethers.getContract("Treasury");

    const encodedFunctionCall = treasury.interface.encodeFunctionData(
        functionToCall,
      
    );
    
    
    console.log(" encodedFunctionCall调用  ",encodedFunctionCall)
    console.log(` 提案地址: ${treasury.address} ` )
    console.log(` 提案描述: ${proposalDescription} ` )
    // 发起提案

    /*
      function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
  ) public override(Governor, IGovernor) returns (uint256) {
    return super.propose(targets, values, calldatas, description);
  }
    */
    const proposeTx =await governor.propose(
       [treasury.address],
       [0],
       [encodedFunctionCall],
       proposalDescription
    );

    const proposeReceipt = await proposeTx.wait(1);

    if(developmentChains.includes(network.name)){
         // 延迟几个区块
          await moveBlocks(VOTING_DELAY+1);

    }

    const proposalId = proposeReceipt.events[0].args.proposalId;

    let proposals = JSON.parse(fs.readFileSync(TREASURY_proposalsFile, "utf8"))
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(TREASURY_proposalsFile,JSON.stringify(proposals));


}

propose(TREASURY_FUNC,TREASURY_PROPOSAL_DESCRIPTION).then(
    ()=>process.exit(0)
).catch( (error) =>{
    console.log(error);
    process.exit(1);
} );