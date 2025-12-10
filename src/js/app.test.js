jest.mock("../css/style.css", () => ({}));
jest.mock("../img/goblin.png", () => "test-goblin.png");

// import Game from "./app";

test("Jest is configured correctly", () => {
  expect(1 + 1).toBe(2);
});
