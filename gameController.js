//factory to create a game between two players

function createGame(player1, player2) {
  const REQUIRED_SHIPS_COUNT = 1; //low number for quick TDD test
  let currentPlayer = player1;
  let gameOver = false;
  let winner = null;
  function getCurrentPlayer() {
    return currentPlayer;
  }
  function playRound(row, col) {
    //check for setup phase is done
    if (
      player1.getShipsCount() !== REQUIRED_SHIPS_COUNT ||
      player2.getShipsCount() !== REQUIRED_SHIPS_COUNT
    ) {
      throw new Error("All ships must be placed before playing");
    }
    //check for isGameOver
    if (gameOver) {
      throw new Error("Game is over");
    }
    //logic to play a round
    let defensePlayer = currentPlayer === player1 ? player2 : player1;
    defensePlayer.beAttacked(row, col);
    //check if defense player is lost
    if (defensePlayer.isLost()) {
      gameOver = true;
      return (winner = currentPlayer);
    }
    //switch turn
    currentPlayer = defensePlayer;
    //logic for new current player is computer
    if (currentPlayer.type === "computer") {
      defensePlayer = currentPlayer === player1 ? player2 : player1;
      currentPlayer.takeTurn(defensePlayer);
      //check if defense player is lost
      if (defensePlayer.isLost()) {
        gameOver = true;
        return (winner = currentPlayer);
      }
      currentPlayer = defensePlayer;
    }
  }
  function isGameOver() {
    return gameOver;
  }
  function getWinner() {
    return winner;
  }
  return {
    getCurrentPlayer,
    playRound,
    isGameOver,
    getWinner,
  };
}

export { createGame };
