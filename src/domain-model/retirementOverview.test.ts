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
});
