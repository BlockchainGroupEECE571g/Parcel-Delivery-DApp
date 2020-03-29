const Express = artifacts.require("express");

module.exports = function(deployer) {
  deployer.deploy(Express);
};
