//factory for creating ship objects

const createShip = (name, length) => {
  let hits = 0;
  //hit function that increase number of hits
  function hit() {
    hits++;
  }
  //is sunk function to calculate whether ship is considered sunk base on length and hits
  function isSunk() {
    return hits >= length;
  }
  return {
    name,
    length,
    hit,
    isSunk,
  };
};

export { createShip };
