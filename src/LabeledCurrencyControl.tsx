import React, { useState } from "react";
import NumberFormat from "react-number-format";

const LabeledCurrencyControl = (props: { id: string; labelText: string }) => {
  const [money, setMoney] = useState(0);
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <NumberFormat
        id={props.id}
        decimalScale={2}
        fixedDecimalScale
        prefix="$"
        thousandSeparator=','
        value={money}
        onValueChange={values => {
          setMoney(values.floatValue || 0)
        }}
      />
    </>
  );
};

export default LabeledCurrencyControl;
