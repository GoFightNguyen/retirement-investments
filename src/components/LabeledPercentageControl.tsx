import { TextField } from "@mui/material";
import NumberFormat from "react-number-format";

/**
 * Props for {@link LabeledPercentageControl}
 */
export interface LabeledPercentageControlProps {
  /**
   * The function to call when the percentage value is changed
   */
  onPercentageChange: (percentage: number) => void;
}

/**
 *
 * @param props A controlled component that includes a label and its labeled control
 * @returns
 */
const LabeledPercentageControl = (props: LabeledPercentageControlProps) => {
  return (
    <NumberFormat
      id="percentage"
      customInput={TextField}
      label="Percentage"
      suffix="%"
      decimalScale={2}
      onValueChange={(values) => {
        props.onPercentageChange(values.floatValue || 0);
      }}
    />
  );
};

export default LabeledPercentageControl;
