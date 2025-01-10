const { ethers, upgrades } = require("hardhat"); 

async function A() {

    const deployer = await ethers.provider.getSigner();
    console.log("Deploying contract A with wallet:", deployer.address);

    const contractA = await ethers.getContractFactory("A");
    const ContractA = await upgrades.deployProxy(
        contractA,
        [], //no arguments in initializer
        {
            initializer: "initialize",
            kind: "uups"
        }
    );

    console.log("Proxy for Contract A deployed at:", ContractA.target);

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(ContractA.target);
    console.log("Contract A implementation address:", implementationAddress);
}

  
A()
.then(() => process.exit(0))
.catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
});