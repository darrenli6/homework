
const {ethers,network,artifacts} = require("hardhat");

const par=process.argv
const value =par[2]

console.log("Counter deploy with value ",value );

async function main() { 
  
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();
    console.log("Counter deployed to : ",counter.address);

    await counter.add(value)
     
     

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });