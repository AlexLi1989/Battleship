//factory for creating gameboard
const createGameboard = (size) => {
  let board = Array.from({ length: size }, () => {
    return Array.from({ length: size }, () => null);
  });
  let prevTarget = [];
  let placedShips = [];
  function getGrid() {
    return board;
  }
  function placeShip(ship, row, col, orientation) {
    //first check if the ship can be placed at the given position base on orientation
    if (orientation == "horizontal") {
      if (ship.length + col > size) {
        throw new Error(
          `Ship cannot be placed at (${row}, ${col}) horizontally`,
        );
      }
      for (let i = 0; i < ship.length; i++) {
        let currentCell = board[row][col + i];
        if (currentCell != null) {
          throw new Error(`Ship overlapped with ${currentCell.name}`);
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
      }
    }
    if (orientation == "vertical") {
      if (ship.length + row > size) {
        throw new Error(`Ship cannot be placed at (${row}, ${col}) vertically`);
      }
      for (let i = 0; i < ship.length; i++) {
        let currentCell = board[row + i][col];
        if (currentCell != null) {
          throw new Error(`Ship overlapped with ${currentCell.name}`);
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
      }
    }
    placedShips.push(ship);
  }
  function receiveAttack(row, col) {
    let target = board[row][col];
    if (row >= size || col >= size) {
      throw new Error(`Attack out of bounds`);
    } else if (prevTarget.includes(`${row},${col}`)) {
      throw new Error(`Cell already attacked`);
    } else if (board[row][col] === null) {
      board[row][col] = "missed";
      prevTarget.push(`${row},${col}`);
    } else {
      target.hit();
      prevTarget.push(`${row},${col}`);
    }
  }
  function allShipsSunk() {
    return placedShips.every((ship) => ship.isSunk());
  }
  return {
    getGrid,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

export { createGameboard };
