 
let {ethers } = require("hardhat");
let {writeAddr} =require("./artifact_log.js")

async function main() {

  let [owner,second] = await ethers.getSigners();
 
  let Token =await ethers.getContractFactory("MyToken");

  let aAmount = ethers.utils.parseUnits("100000",18);

  let atoken = await Token.deploy(
    "LIJIA TOKEN",
    "A",
    aAmount,
  );

  await atoken.deployed()

  console.log("Atoken 的地址"+ atoken.address)

  let bAmount = ethers.utils.parseUnits("200000",18);

  let btoken = await Token.deploy(
    "LIJIA TOKEN",
    "B",
    bAmount,
  );



  await btoken.deployed()



  console.log("Btoken 的地址"+ btoken.address)


  let holderOfa =await atoken.balanceOf(second.address);
  let holderOfb =await btoken.balanceOf(second.address);

  console.log("second : tokena持有 "+ ethers.utils.formatUnits(holderOfa))
  console.log("second :tokenb持有 "+ ethers.utils.formatUnits(holderOfb))



   holderOfa =await atoken.balanceOf(owner.address);
   holderOfb =await btoken.balanceOf(owner.address);

  console.log("owner: tokena持有 "+ ethers.utils.formatUnits(holderOfa))
  console.log("owner: tokenb持有 "+ ethers.utils.formatUnits(holderOfb))

  // 部署资金池合约
  let MPool = await ethers.getContractFactory("MoneyPool");
  let pool = await MPool.deploy(atoken.address,btoken.address);

  await pool.deployed();

  console.log("pool address  "+ pool.address);
 // 添加钱必须授权才可以将币打给资金池合约
  await atoken.approve(pool.address,aAmount);
  await btoken.approve(pool.address,bAmount);

  await pool.add(ethers.utils.parseUnits("50000",18),ethers.utils.parseUnits("100000",18));

  console.log("添加完流动性");

  // 测试一下 , 等量代换
  let amountIn = ethers.utils.parseUnits("2",18);
  let out = await pool.getAmountOut(amountIn,atoken.address);
  console.log(" 2 Atoken  =  " + ethers.utils.formatUnits(out[0],18)+" Btoken");

  amountIn = ethers.utils.parseUnits("200",18);
  out = await pool.getAmountOut(amountIn,atoken.address);
  console.log(" 200 Atoken  =  " + ethers.utils.formatUnits(out[0],18)+" Btoken");
  
  amountIn = ethers.utils.parseUnits("2000",18);
  out = await pool.getAmountOut(amountIn,atoken.address);
  console.log(" 2000 Atoken  =  " + ethers.utils.formatUnits(out[0],18)+" Btoken");
  
  console.log("第二用户地址  "+second.address);

  await pool.swap(amountIn,out[0].toString(),atoken.address,btoken.address,second.address);
  holderOfb =await btoken.balanceOf(second.address);
  console.log("second :tokenb持有 "+ ethers.utils.formatUnits(holderOfb))







 



   



 

  
}

 
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
