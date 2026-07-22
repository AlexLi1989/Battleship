import { createShip } from "./ships.js";

let submarine;
beforeEach(() => {
  submarine = createShip("Submarine", 3);
});

test(`isSunk should return false on a newly created ship`, () => {
  expect(submarine.isSunk()).toBe(false);
});

test(`isSunk should return true after 3 hit()`, () => {
  submarine.hit();
  submarine.hit();
  submarine.hit();
  expect(submarine.isSunk()).toBe(true);
});
