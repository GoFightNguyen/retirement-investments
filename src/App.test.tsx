import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

async function givenMyAnnualSalaryIs(salary: string) {
  const user = userEvent.setup();
  render(<App />);
  const salaryInput = screen.getByLabelText("Annual Salary");
  await user.clear(salaryInput);
  await user.type(salaryInput, salary);
}

describe.each`
  annualSalary    | moniesToInvest
  ${"$106,156"}   | ${"$15,923.40"}
  ${"$55,800"}    | ${"$8,370.00"}
  ${"$24,136.25"} | ${"$3,620.44"}
`("Feature: how much to invest", ({ annualSalary, moniesToInvest }) => {
  test(`Given my annual salary is ${annualSalary}
        Then I should invest {moniesToInvest} in retirement`, async () => {
    await givenMyAnnualSalaryIs(annualSalary);
    await thenMyInvestmentInRetirementShouldBe(moniesToInvest);
  });
});

async function thenMyInvestmentInRetirementShouldBe(moniesToInvest: string) {
  const moniesToInvestNode = screen.getByText(
    /monies to invest in retirement/i
  );
  within(moniesToInvestNode).getByText(moniesToInvest);
}
