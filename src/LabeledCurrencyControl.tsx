import React from "react";
import NumberFormat from "react-number-format";

/**
 * A controlled component...
 *
 * @param props
 * @returns
 */
const LabeledCurrencyControl = (props: {
  id: string;
  labelText: string;
  onMoniesChange: (monies: number) => void;
}) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <NumberFormat
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
    </>
  );
};

export default LabeledCurrencyControl;
