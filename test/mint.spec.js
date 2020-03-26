import { hello, validateDiscorse, validate, validateGithub } from "../src/mint";

describe("hello", () => {
  it("should reuturn hello", () => {
    expect(hello()).toBe("hello");
  });
});

describe("validateDiscorse:", () => {
  describe("correct values", () => {
    it("should pass", () => {
      expect(validateDiscorse(``)).toBe(true);
      expect(validateDiscorse(`port.oceanprotocol.com`)).toBe(true);
      expect(validateDiscorse(`forum.aragon.org`)).toBe(true);
    });
  });
  describe("test if function", () => {
    it("should pass", () => {
      expect(typeof validate).toBe("function");
    });
  });
  describe(`has ":" or trailing "/"`, () => {
    it("should return fail string", () => {
      expect(validateDiscorse(`https://port.oceanprotocol.com/`)).toBe(
        "Invalid: ensure there is no `http://` or trailing `/`"
      );
      expect(validateDiscorse(`https://port.oceanprotocol.com`)).toBe(
        "Invalid: ensure there is no `http://` or trailing `/`"
      );
      expect(validateDiscorse(`port.oceanprotocol.com/`)).toBe(
        "Invalid: ensure there is no `http://` or trailing `/`"
      );
    });
  });
});

describe("validateGithub", () => {
  describe("correct values", () => {
    it("should pass", () => {
      expect(validateGithub("")).toBe(true);
      expect(validateGithub("pythonpete32/aracred-cli")).toBe(true);
      expect(validateGithub("aragon/aragon")).toBe(true);
    });
  });
  describe("incorrect values", () => {
    it("should fail with string", () => {
      expect(validateGithub("pythonpete32/aracred-cli/")).toBe(
        "Invalid: ensure there is no `http://`, `@`, or trailing `/`"
      );
      expect(validateGithub("@pythonpete32/aracred-cli")).toBe(
        "Invalid: ensure there is no `http://`, `@`, or trailing `/`"
      );
      expect(
        validateGithub("https://github.com/pythonpete32/aracred-cli.git")
      ).toBe("Invalid: ensure there is no `http://`, `@`, or trailing `/`");
    });
  });
});
