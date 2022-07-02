import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

async function givenMyAnnualSalaryIs(salary: string) {
  const user = userEvent.setup();
  render(<App />);
  const salaryInput = screen.getByLabelText("Annual Salary");
  await user.type(salaryInput, salary);
  expect(salaryInput).toHaveValue(salary);
}

async function thenIAmToldToInvest(moniesToInvest: string) {
  expect(screen.getByText(moniesToInvest)).toBeInTheDocument();
}

describe.each`
  annualSalary | moniesToInvest
  ${"106156"}  | ${"15923.4"}
  ${"55800"}   | ${"8370"}
`("Feature: how much to invest", ({ annualSalary, moniesToInvest }) => {
  test(`Given my annual salary is ${annualSalary}
        Then I am told to invest ${moniesToInvest}`, async () => {
    await givenMyAnnualSalaryIs(annualSalary);
    await thenIAmToldToInvest(moniesToInvest);
  });
});
