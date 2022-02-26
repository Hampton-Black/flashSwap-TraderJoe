/* eslint-disable quotes */
/* eslint-disable prefer-arrow-callback */
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Flash swapper", function () {
  it("Should deploy the contract", async function () {
    const _flashSwap = await ethers.getContractFactory("flashSwap");
    const flashSwap = await _flashSwap.deploy("0x60aE616a2155Ee3d9A68541Ba4544862310933d4", "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106");
    await flashSwap.deployed();
    console.log("flashSwap deployed to:", flashSwap.address);

    expect(flashSwap.address).to.equal("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  });
  it("Should obtain AVAX in flash swap", async function () {

  });
});
