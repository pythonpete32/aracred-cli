// eslint-disable-next-line import/named
import sayHello from "../src/dex";

console.log(sayHello);
describe("sayHello", () => {
  it("should say hello", () => {
    expect(sayHello("Aaron")).toBe("Hello, Aaron!");
  });
});

test("sayHello", () => {
  expect(sayHello("foo")).toBe("Hello, foo!");
});
