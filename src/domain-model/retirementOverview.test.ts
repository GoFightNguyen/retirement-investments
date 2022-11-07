import Investment from "./investment";
import RetirementOverview from "./retirementOverview";

describe("RetirementOveriew", () => {
  test("creates with correct defaults", () => {
    const sut = new RetirementOverview();
    expect(sut.annualSalary).toBe(0);
    expect(sut.moniesToInvest).toBe(0);
  });

  describe.each`
    annualSalary | moniesToInvest
    ${106_156}   | ${15_923.4}
    ${55_800}    | ${8_370.0}
    ${24_136.25} | ${3_620.44}
    ${0}         | ${0}
  `("changeAnnualSalary", ({ annualSalary, moniesToInvest }) => {
    test(`
    When I change my annual salary to ${annualSalary}
    Then my annual salary is ${annualSalary}}`, () => {
      const sut = new RetirementOverview();
      sut.changeAnnualSalary(annualSalary);
      expect(sut.annualSalary).toBe(annualSalary);
    });

    test(`
    When I change my annual salary to ${annualSalary}
    Then I should invest 15% of it, which is ${moniesToInvest}`, () => {
      const sut = new RetirementOverview();
      sut.changeAnnualSalary(annualSalary);
      expect(sut.moniesToInvest).toBe(moniesToInvest);
    });
  });

  test(`Given an existing investment named "401(k)"
        When I add another investment named "401(k)"
        Then an error is thrown
        And investments are untouched`, () => {
    const sut = new RetirementOverview();
    const existingInvestment = Investment.create("401(k)", 12);
    sut.addInvestment(existingInvestment);

    const newInvestment = Investment.create("401(k)", 2);
    expect(() => sut.addInvestment(newInvestment)).toThrowError(
      /an investment named 401\(k\) already exists/i
    );
    expect(sut.investments).toStrictEqual<Investment[]>([
      Investment.create("401(k)", 12),
    ]);
  });

  test(`Given an existing investment with a percent of 40%
        When I add an investment with a percent of 61%
        Then an error is thrown
        And investments are untouched`, () => {
    const sut = new RetirementOverview();
    const existingInvestment = Investment.create("401(k)", 40);
    sut.addInvestment(existingInvestment);

    const newInvestment = Investment.create("Roth IRA", 61);
    expect(() => sut.addInvestment(newInvestment)).toThrowError(
      /the total percentage of all investments cannot exceed 100%/i
    );
    expect(sut.investments).toStrictEqual<Investment[]>([
      Investment.create("401(k)", 40),
    ]);
  });

  test(`When I add an investment named "Roth IRA" of 6%
        And an investment named "403(b)" of 4.32%`, () => {
    const sut = new RetirementOverview();
    const investment1 = Investment.create("Roth IRA", 6);
    const investment2 = Investment.create("403(b)", 4.32);
    sut.addInvestment(investment1);
    sut.addInvestment(investment2);
    expect(sut.investments).toStrictEqual<Investment[]>([
      investment1,
      investment2,
    ]);
  });
});
