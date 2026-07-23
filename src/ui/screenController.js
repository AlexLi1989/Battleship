//screen controller for rendering the game
import { createGame } from "../core/gameController.js";
import { createPlayer } from "../core/player.js";

function initScreen() {
  //create objects
  let player1 = createPlayer("Player 1", "human");
  let player2 = createPlayer("Computer", "computer");
  //test placement
  player1.placePlayerShip("Carrier", 0, 0, "horizontal");
  player1.placePlayerShip("Battleship", 1, 0, "horizontal");
  player1.placePlayerShip("Destroyer", 2, 0, "horizontal");
  player1.placePlayerShip("Submarine", 3, 0, "horizontal");
  player1.placePlayerShip("Patrol Boat", 4, 0, "horizontal");
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
  let currentPlayerDisplay = document.querySelector(".current-player");
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
  }
  player2Board.addEventListener("click", (event) => {
    let clickedCell = event.target;
    if (clickedCell.classList.contains("clean")) {
      let row = parseInt(clickedCell.dataset.row);
      let col = parseInt(clickedCell.dataset.col);
      game.playRound(row, col);
      updateScreen();
    }
  });
  updateScreen();
}

export { initScreen };
