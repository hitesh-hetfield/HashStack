import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "../A.abi.json";

const ContractInteraction = ({ walletAddress }) => {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");

  const PROXY = "0x2b9C6D7A725Bd79D79d505B306b35baa163Cd2e2";

  const getData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(PROXY, abi, provider);
      const result = await contract.getter();
      setData(result);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const setDataHandler = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(PROXY, abi, signer);
      const tx = await contract.setter(inputValue);
      await tx.wait();
      alert("Transaction confirmed!");
    } catch (error) {
      console.error("Error setting data:", error);
    }
  };

  return (
    <div>
      <button onClick={getData}>Get Value</button>
      <p>Data from Contract: {data}</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value"
      />
      <button onClick={setDataHandler}>Set Value</button>
    </div>
  );
};

export default ContractInteraction;
