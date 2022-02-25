const Counter = artifacts.require("Counter");

module.exports = function (deployer) {

  try {
  deployer.deploy(Counter);

} catch {
  console.error("You are connected to the wrong network");
}


};
