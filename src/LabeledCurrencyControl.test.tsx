import React from "react";
import { render, screen } from "@testing-library/react";
import LabeledCurrencyControl from "./LabeledCurrencyControl";
import userEvent from "@testing-library/user-event";

describe("LabeledCurrencyControl", () => {
  test("should default to value $0.00", () => {
    render(
      <LabeledCurrencyControl id="testCurrency" labelText="Test Currency" />
    );
    const input = screen.getByLabelText("Test Currency");
    expect(input).toHaveValue("$0.00");
  });

  describe.each`
    userInput     | expected
    ${".1"}       | ${"$.10"}
    ${"3"}        | ${"$3.00"}
    ${"3.0"}      | ${"$3.00"}
    ${"3.57"}     | ${"$3.57"}
    ${"3.574"}    | ${"$3.57"}
    ${"3.578"}    | ${"$3.57"}
    ${"$3.57"}    | ${"$3.57"}
    ${"6153"}     | ${"$6,153.00"}
    ${"6,153"}    | ${"$6,153.00"}
    ${"9876,153"} | ${"$9,876,153.00"}
  `("should format user input", ({ userInput, expected }) => {
    test(`
    Given the user inputs ${userInput}
    Then ${expected} is displayed`, async () => {
      const user = userEvent.setup();
      render(
        <LabeledCurrencyControl id="testCurrency" labelText="Test Currency" />
      );
      const input = screen.getByLabelText("Test Currency");
      await user.clear(input);
      await user.type(input, userInput);
      expect(input).toHaveValue(expected);
    });
  });
});
