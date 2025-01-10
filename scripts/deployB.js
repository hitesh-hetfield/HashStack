const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    
    const deployer = await ethers.provider.getSigner();
    const deployerAddress = deployer.address;
    console.log("Deploying contracts with the account:", deployerAddress);

    const superAdminAddress = deployerAddress;
    const B = await ethers.getContractFactory("B");

    const b = await B.deploy(superAdminAddress);
    console.log("Contract B deployed to:", b.target);

    await hre.run("verify:verify", {
        address: b.target,
        constructorArguments: [deployerAddress]
    });
}

// Call the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
