export default class RetirementOverview {
  private static desiredRetirementPercentage = 0.15;

  private _annualSalary: number = 0;
  public get annualSalary(): number {
    return this._annualSalary;
  }

  public changeAnnualSalary(annualSalary: number) {
    this._annualSalary = annualSalary;
  }
}
