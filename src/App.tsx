import logo from "./logo.svg";
import "./App.css";
import LabeledCurrencyControl from "./LabeledCurrencyControl";
import NumberFormat from "react-number-format";
import { useState } from "react";

function App() {
  const [annualSalary, setAnnualSalary] = useState(0);

  function handleAnnualSalaryChange(monies: number) {
    setAnnualSalary(monies);
  }

  return (
    <div className="App">
      <LabeledCurrencyControl
        id="annualSalary"
        labelText="Annual Salary"
        onMoniesChange={(monies) => handleAnnualSalaryChange(monies)}
      />
      <span>
        monies to invest in retirement
        <NumberFormat
          displayType={"text"}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator={true}
          prefix={"$"}
          value={annualSalary * 0.15}
        />
      </span>
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
    </div>
  );
}

export default App;
