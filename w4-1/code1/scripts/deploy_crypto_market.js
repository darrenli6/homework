 
let {ethers } = require("hardhat");
let {writeAddr} =require("./artifact_log.js")

async function main() {

  let [owner,second] = await ethers.getSigners();
 
  let Token =await ethers.getContractFactory("MyToken");

  let aAmount = ethers.utils.parseUnits("100000",18);

  let atoken = await Token.deploy(
    "LIJIA M TOKEN",
    "AM",
    aAmount,
  );

  await atoken.deployed()
 
  console.log("AM Token "+ atoken.address);

  let a =await atoken.balanceOf(owner.address);
  console.log("owner现在持有token"+ ethers.utils.formatUnits(a,18));
  let MyCryptoMarket= await ethers.getContractFactory("CryptoMarket");

  let routeaddr ="0x9E545E3C0baAB3E08CdfD552C960A1050f373042";
  let wethaddr = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";

  let market = await MyCryptoMarket.deploy(
      atoken.address,
      routeaddr,
      wethaddr,
  );

  await market.deployed();



  console.log("交易所的地:"+ market.address);

  await atoken.approve(market.address,ethers.constants.MaxInt256);
   aAmount = ethers.utils.parseUnits("5000",18);
  let ethAmount = ethers.utils.parseUnits("100",18);
  await market.addLiquidity(aAmount,{value :ethAmount});
  console.log( "添加流动性完成 ");

  a =await atoken.balanceOf(owner.address);
  console.log("添加完成流动性,owner持有token"+ ethers.utils.formatUnits(a,18));

  // 购买操作
  let buyEthA= ethers.utils.parseUnits("10",18);
  out =await market.buyToken("0",{value: buyEthA});


   a =await atoken.balanceOf(owner.address);
  console.log("购买完token,owner持有token"+ ethers.utils.formatUnits(a,18));







 






 



   



 

  
}

 
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
