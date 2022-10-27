import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

/**
 * Props for {@link AddInvestment}
 */
interface AddInvestmentProps {
  /**
   * The function to call when the investment is added
   */
  onInvestmentAdded: (name: string) => void;
}

/**
 * A form for adding an Investment
 *
 * @param props
 */
const AddInvestment = (props: AddInvestmentProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onInvestmentAdded(name);
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddInvestment;
