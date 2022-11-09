import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Investment } from "../domain-model";
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
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const investment = Investment.create(name, percentage);
      props.onInvestmentAdded(investment);
    } catch (err: any) {
      if (err.message.includes("Name")) setNameError(err.message);
      else setError(err.message);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
        error={nameError ? true : false}
        helperText={nameError}
        required
        label="Investment"
        onChange={(e) => setName(e.target.value)}
      >
        {name}
      </TextField>
      <LabeledPercentageControl onPercentageChange={setPercentage} />
      {error && <span>{error}</span>}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddInvestment;
