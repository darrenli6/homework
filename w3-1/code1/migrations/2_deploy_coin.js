//可增发代币
const MyToken = artifacts.require("MyToken"); 

module.exports = function(deployer) {
    deployer.deploy(MyToken,
    //构造函数的参数
    "LIJIA Coin","DAC",2,0);
};