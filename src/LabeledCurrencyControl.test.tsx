import React from "react";
import { render, screen } from "@testing-library/react";
import LabeledCurrencyControl from "./LabeledCurrencyControl";
import userEvent from "@testing-library/user-event";

describe("LabeledCurrencyControl", () => {
  test("should default to value $0.00", () => {
    render(
      <LabeledCurrencyControl
        id="testCurrency"
        labelText="Test Currency"
        onMoniesChange={() => {}}
      />
    );
    const input = screen.getByLabelText("Test Currency");
    expect(input).toHaveValue("$0.00");
  });

  describe.each`
    userInput     | expectedDisplayValue | expectedTriggerValue
    ${".1"}       | ${"$.10"}            | ${0.1}
    ${"3"}        | ${"$3.00"}           | ${3}
    ${"3.0"}      | ${"$3.00"}           | ${3.0}
    ${"3.57"}     | ${"$3.57"}           | ${3.57}
    ${"3.574"}    | ${"$3.57"}           | ${3.57}
    ${"3.578"}    | ${"$3.57"}           | ${3.57}
    ${"$3.57"}    | ${"$3.57"}           | ${3.57}
    ${"6153"}     | ${"$6,153.00"}       | ${6153}
    ${"6,153"}    | ${"$6,153.00"}       | ${6153}
    ${"9876,153"} | ${"$9,876,153.00"}   | ${9876153}
  `(
    "should handle user input",
    ({ userInput, expectedDisplayValue, expectedTriggerValue }) => {
      function setup() {
        const mockTrigger = jest.fn();
        const user = userEvent.setup();
        const utils = render(
          <LabeledCurrencyControl
            id="testCurrency"
            labelText="Test Currency"
            onMoniesChange={mockTrigger}
          />
        );

        const input = screen.getByLabelText("Test Currency");
        const changeCurrencyInput = async (value: string) => {
          await user.clear(input);
          await user.type(input, value);
        };

        return { ...utils, mockTrigger, input, changeCurrencyInput };
      }

      test(`
      Given the user inputs ${userInput}
      Then ${expectedDisplayValue} is displayed`, async () => {
        const utils = setup();
        await utils.changeCurrencyInput(userInput);
        expect(utils.input).toHaveValue(expectedDisplayValue);
      });

      test(`
      Given the user inputs ${userInput}
      Then onMoniesChange is triggered with ${expectedTriggerValue}`, async () => {
        const utils = setup();
        await utils.changeCurrencyInput(userInput);
        expect(utils.mockTrigger).toHaveBeenLastCalledWith(
          expectedTriggerValue
        );
      });
    }
  );
});
