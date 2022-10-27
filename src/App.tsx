import LabeledCurrencyControl from "./LabeledCurrencyControl";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import AddInvestment from "./components/AddInvestment";

function App() {
  const [annualSalary, setAnnualSalary] = useState(0);
  const [addInvestment, setAddInvestment] = useState(false);
  const [investments, setInvestments] = useState(new Array<string>());

  function handleAddInvestment() {
    setAddInvestment(true);
  }

  function handleAnnualSalaryChange(monies: number) {
    setAnnualSalary(monies);
  }

  function handleInvestmentAdded(name: string) {
    setAddInvestment(false);
    setInvestments(investments.concat(name));
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Retirement Investments
        </Typography>
        <LabeledCurrencyControl
          id="annualSalary"
          labelText="Annual Salary"
          onMoniesChange={(monies) => handleAnnualSalaryChange(monies)}
        />

        <Typography variant="body1" gutterBottom>
          monies to invest in retirement{" "}
          <NumberFormat
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator={true}
            prefix={"$"}
            value={annualSalary * 0.15}
          />
        </Typography>
      </Box>
      <ul>
        {investments.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <IconButton onClick={() => handleAddInvestment()}>+</IconButton>
      {addInvestment && (
        <AddInvestment
          onInvestmentAdded={(name: string) => handleInvestmentAdded(name)}
        />
      )}
    </Container>
  );
}

export default App;
