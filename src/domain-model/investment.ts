export default class Investment {
  private constructor(
    private readonly _name: string,
    private readonly _percentage: number
  ) {}

  public get name(): string {
    return this._name;
  }

  public get percentage(): number {
    return this._percentage;
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
    } else throw new Error("Name is required.");
  }
}
