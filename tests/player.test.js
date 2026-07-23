import { createPlayer } from "../src/core/player.js";
import { createGameboard } from "../src/core/gameboard.js";

let computer;
let dummyPlayer;
beforeEach(() => {
  computer = createPlayer("Computer", "computer");
  dummyPlayer = createPlayer("Dummy", "human");
});

test(`should not receive cell already attacked error after attacking all cells`, () => {
  for (let i = 0; i < 100; i++) {
    expect(() => {
      computer.takeTurn(dummyPlayer);
    }).not.toThrow("Cell already attacked");
  }
});

test(`computer should place all 5 ships automatically upon creation`, () => {
  expect(computer.getShipsCount()).toBe(5);
});
