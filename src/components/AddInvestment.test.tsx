import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddInvestment from "./AddInvestment";

describe("AddInvestment", () => {
  function setup() {
    const user = userEvent.setup();
    const utils = render(<AddInvestment />);

    const nameInput = screen.getByLabelText(/investment/i);
    const changeNameInput = async (value: string) => {
      await user.type(nameInput, value);
    };

    return { ...utils, nameInput, changeNameInput };
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
});
