import RetirementOverview from "./retirementOverview";

describe("RetirementOveriew", () => {
  test("creates with correct defaults", () => {
    const sut = new RetirementOverview();
    expect(sut.annualSalary).toBe(0);
  });

  describe("changeAnnualSalary", () => {
    test("updates AnnualSalary", () => {
      const sut = new RetirementOverview();
      sut.changeAnnualSalary(8_370.0);
      expect(sut.annualSalary).toBe(8_370.0);
    });
  });
});
