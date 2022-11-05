import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabeledPercentageControl from "./LabeledPercentageControl";

describe("LabeledPercentageControl", () => {
  test("should default to empty", () => {
    render(<LabeledPercentageControl onPercentageChange={() => {}} />);
    const input = screen.getByLabelText("Percentage");
    expect(input).toHaveDisplayValue("");
  });

  // TODO: min, max, required, whitespace/letters/invalid
  describe.each`
    userInput   | expectedDisplayValue | expectedTriggerValue
    ${"0"}      | ${"0%"}              | ${0}
    ${"3"}      | ${"3%"}              | ${3}
    ${"3.0"}    | ${"3.0%"}            | ${3}
    ${"3.2"}    | ${"3.2%"}            | ${3.2}
    ${"3.574"}  | ${"3.57%"}           | ${3.57}
    ${"3.578"}  | ${"3.57%"}           | ${3.57}
    ${"10.05"}  | ${"10.05%"}          | ${10.05}
    ${"10.5"}   | ${"10.5%"}           | ${10.5}
    ${"10.574"} | ${"10.57%"}          | ${10.57}
  `(
    "should handle user input",
    ({ userInput, expectedDisplayValue, expectedTriggerValue }) => {
      function setup() {
        const mockTrigger = jest.fn();
        const user = userEvent.setup();
        const utils = render(
          <LabeledPercentageControl onPercentageChange={mockTrigger} />
        );
        const input = screen.getByLabelText("Percentage");
        const changePercentageInput = async (value: string) => {
          await user.clear(input);
          await user.type(input, value);
        };

        return { ...utils, input, changePercentageInput, mockTrigger };
      }

      test(`
      Given the user inputs ${userInput}
      Then ${expectedDisplayValue} is displayed`, async () => {
        const utils = setup();
        await utils.changePercentageInput(userInput);
        expect(utils.input).toHaveDisplayValue(expectedDisplayValue);
      });

      test(`
      Given the user inputs ${userInput}
      Then onPercentageChange is triggered with ${expectedTriggerValue}`, async () => {
        const utils = setup();
        await utils.changePercentageInput(userInput);
        expect(utils.mockTrigger).toHaveBeenCalledWith(expectedTriggerValue);
      });
    }
  );
});
