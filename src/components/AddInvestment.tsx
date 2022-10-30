import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import NumberFormat from "react-number-format";

/**
 * Props for {@link AddInvestment}
 */
interface AddInvestmentProps {
  /**
   * The function to call when the investment is added
   */
  onInvestmentAdded: (name: string, percentage: number) => void;
  // TODO: create an "Investment" domain-model type
}

/**
 * A form for adding an Investment
 *
 * @param props
 */
const AddInvestment = (props: AddInvestmentProps) => {
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onInvestmentAdded(name, percentage);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
        required
        label="Investment"
        onChange={(e) => setName(e.target.value)}
      >
        {name}
      </TextField>
      {/* TODO: extract separate component and add tests*/}
      <NumberFormat
        customInput={TextField}
        label="Percentage"
        id="percerntage"
        decimalScale={2}
        suffix="%"
        onValueChange={(values) => {
          setPercentage(values.floatValue || 0);
        }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddInvestment;
