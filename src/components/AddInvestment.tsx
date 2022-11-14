import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Investment, InvestmentNameError } from "../domain-model";
import LabeledPercentageControl from "./LabeledPercentageControl";

/**
 * Props for {@link AddInvestment}
 */
interface AddInvestmentProps {
  /**
   * The function to call when the investment is added
   */
  onInvestmentAdded: (investment: Investment) => void;
}

/**
 * A form for adding an Investment
 *
 * @param props
 */
const AddInvestment = (props: AddInvestmentProps) => {
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState<{ type: string; message: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const investment = Investment.create(name, percentage);
      props.onInvestmentAdded(investment);
    } catch (err: any) {
      setError({
        type: err instanceof InvestmentNameError ? "name" : "percent",
        message: err.message,
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
        error={error?.type === "name"}
        helperText={error?.type === "name" ? error.message : null}
        required
        label="Investment"
        onChange={(e) => setName(e.target.value)}
      >
        {name}
      </TextField>
      <LabeledPercentageControl error={error?.type === 'percent' ? error.message : null} onPercentageChange={setPercentage} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddInvestment;
