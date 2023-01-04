import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

/**
 * Props for {@link LabeledPercentageControl}
 */
export interface LabeledPercentageControlProps {
  /**
   * The function to call when the percentage value is changed
   */
  onPercentageChange: (percentage: number) => void;
  /**
   * The error, if any, to display.
   * 
   * @remarks
   * 
   * The union type includes `null` so that usage is similar
   * to setting `helperText` on an input such as `TextField`
   */
  error?: string | null;
}

/**
 *
 * @param props A controlled component that includes a label and its labeled control
 * @returns
 */
const LabeledPercentageControl = (props: LabeledPercentageControlProps) => {
  const error = {
    error: props.error ? true : false,
    helperText: props.error ? props.error : null,
  };
  return (
    <NumericFormat
      id="percentage"
      {...error}
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
