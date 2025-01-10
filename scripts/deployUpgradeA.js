const { ethers, upgrades } = require("hardhat");

async function UpgradeA() {

    const PROXY = "0x2b9C6D7A725Bd79D79d505B306b35baa163Cd2e2";
    const contractB = "0xE95B1403eF51147328b8460BAe9304054F84fC5d";

    const deployer = await ethers.provider.getSigner();
    console.log("Upgrading with address:", deployer.address);

    const upgradeA = await ethers.getContractFactory("upgradeA");
    console.log("Upgrading Contract A....");

    const upgraded = await upgrades.upgradeProxy(PROXY, upgradeA);
    console.log("UpgradeA deployed and initialized at:", upgraded.target);

    console.log("Initializing UpgradeA with Contract B address..");
    const tx = await upgraded.initializeUpgrade(contractB);
    
    await tx.wait();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(PROXY);
    console.log("UpgradeA implementation address:", implementationAddress);
}

UpgradeA()
.then(() => process.exit(0))
.catch((error) => { 
    console.error("Unexpected error:", error);
    process.exit(1);
});