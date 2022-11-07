import Investment from "./investment";

describe("Investment", () => {
  describe.each`
    name
    ${""}
    ${"   "}
    ${"\t"}
    ${null}
    ${undefined}
  `("create", ({ name }) => {
    test(`Given an invalid name: ${name}
          Then an error is thrown`, () =>
      expect(() => Investment.create(name, 7)).toThrowError(
        /name is required/i
      ));
  });

  describe.each`
    name
    ${"401(k)"}
    ${"Roth 401(k)"}
  `("create", ({ name }) => {
    test(`Given a valid name: ${name}
          Then creation is successful`, () =>
      expect(() => Investment.create(name, 7)).not.toThrowError());
  });

  test("create removes extra whitespace from name", () => {
    const actual = Investment.create("   Roth 401(k)\t", 7);
    expect(actual.name).toBe("Roth 401(k)");
  });

  describe.each`
    percent
    ${-0.01}
    ${-0.1}
    ${-1}
    ${100.01}
    ${100.1}
    ${101}
    ${null}
    ${undefined}
  `("create", ({ percent }) => {
    test(`Given an invalid percent: ${percent}
          Then an error is thrown`, () => {
      expect(() => Investment.create("401(k)", percent)).toThrowError(
        /percent must be between 0 and 100/i
      );
    });
  });

  describe.each`
    percent
    ${0}
    ${5}
    ${4.57}
    ${100}
  `("create", ({ percent }) => {
    test(`Given a valid percent: ${percent}
          Then creation is successful`, () => {
      expect(() => Investment.create("401(k)", percent)).not.toThrowError();
    });
  });
});
