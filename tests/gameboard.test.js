import { createGameboard } from "../src/core/gameboard.js";
import { createShip } from "../src/core/ships.js";
let board;
beforeEach(() => {
  board = createGameboard(10); // create a 10x10 gameboard
});
test(`should initialize a 10x10 grid filled with null`, () => {
  const expectedGrid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => null),
  );
  //as we are comparing array to array toBe will always fail as it will compare reference not value
  //so we use toEqual instead of toBe
  expect(board.getGrid()).toEqual(expectedGrid);
});
test(`should place a submarine at 0,0 and 0,1, and other cell remain null`, () => {
  board.placeShip("Submarine", 0, 0, `horizontal`);
  expect(board.getGrid()[0][0].name).toBe("Submarine");
  expect(board.getGrid()[0][1].name).toBe("Submarine");
  expect(board.getGrid()[0][2].name).toBe("Submarine");
  expect(board.getGrid()[0][3]).toBe(null);
});
test(`should throw an error when trying to place a ship outside the grid`, () => {
  expect(() => {
    board.placeShip("Submarine", 10, 10, `horizontal`);
  }).toThrow(`Ship cannot be placed at (10, 10) horizontally`);
});
test(`should throw an error when trying to overlap ships`, () => {
  board.placeShip("Submarine", 0, 0, "horizontal");
  expect(() => {
    board.placeShip("Destroyer", 0, 0, "horizontal");
  }).toThrow(`Ship overlapped with Submarine`);
});
test(`should record a missed shot on correct cell`, () => {
  board.receiveAttack(0, 0);
  expect(board.getGrid()[0][0]).toBe("missed");
});
test(`should record hit to the correct ship and tell if all ships have been sunk`, () => {
  board.placeShip("Submarine", 0, 0, "horizontal");
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(0, 2);
  expect(board.allShipsSunk()).toBe(true);
});
test(`should tell if not all ships have been sunk`, () => {
  board.placeShip("Submarine", 0, 0, "horizontal");
  expect(board.allShipsSunk()).toBe(false);
});
