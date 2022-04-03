import { ethers ,network} from 'hardhat'
import { NEW_STORE_VALUE,FUNC,proposalsFile ,PROPOSAL_DESCRIPTION,developmentChains, VOTING_DELAY} from '../helper-hardhat-config';
import { moveBlocks } from '../utils/move-blocks';
import * as fs from "fs"
export async function propose(args:any[]
    ,functionToCall:string
    ,proposalDescription: string
    ){
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");

    const encodedFunctionCall = box.interface.encodeFunctionData(
        functionToCall,
        args
    );
    
    
    console.log(" encodedFunctionCall调用  ",encodedFunctionCall)
    console.log(` 提案地址: ${box.address} 带着参数${args} ` )
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
       [box.address],
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

    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(proposalsFile,JSON.stringify(proposals));


}

propose([NEW_STORE_VALUE],FUNC,PROPOSAL_DESCRIPTION).then(
    ()=>process.exit(0)
).catch( (error) =>{
    console.log(error);
    process.exit(1);
} );