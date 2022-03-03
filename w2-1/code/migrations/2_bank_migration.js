const Bank = artifacts.require("Bank");

module.exports = function (deployer) {

  try {
  deployer.deploy(Bank);

} catch {
  console.error("You are connected to the wrong network");
}


};