require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.22",
  networks: {
    thunder: {
      url: "https://rpc.testnet.5ire.network",
      chainId: 997,
      accounts: [process.env.PVT_KEY]
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [process.env.PVT_KEY]
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      chainId: 80002,
      accounts: [process.env.PVT_KEY]
    },
  },
  etherscan: {
    apiKey: {
      thunder: process.env.THUNDER_API_KEY !== undefined ? [process.env.THUNDER_API_KEY] : [],
      amoy: process.env.POLYGON_API_KEY !== undefined ? [process.env.POLYGON_API_KEY] : [],
      bsc: process.env.BSC_API_KEY !== undefined ? [process.env.BSC_API_KEY] : []
    },
  customChains: [
    {
      network: "thunder",
      chainId: 997,
      urls: {
          apiURL: "https://contract.evm.testnet.5ire.network/5ire/verify",
          browserURL: "https://testnet.5irescan.io/dashboard"
        }
      },
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com/"
        }
      },
      {
          network: "bsc",
          chainId: 97,
          urls: {
            apiURL: "https://api-testnet.bscscan.com/api",
            browserURL: "https://testnet.bscscan.com/"
          }
        }
    ]
  }
};
