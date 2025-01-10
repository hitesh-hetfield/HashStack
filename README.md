# Setter-Getter DApp

## Prerequisites

Make sure you have the following installed on your system:
- **Node.js**: [Download](https://nodejs.org/)
- **npm**: Comes with Node.js
- **Hardhat**: Install globally using
```
$ npm install -g hardhat
```
  
---

## Installation

1. **Clone the Repository**: 
2. **Install Dependencies**
```
$ npm install
```
```
$ cd setter-getter-app
```
```
$ npm install
``` 
3. **Config .env file**
```
PVT_KEY=""
THUNDER_API_KEY=""
POLYGON_API_KEY=""
BSC_API_KEY=""
```
4. **Compile Contracts**
```
$ npx hardhat compile
```
5. Deploy Contracts: Deploy your smart contracts using Hardhat:
```
$ npx hardhat run scripts/deploy.js --network <network-name>
```
6. **Update Frontend**
- After deploying, copy the deployed contract address and ABI to the frontend ```setter-getter-app directory```.

7. **Start Frontend**
```
$ cd setter-getter-app
```
8. Start the React development server
```
$ npm start
```
9. Open the app in your browser
```
http://localhost:3000
``` 






