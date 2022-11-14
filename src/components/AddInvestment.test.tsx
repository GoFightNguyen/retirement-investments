import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Investment,
  InvestmentError,
} from "../domain-model";
import AddInvestment from "./AddInvestment";

describe("AddInvestment", () => {
  function setup() {
    const user = userEvent.setup();
    const mockTrigger = jest.fn();
    const utils = render(<AddInvestment onInvestmentAdded={mockTrigger} />);

    const nameInput = screen.getByLabelText(/investment/i);
    const changeNameInput = async (value: string) => {
      await user.type(nameInput, value);
    };

    const percentageInput = screen.getByLabelText(/percentage/i);
    const changePercentageInput = async (value: number) => {
      await user.type(percentageInput, value.toString());
    };

    const submitButton = screen.getByRole("button", { name: /submit/i });
    const submit = async () => await user.click(submitButton);

    return {
      ...utils,
      nameInput,
      changeNameInput,
      percentageInput,
      changePercentageInput,
      submit,
      mockTrigger,
    };
  }

  test("name defaults to empty", () => {
    const utils = setup();
    expect(utils.nameInput).toHaveValue("");
  });

  test("percentage defaults to empty", () => {
    const utils = setup();
    expect(utils.percentageInput).toHaveValue("");
  });

  test(`Given the user inputs "ROTH 401(k)"
        Then "ROTH 401(k)" is displayed`, async () => {
    const utils = setup();
    await utils.changeNameInput("ROTH 401(k)");
    expect(utils.nameInput).toHaveValue("ROTH 401(k)");
  });

  test(`Given the user inputs a percentage of 10.4
        Then 10.4 is displayed`, async () => {
    const utils = setup();
    await utils.changePercentageInput(10.4);
    expect(utils.percentageInput).toHaveValue("10.4%");
  });

  test(`Given the user inputs "ROTH 401(k)"
        And inputs the Percentage to 10.4
        When the user submits
        Then onInvestmentAdded is triggered with "ROTH 401(k)" and 10.4`, async () => {
    const utils = setup();
    await utils.changeNameInput("ROTH 401(k)");
    await utils.changePercentageInput(10.4);
    await utils.submit();
    const expected = Investment.create("ROTH 401(k)", 10.4);
    expect(utils.mockTrigger).toHaveBeenCalledWith(expected);
  });

  test(`Given the user inputs a valid name
        But inputs an invalid percentage
        When the user submits
        Then an error about the percentage is displayed
        And onInvestmentAdded is not triggered`, async () => {
    const utils = setup();
    await utils.changeNameInput("ROTH 401(k)");
    await utils.changePercentageInput(101);
    await utils.submit();

    const expectedError = InvestmentError.createForPercent().message;
    expect(utils.mockTrigger).not.toHaveBeenCalled();
    expect(screen.getByText(expectedError)).toBeInTheDocument();
  });

  test(`Given the user inputs a valid percentage
        But inputs an invalid name
        When the user submits
        Then an error about the name is displayed
        And onInvestmentAdded is not triggered`, async () => {
    const utils = setup();
    await utils.changeNameInput("   ");
    await utils.changePercentageInput(101);
    await utils.submit();

    const expectedError = InvestmentError.createForName().message;
    expect(utils.mockTrigger).not.toHaveBeenCalled();
    expect(screen.getByText(expectedError)).toBeInTheDocument();
  });
});
