import React from "react";
import { render, screen } from "@testing-library/react";
import LabeledCurrencyControl from "./LabeledCurrencyControl";

describe("LabeledCurrencyControl", () => {
  test("should default to value $0.00", () => {
    render(
      <LabeledCurrencyControl id="testCurrency" labelText="Test Currency" />
    );
    const input = screen.getByLabelText("Test Currency");
    expect(input).toHaveValue("$0.00");
  });
});
