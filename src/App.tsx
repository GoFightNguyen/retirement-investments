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
    </div>
  );
}

export default App;
