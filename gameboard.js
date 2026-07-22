//factory for creating gameboard
const createGameboard = (size) => {
  let board = Array.from({ length: size }, () => {
    return Array.from({ length: size }, () => null);
  });
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
        board[row][col + i] = ship;
      }
    }
    if (orientation == "vertical") {
      if (ship.length + row > size) {
        throw new Error(`Ship cannot be placed at (${row}, ${col}) vertically`);
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
      }
    }
  }
  return {
    getGrid,
    placeShip,
  };
};

export { createGameboard };
