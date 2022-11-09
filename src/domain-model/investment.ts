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
      } else throw new Error("Percent must be between 0 and 100");
    } else throw InvestmentNameError.create();
  }
}

export class InvestmentNameError extends Error {
  public static create() {
    return new InvestmentNameError();
  }
  private constructor() {
    super("Name is required");
  }
}
