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

describe.each`
  annualSalary    | moniesToInvest
  ${"$106,156"}   | ${"15923.4"}
  ${"$55,800"}    | ${"8370"}
  ${"$24,136.25"} | ${"3620.44"}
`("Feature: how much to invest", ({ annualSalary, moniesToInvest }) => {
  test(`Given my annual salary is ${annualSalary}
        Then I am told to invest ${moniesToInvest}`, async () => {
    await givenMyAnnualSalaryIs(annualSalary);
  });
});
