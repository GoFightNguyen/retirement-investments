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
      } else throw InvestmentError.createForPercent();
    } else throw InvestmentError.createForName();
  }
}

export enum InvestmentErrorType {
  Name = "NAME",
  Percent = "PERCENT",
}

export class InvestmentError extends Error {
  private constructor(
    public readonly type: InvestmentErrorType,
    message: string
  ) {
    super(message);
  }

  public static createForName = () =>
    new InvestmentError(InvestmentErrorType.Name, "Name is required");

  public static createForPercent = () =>
    new InvestmentError(
      InvestmentErrorType.Percent,
      "Percent must be between 0 and 100"
    );
}
