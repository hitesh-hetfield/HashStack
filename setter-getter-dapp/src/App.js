import React from "react";
import WalletConnect from "./components/WalletConnect";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Setter-Getter DApp</h1>
      </header>
      <WalletConnect />
    </div>
  );
};

export default App;
