const Flightbooking = artifacts.require("express");

module.exports = function(deployer) {
  deployer.deploy(Flightbooking);
};
