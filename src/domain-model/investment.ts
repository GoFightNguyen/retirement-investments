export default class Investment {
  private constructor(
    private readonly _name: string,
    private readonly _percent: number
  ) {}

  public get name(): string {
    return this._name;
  }

  public get percent(): number {
    return this._percent;
  }

  /**
   *
   * @param name
   * @param percent The percentage of the Annual Salary contributed to this Investment. Range: [0,100]
   * @returns
   */
  public static create(name: string, percent: number) {
    if (name && name.trim()) {
      if (percent !== null && percent >= 0 && percent <= 100) {
        return new Investment(name.trim(), percent);
      } else throw InvestmentPercentError.create();
    } else throw InvestmentNameError.create();
  }
}

export class InvestmentNameError extends Error {
  private constructor() {
    super("Name is required");
  }
  public static create() {
    return new InvestmentNameError();
  }
}

export class InvestmentPercentError extends Error {
  private constructor() {
    super("Percent must be between 0 and 100");
  }
  public static create() {
    return new InvestmentPercentError();
  }
}
