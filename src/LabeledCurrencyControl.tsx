import React from "react";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";

/**
 * Props for {@link LabeledCurrencyControl}
 */
export interface LabeledCurrencyControlProps {
  /**
   * The id attribute of the input as well as the for attribute of the label
   */
  id: string;
  labelText: string;
  /**
   * The function to call when the money value is changed
   */
  onMoniesChange: (monies: number) => void;
}

/**
 * A controlled component that includes a label and its labeled control.
 *
 * @param props
 * @returns
 */
const LabeledCurrencyControl = (props: LabeledCurrencyControlProps) => {
  return (
    <NumberFormat
      customInput={TextField}
      label={props.labelText}
      id={props.id}
      decimalScale={2}
      fixedDecimalScale
      prefix="$"
      thousandSeparator={true}
      defaultValue={0}
      onValueChange={(values) => {
        props.onMoniesChange(values.floatValue || 0);
      }}
    />
  );
};

export default LabeledCurrencyControl;
