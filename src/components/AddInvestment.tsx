import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  Investment,
  InvestmentError,
  InvestmentErrorType,
} from "../domain-model";
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
  const [error, setError] = useState<InvestmentError>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const investment = Investment.create(name, percentage);
      props.onInvestmentAdded(investment);
    } catch (err: any) {
      if (err instanceof InvestmentError) setError(err);
      else throw err; // not yet sure what I want to do if the error is not an InvestmentError
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
        error={error?.type === InvestmentErrorType.Name}
        helperText={
          error?.type === InvestmentErrorType.Name ? error.message : null
        }
        required
        label="Investment"
        onChange={(e) => setName(e.target.value)}
      >
        {name}
      </TextField>
      <LabeledPercentageControl
        error={
          error?.type === InvestmentErrorType.Percent ? error.message : null
        }
        onPercentageChange={setPercentage}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddInvestment;
