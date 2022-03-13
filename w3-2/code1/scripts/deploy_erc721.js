const hre = require("hardhat");
 

async function main() {
  // await hre.run('compile');

  const MyERC721 = await hre.ethers.getContractFactory("newNFT");
  const token = await MyERC721.deploy();

  await token.deployed();

  console.log("MyERC20 deployed to:", token.address);
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });