import { Button, TextField } from "@mui/material";
import { useState } from "react";

/**
 * Props for {@link AddInvestment}
 */
export interface AddInvestmentProps {
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onInvestmentAdded(name);
      }}
    >
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
