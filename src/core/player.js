import { createGameboard } from "./gameboard.js";

//factory to create real player or computer player
function createPlayer(name, type) {
  let playerBoard = createGameboard(10);
  const DEFAULT_SHIP_NAMES = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  //--------------------------------------------------
  // create an array containing all cells of enemy board for computer player
  let choices = [];
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

  //take turn function for computer player to act,adding smarter AI
  let highPriorityTarget = [];
  //helper function for adding high priority target
  function addHighPriority(x, y) {
    let index = choices.findIndex((item) => item[0] === x + 1 && item[1] === y);
    if (index != -1) {
      choices.splice(index, 1);
      highPriorityTarget.push([x + 1, y]);
    }
    index = choices.findIndex((item) => item[0] === x - 1 && item[1] === y);
    if (index != -1) {
      choices.splice(index, 1);
      highPriorityTarget.push([x - 1, y]);
    }
    index = choices.findIndex((item) => item[0] === x && item[1] === y + 1);
    if (index != -1) {
      choices.splice(index, 1);
      highPriorityTarget.push([x, y + 1]);
    }
    index = choices.findIndex((item) => item[0] === x && item[1] === y - 1);
    if (index != -1) {
      choices.splice(index, 1);
      highPriorityTarget.push([x, y - 1]);
    }
  }
  function takeTurn(enemyPlayer) {
    if (type === "computer") {
      let startSunk = enemyPlayer.getSunkCount();
      if (highPriorityTarget.length > 0) {
        let target = highPriorityTarget.pop();
        enemyPlayer.beAttacked(target[0], target[1]);
        if (
          enemyPlayer.getPlayerGrid()[target[0]][target[1]] !== null &&
          enemyPlayer.getPlayerGrid()[target[0]][target[1]] !== "missed"
        ) {
          addHighPriority(target[0], target[1]);
        }
      } else {
        let target = choices.pop();
        enemyPlayer.beAttacked(target[0], target[1]);
        //follow up if target is a hit
        if (
          enemyPlayer.getPlayerGrid()[target[0]][target[1]] !== null &&
          enemyPlayer.getPlayerGrid()[target[0]][target[1]] !== "missed"
        ) {
          addHighPriority(target[0], target[1]);
        }
      }
      let afterSunk = enemyPlayer.getSunkCount();
      if (afterSunk !== startSunk) {
        for (const cell of highPriorityTarget) {
          choices.push(cell);
        }
        shuffle(choices);
        highPriorityTarget = [];
      }
    }
  }
  //--------------------------------------------------

  //helper function for randomize placement of ships
  function autoPlaceShips() {
    DEFAULT_SHIP_NAMES.forEach((shipName) => {
      let isPlaced = false;
      while (!isPlaced) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        let orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
        //use try..catch for crash test as we thrown error for all invalid cases
        try {
          playerBoard.placeShip(shipName, row, col, orientation);
          isPlaced = true;
        } catch (error) {}
      }
    });
  }
  //auto placement of ships if player is computer
  if (type === "computer") {
    autoPlaceShips();
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
    getHitShots: () => playerBoard.getHitShots(),
    takeTurn,
    autoPlaceShips,
    getSunkCount: () => playerBoard.getSunkShipsCount(),
  };
}

export { createPlayer };
