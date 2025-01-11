import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import ContractInteraction from "./ContractInteraction";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && (
        <>
          <p>Wallet Address: {walletAddress}</p>
          <ContractInteraction walletAddress={walletAddress} />
        </>
      )}
    </div>
  );
};

export default WalletConnect;
