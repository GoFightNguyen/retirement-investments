import React from "react";
import NumberFormat from "react-number-format";

const LabeledCurrencyControl = (props: { id: string; labelText: string }) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <NumberFormat
        id={props.id}
        defaultValue={0}
        decimalScale={2}
        fixedDecimalScale
        prefix="$"
      />
    </>
  );
};

export default LabeledCurrencyControl;
