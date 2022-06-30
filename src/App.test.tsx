import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("how much to invest", () => {
  test("dollar amount to invest", async () => {
    await givenMyAnnualSalaryIs("$106,156");
  });
});

async function givenMyAnnualSalaryIs(salary: string) {
  const user = userEvent.setup();
  render(<App />);
  const salaryInput = screen.getByLabelText("Annual Salary");
  await user.type(salaryInput, salary);
  expect(salaryInput).toHaveValue(salary);
}
