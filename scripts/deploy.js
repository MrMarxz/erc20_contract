// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Hardhat helper to get the ethers contractFactory object
  const USDP = await ethers.getContractFactory("USDP");

  // Deploy the contract
  console.log("Deploying USDP...");
  const usdp = await USDP.deploy();
  await usdp.deployed();
  console.log(`USDP deployed to: ${usdp.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
