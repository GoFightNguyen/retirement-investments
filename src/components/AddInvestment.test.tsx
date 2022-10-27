import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    const submitButton = screen.getByRole("button", { name: /submit/i });
    const submit = async () => await user.click(submitButton);

    return { ...utils, nameInput, changeNameInput, submit, mockTrigger };
  }

  test("name defaults to empty", () => {
    const utils = setup();
    expect(utils.nameInput).toHaveValue("");
  });

  test(`Given the user inputs "ROTH 401(k)"
        Then "ROTH 401(k)" is displayed`, async () => {
    const utils = setup();
    await utils.changeNameInput("ROTH 401(k)");
    expect(utils.nameInput).toHaveValue("ROTH 401(k)");
  });

  test(`Given the user inputs "ROTH 401(k)"
        When the user submits
        Then onInvestmentAdded is triggered with "ROTH 401(k)"`, async () => {
    const utils = setup();
    await utils.changeNameInput("ROTH 401(k)");
    await utils.submit();
    expect(utils.mockTrigger).toHaveBeenCalledWith("ROTH 401(k)");
  });
});
