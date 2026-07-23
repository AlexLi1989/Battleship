import { createGameboard } from "./gameboard.js";
//factory to create real player or computer player
function createPlayer(name, type) {
  let playerBoard = createGameboard(10);
  let choices = [];
  //create an array containing all cells of enemy board for computer player
  if (type === "computer") {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        choices.push([i, j]);
      }
    }
  }
  //scramble choices with fisher-yates shuffle(what a name lol) and pop the last cell each call
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  shuffle(choices);
  //take turn function for computer player to act
  function takeTurn(enemyPlayer) {
    if (type === "computer") {
      let target = choices.pop();
      enemyPlayer.beAttacked(target[0], target[1]);
    }
  }
  return {
    name,
    type,
    getPlayerGrid: () => playerBoard.getGrid(),
    placePlayerShip: (shipName, row, col, orientation) =>
      playerBoard.placeShip(shipName, row, col, orientation),
    beAttacked: (row, col) => playerBoard.receiveAttack(row, col),
    isLost: () => playerBoard.allShipsSunk(),
    getShipsCount: () => playerBoard.getShipsCount(),
    takeTurn,
  };
}

export { createPlayer };
