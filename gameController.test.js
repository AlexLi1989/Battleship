import { createShip } from "./ships.js";
import { createPlayer } from "./player.js";
import { createGameboard } from "./gameboard.js";
import { createGame } from "./gameController.js";

let player1;
let player2;
let computer;
let game;
beforeEach(() => {
  player1 = createPlayer("Player 1", "human");
  player2 = createPlayer("Player 2", "human");
  computer = createPlayer("Computer", "computer");
  game = createGame(player1, player2);
  player1.placePlayerShip("Patrol Boat", 0, 0, "horizontal");
  player2.placePlayerShip("Patrol Boat", 0, 0, "horizontal");
  computer.placePlayerShip("Patrol Boat", 0, 0, "horizontal");
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
test(`should call off game when one player's ships are all sunk and return the winner`, () => {
  game = createGame(player1, computer);
  game.playRound(0, 0);
  game.playRound(0, 1);
  expect(game.isGameOver()).toBe(true);
  expect(game.getWinner()).toBe(player1);
});
//mocking
test(`should call off game when one player's ships are all sunk and return the winner even if computer wins`, () => {
  game = createGame(player1, computer);
  computer.takeTurn = (enemyPlayer) => {
    enemyPlayer.beAttacked(0, 0); //sunk the ship
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
