import LabeledCurrencyControl from "./LabeledCurrencyControl";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import AddInvestment from "./components/AddInvestment";
import RetirementOverview, { Investment } from "./domain-model";

function App() {
  const [addInvestment, setAddInvestment] = useState(false);
  const [investments, setInvestments] = useState(new Array<Investment>());

  const [retirementOveriew, setRetirementOverview] = useState(
    new RetirementOverview()
  );

  function handleAddInvestment() {
    setAddInvestment(true);
  }

  function handleAnnualSalaryChange(monies: number) {
    const copy = new RetirementOverview();
    Object.assign(copy, retirementOveriew);

    copy.changeAnnualSalary(monies);
    setRetirementOverview(copy);
  }

  function handleInvestmentAdded(investment: Investment) {
    setAddInvestment(false);
    setInvestments(investments.concat(investment));
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
            value={retirementOveriew.moniesToInvest}
          />
        </Typography>
      </Box>
      <ul>
        {investments.map((i) => (
          <li key={i.name}>{`${i.name} ${i.percentage}%`}</li>
        ))}
      </ul>
      <IconButton onClick={() => handleAddInvestment()}>+</IconButton>
      {addInvestment && (
        <AddInvestment
          onInvestmentAdded={(investment) => handleInvestmentAdded(investment)}
        />
      )}
    </Container>
  );
}

export default App;
