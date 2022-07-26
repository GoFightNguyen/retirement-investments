import LabeledCurrencyControl from "./LabeledCurrencyControl";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";

function App() {
  const [annualSalary, setAnnualSalary] = useState(0);

  function handleAnnualSalaryChange(monies: number) {
    setAnnualSalary(monies);
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
      </Box>
    </Container>
  );
}

export default App;
