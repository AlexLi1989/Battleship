import { createPlayer } from "./player.js";
import { createGameboard } from "./gameboard.js";

let computer;
let enemyBoard;
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
