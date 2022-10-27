import React from "react";
import {
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";

describe.each`
  annualSalary    | moniesToInvest
  ${"$106,156"}   | ${"$15,923.40"}
  ${"$55,800"}    | ${"$8,370.00"}
  ${"$24,136.25"} | ${"$3,620.44"}
`("Feature: how much to invest", ({ annualSalary, moniesToInvest }) => {
  test(`Given my annual salary is ${annualSalary}
        Then I should invest {moniesToInvest} in retirement`, async () => {
    const { user } = setup();
    await givenMyAnnualSalaryIs(annualSalary, user);
    await thenMyInvestmentInRetirementShouldBe(moniesToInvest);
  });
});

/*
When investing 10% into a ROTH 401(k)
        Then I am investing 10,615.60
        And have 5,307.80 left to invest
*/
describe("Percentage-based investment", () => {
  test(`Given my annual salary is $106,156
        When adding an investment into a ROTH 401(k)`, async () => {
    const { user } = setup();
    await givenMyAnnualSalaryIs("$106,156", user);
    await whenAddingAnInvestment("ROTH 401(k)", user);
  });
});

function setup() {
  const user = userEvent.setup();
  render(<App />);
  return {
    user,
  };
}

async function givenMyAnnualSalaryIs(salary: string, user: UserEvent) {
  const salaryInput = screen.getByLabelText("Annual Salary");
  await user.clear(salaryInput);
  await user.type(salaryInput, salary);
}

async function whenAddingAnInvestment(investmentName: string, user: UserEvent) {
  const addInvestmentNode = screen.getByText("+");
  await user.click(addInvestmentNode);
  const investmentNameInput = await screen.findByLabelText(/investment/i);
  await user.type(investmentNameInput, investmentName);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(investmentName)).toBeInTheDocument();
  });
}

async function thenMyInvestmentInRetirementShouldBe(moniesToInvest: string) {
  const moniesToInvestNode = screen.getByText(
    /monies to invest in retirement/i
  );
  within(moniesToInvestNode).getByText(moniesToInvest);
}
