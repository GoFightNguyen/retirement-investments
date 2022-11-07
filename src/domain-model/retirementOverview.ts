import Investment from "./investment";

/**
 * Create a function that will calculate the percentage of a number, rounded to two decimal places
 *
 * @param percent
 * @returns
 */
const percentOf = (percent: number) => (money: number) =>
  Number((money * percent).toFixed(2));

export default class RetirementOverview {
  private static desiredRetirementPercentage = 0.15;
  private static desiredPercentOf = percentOf(
    RetirementOverview.desiredRetirementPercentage
  );

  private _annualSalary: number = 0;
  public get annualSalary(): number {
    return this._annualSalary;
  }

  private _moniesToInvest: number = 0;
  public get moniesToInvest(): number {
    return this._moniesToInvest;
  }

  private _investments: Investment[] = [];
  public get investments(): ReadonlyArray<Investment> {
    return this._investments;
  }

  public changeAnnualSalary(annualSalary: number) {
    this._annualSalary = annualSalary;
    this._moniesToInvest = RetirementOverview.desiredPercentOf(annualSalary);
  }

  public addInvestment(investment: Investment) {
    const names = this._investments.map((i) => i.name);
    if (names.includes(investment.name))
      throw new Error(`An investment named ${investment.name} already exists`);

    let totalPercentage = investment.percent;
    this._investments.forEach((i) => (totalPercentage += i.percent));
    if (totalPercentage > 100)
      throw new Error(
        `The total percentage of all investments cannot exceed 100%`
      );

    this._investments.push(investment);
  }
}
