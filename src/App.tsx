import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [annualSalary, setAnnualSalary] = useState(0);

  const updateAnnualSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualSalary(Number(event.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <label htmlFor="annualSalary">Annual Salary</label>
      <input
        id="annualSalary"
        value={annualSalary}
        onChange={updateAnnualSalary}
      />
      <label id="moniestoInvest">{annualSalary * 0.15}</label>
    </div>
  );
}

export default App;
