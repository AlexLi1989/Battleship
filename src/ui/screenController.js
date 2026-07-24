//screen controller for rendering the game
import { createGame } from "../core/gameController.js";
import { createPlayer } from "../core/player.js";

function initScreen() {
  //create objects
  let player1 = createPlayer("Player 1", "human");
  let player2 = createPlayer("Computer", "computer");
  //initial placement for human player
  if (player1.type == "human") {
    player1.autoPlaceShips();
  }
  if (player2.type == "human") {
    player2.autoPlaceShips();
  }
  let game = createGame(player1, player2);

  //DOM related elements
  let gameContainer = document.querySelector(".container");
  let newPlayersBtn = document.querySelector(".new-players-btn");
  let player1Name = document.querySelector("#player-1-name");
  let player2Name = document.querySelector("#player-2-name");
  let player1HumanRadio = document.querySelector("#player-1-human");
  let player1ComputerRadio = document.querySelector("#player-1-computer");
  let player2HumanRadio = document.querySelector("#player-2-human");
  let player2ComputerRadio = document.querySelector("#player-2-computer");
  let newGameBtn = document.querySelector(".new-game-btn");
  let warning = document.querySelector(".warning");
  let result = document.querySelector(".result");
  let currentPlayerDisplay = document.querySelector(".current-player span");
  let player1BoardTitle = document.querySelector(".player-1.board-title");
  let player1Board = document.querySelector("#player-1-board");
  let player2BoardTitle = document.querySelector(".player-2.board-title");
  let player2Board = document.querySelector("#player-2-board");

  //update screen
  function updateScreen() {
    //clear both boards
    player1Board.innerHTML = "";
    player2Board.innerHTML = "";
    //get hits
    let player1HitShots = player1.getHitShots();
    let player2HitShots = player2.getHitShots();

    //render current player
    currentPlayerDisplay.textContent =
      game.isGameOver() === true ? "" : `${game.getCurrentPlayer().name}`;

    //render winner
    result.innerHTML =
      game.getWinner() !== null
        ? `<p>Winner: ${game.getWinner().name}</p>`
        : "";

    //render player's board
    let player1Grid = player1.getPlayerGrid();
    for (let i = 0; i < player1Grid.length; i++) {
      for (let j = 0; j < player1Grid[i].length; j++) {
        let cell = document.createElement("div");
        cell.dataset.row = i;
        cell.dataset.col = j;
        if (player1Grid[i][j] === null) cell.classList.add("clean");
        else if (player1Grid[i][j] === "missed") cell.classList.add("missed");
        else if (player1HitShots.includes(`${i},${j}`)) {
          cell.classList.add("hit");
        } else {
          cell.classList.add("player1-ship", "clean");
        }
        player1Board.appendChild(cell);
      }
    }
    let player2Grid = player2.getPlayerGrid();
    for (let i = 0; i < player2Grid.length; i++) {
      for (let j = 0; j < player2Grid[i].length; j++) {
        let cell = document.createElement("div");
        cell.dataset.row = i;
        cell.dataset.col = j;
        if (player2Grid[i][j] === null) cell.classList.add("clean");
        else if (player2Grid[i][j] === "missed") cell.classList.add("missed");
        else if (player2HitShots.includes(`${i},${j}`)) {
          cell.classList.add("hit");
        } else {
          cell.classList.add("player2-ship", "clean");
        }
        player2Board.appendChild(cell);
      }
    }

    //update board class if game over
    player2Board.classList.toggle("game-over", game.isGameOver());
  }
  player2Board.addEventListener("click", (event) => {
    //prevent click behavior if game is over
    if (game.isGameOver()) return;
    //clear messages and results
    warning.innerHTML = "";
    result.innerHTML = "";
    let clickedCell = event.target;
    if (clickedCell.classList.contains("clean")) {
      let row = parseInt(clickedCell.dataset.row);
      let col = parseInt(clickedCell.dataset.col);
      try {
        game.playRound(row, col);
      } catch (error) {
        warning.innerHTML = `<p>${error.message}</p>`;
      }
      updateScreen();
    }
  });
  updateScreen();
}

export { initScreen };
