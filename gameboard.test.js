import { createGameboard } from "./gameboard.js";
import { createShip } from "./ships.js";
let board;
let submarine;
beforeEach(() => {
  board = createGameboard(10); // create a 10x10 gameboard
  submarine = createShip("submarine", 2); // create a 2-unit submarine
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
  board.placeShip(submarine, 0, 0, `horizontal`);
  expect(board.getGrid()[0][0]).toBe(submarine);
  expect(board.getGrid()[0][1]).toBe(submarine);
  expect(board.getGrid()[0][2]).toBe(null);
});
test(`should throw an error when trying to place a ship outside the grid`, () => {
  expect(() => {
    board.placeShip(submarine, 10, 10, `horizontal`);
  }).toThrow(`Ship cannot be placed at (10, 10) horizontally`);
});
test(`should throw an error when trying to overlap ships`, () => {
  board.placeShip(submarine, 0, 0, "horizontal");
  const destroyer = createShip("destroyer", 3);
  expect(() => {
    board.placeShip(destroyer, 0, 0, "horizontal");
  }).toThrow(`Ship overlapped with submarine`);
});
test(`should record a missed shot on correct cell`, () => {
  board.receiveAttack(0, 0);
  expect(board.getGrid()[0][0]).toBe("missed");
});
test(`should record a hit to the correct ship`, () => {
  board.placeShip(submarine, 0, 0, "horizontal");
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  expect(submarine.isSunk()).toBe(true);
});
test(`should tell if all ships have been sunk`, () => {
  board.placeShip(submarine, 0, 0, "horizontal");
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  expect(board.allShipsSunk()).toBe(true);
});
test(`should tell if not all ships have been sunk`, () => {
  board.placeShip(submarine, 0, 0, "horizontal");
  expect(board.allShipsSunk()).toBe(false);
});
