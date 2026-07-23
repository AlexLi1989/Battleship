import { createShip } from "../src/core/ships.js";
import { createPlayer } from "../src/core/player.js";
import { createGameboard } from "../src/core/gameboard.js";
import { createGame } from "../src/core/gameController.js";

let player1;
let player2;
let computer;
let game;
const placeAllShipsForHuman = (player) => {
  player.placePlayerShip("Carrier", 0, 0, "horizontal");
  player.placePlayerShip("Battleship", 1, 0, "horizontal");
  player.placePlayerShip("Destroyer", 2, 0, "horizontal");
  player.placePlayerShip("Submarine", 3, 0, "horizontal");
  player.placePlayerShip("Patrol Boat", 4, 0, "horizontal");
};
beforeEach(() => {
  player1 = createPlayer("Player 1", "human");
  player2 = createPlayer("Player 2", "human");
  computer = createPlayer("Computer", "computer");
  placeAllShipsForHuman(player1);
  placeAllShipsForHuman(player2);
  game = createGame(player1, player2);
});
test(`should switch turn after one player's action`, () => {
  expect(game.getCurrentPlayer()).toBe(player1);
  game.playRound(0, 1); //trigger should be on game controller
  expect(game.getCurrentPlayer()).toBe(player2);
});
test(`should automatically take a turn if it is a computer player's turn`, () => {
  game = createGame(player1, computer);
  expect(game.getCurrentPlayer()).toBe(player1);
  game.playRound(0, 1);
  expect(game.getCurrentPlayer()).toBe(player1);
});
//mocking
test(`should call off game when one player's ships are all sunk and return the winner`, () => {
  game = createGame(player1, computer);
  computer.isLost = () => true;
  game.playRound(9, 9);
  expect(game.isGameOver()).toBe(true);
  expect(game.getWinner()).toBe(player1);
});
//mocking
test(`should call off game when one player's ships are all sunk and return the winner even if computer wins`, () => {
  game = createGame(player1, computer);
  computer.takeTurn = (enemyPlayer) => {
    player1.isLost = () => true;
    enemyPlayer.beAttacked(0, 1); //sunk the ship
  };
  game.playRound(0, 1);
  expect(game.isGameOver()).toBe(true);
  expect(game.getWinner()).toBe(computer);
});
test(`should not allow play round before all ships are placed`, () => {
  let player3 = createPlayer("player3", "human");
  let player4 = createPlayer("player4", "human");
  game = createGame(player3, player4);
  expect(() => {
    game.playRound(0, 0);
  }).toThrow("All ships must be placed before playing");
});
