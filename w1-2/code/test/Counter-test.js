const { expect } = require("chai");

describe("测试Counter合约", function() {
  it("计算+1", async function() {
    const [owner] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");

    const hardhatCounter = await Counter.deploy();
    await hardhatCounter.deployed();
  
    await hardhatCounter.count()

  
  
  });

  it("计算add(2)", async function() {
    const [owner] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");

    const hardhatCounter = await Counter.deploy();
    await hardhatCounter.deployed();
  
    await hardhatCounter.add(2)
  });
  

  it("设置set(8)", async function() {
    const [owner] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");

    const hardhatCounter = await Counter.deploy();
    await hardhatCounter.deployed();
  
    await hardhatCounter.set(8)
  });
});