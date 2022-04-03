import { developmentChains, proposalsFile, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";
import * as fs from "fs";
import { network,ethers } from "hardhat";
import { moveBlocks } from "../utils/move-blocks";


const index =0 ;


async function main(proposalIndex:number){
//https://forum.openzeppelin.com/t/what-is-votecastbysig/17069
     const proposals =JSON.parse(fs.readFileSync(proposalsFile,"utf8"));
     const proposalId = proposals[network.config.chainId!][proposalIndex];
     // 0  拒绝 1 接受   2 Abstain 弃权
     // 投票  

     const voteWay=1;

     const governor  =await ethers.getContract("GovernorContract");

     const reason = " 我喜欢做它";

     const voteTxResponse = await governor.castVoteWithReason(
         proposalId,
         voteWay,
         reason
     );

     await voteTxResponse.wait(1);

     if (developmentChains.includes(network.name)){
         await moveBlocks(VOTING_PERIOD+1);
     }

     console.log("已经完成投票")
     




}


main(index)
.then(()=> process.exit(0))
.catch((error) => {
   console.error(error);
   process.exit(1);
});