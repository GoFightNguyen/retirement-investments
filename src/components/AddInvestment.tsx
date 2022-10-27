import { TextField } from "@mui/material";

/**
 * A form for adding an Investment
 */
const AddInvestment = () => {
  return (
    <form>
      <TextField required label="Investment" />
    </form>
  );
};

export default AddInvestment;
