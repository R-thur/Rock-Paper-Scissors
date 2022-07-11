"use strict";

// Player
const player = document.getElementById("player");
let playerBtn = document.querySelector(".playerbtn");

let playerSelection = "click";
let playerEndTurn;

// Computer
const computer = document.getElementById("computer");
let computerBtn = document.querySelector(".computerbtn");

// Rounds
let scorePlayer = document.querySelector(".scoreboard__player");
let scoreComputer = document.querySelector(".scoreboard__computer");
let scoreBoard = document.querySelector(".scoreboard");
let colon = document.querySelector(".scoreboard__colon");

// Menu
let newGame = document.querySelector(".new__game");
let howToPlay = document.querySelector(".how_to_play");

// Color, text and value toggler - Player
const switchElement = function (newtext) {
  player.textContent = newtext;
  playerSelection = newtext;

  if (newtext == "rock") {
    player.className = "rock";
  } else if (newtext == "paper") {
    player.className = "paper";
  } else if (newtext == "scissors") {
    player.className = "scissors";
  } else {
    player.className = "playerbtn";
  }
};

// Main menu transition
player.addEventListener("click", function () {
  computer.textContent = "ai status";
  computer.className = "computerbtn";
  player.className = "playerbtn_click";
  player.textContent = "click me";
  scoreBoard.classList.remove("hidden");

  // Rsp Selector

  player.addEventListener("click", function () {
    computer.className = "computer_selecting";
    computer.textContent = "selecting";
    if (player.textContent == "click me") {
      switchElement("rock");
    } else if (player.textContent == "rock") {
      switchElement("paper");
    } else if (player.textContent == "paper") {
      switchElement("scissors");
    } else {
      switchElement("rock");
    }
  });
});

//                      Game logic

// Computer's 'AI'
function computerRandomizer() {
  const rsp = ["rock", "scissors", "paper"];
  return rsp[Math.trunc(Math.random() * rsp.length)];
}

// Game rules -> Round winner
let playerRoundsWon = 0;
let computerRoundsWon = 0;
let tieRounds = 1;

const animateWinner = function (winner, winnerclass, loser, loserclass) {
  winner.className = winnerclass;
  loser.className = loserclass;
};

const switchGlow = function (playerSelection, computerSelection) {
  if (tieRounds % 2 == 0) {
    computer.className = `${computerSelection}2`;
    player.className = `${playerSelection}2`;
  } else {
    computer.className = computerSelection;
    player.className = playerSelection;
  }
};

const calcRoundWinner = function (computerSelection, playerSelection) {
  if (playerSelection == computerSelection) {
    switchGlow(playerSelection, computerSelection);
    tieRounds++;
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    animateWinner(player, "rock2", computer, "scissors");
    playerRoundsWon++;
    scorePlayer.textContent = playerRoundsWon;
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    animateWinner(computer, "rock2", player, "scissors");
    computerRoundsWon++;
    scoreComputer.textContent = computerRoundsWon;
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    animateWinner(player, "scissors2", computer, "paper");
    playerRoundsWon++;
    scorePlayer.textContent = playerRoundsWon;
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    animateWinner(computer, "scissors2", player, "paper");
    computerRoundsWon++;
    scoreComputer.textContent = computerRoundsWon;
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    animateWinner(player, "paper2", computer, "rock");
    playerRoundsWon++;
    scorePlayer.textContent = playerRoundsWon;
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    animateWinner(computer, "paper2", player, "rock");
    computerRoundsWon++;
    scoreComputer.textContent = computerRoundsWon;
  }
};

//Game winner
const gameWinner = (computer, player) =>
  computer > player
    ? console.log(`computer won ${computer} : ${player}`)
    : console.log(`player won ${player} : ${computer}`);

const animateWinLose = function () {
  if (playerRoundsWon == 3) {
    player.className = "paper2";
    player.textContent = "you";
    computer.className = "paper2";
    computer.textContent = "win!";
    newGame.className = "newgame__winner";
    howToPlay.className = "newgame__winner";
    scorePlayer.className = "scoreboard__end";
    scoreComputer.className = "scoreboard__end";
    colon.className = "scoreboard__colon2";
  } else if (computerRoundsWon == 3) {
    player.className = "playerbtn";
    player.textContent = "lost";
    computer.className = "lost";
    howToPlay.className = "lost";
    scorePlayer.className = "scoreboard__end";
    scoreComputer.className = "scoreboard__end";
    colon.className = "scoreboard__colon2";
    newGame.className = "newgame__loser";
  }
};

// Right click - game start
player.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  if (
    playerBtn.textContent == "rock" ||
    playerBtn.textContent == "paper" ||
    playerBtn.textContent == "scissors"
  ) {
    playerEndTurn = playerSelection;

    let aiSelection = computerRandomizer();
    console.log(`computer ${aiSelection}`);
    console.log(`player ${playerEndTurn}`);

    computer.textContent = aiSelection;

    calcRoundWinner(aiSelection, playerEndTurn);
    console.log(computerRoundsWon, playerRoundsWon);

    animateWinLose();
    if (playerRoundsWon == 3 || computerRoundsWon == 3) {
      document.getElementById("player").style.pointerEvents = "none";
    }
  }
});

newGame.addEventListener("click", function () {
  playerRoundsWon = 0;
  computerRoundsWon = 0;
  tieRounds = 1;
  computer.textContent = "ai status";
  computer.className = "computerbtn";
  player.className = "playerbtn_click";
  player.textContent = "click me";
  scoreBoard.classList.remove("hidden");
  scoreComputer.textContent = "0";
  scorePlayer.textContent = "0";
  scorePlayer.className = "scoreboard__player";
  scoreComputer.className = "scoreboard__computer";
  colon.className = "scoreboard__colon";
  newGame.className = "new__game";
  howToPlay.className = "how_to_play";
  document.getElementById("player").style.pointerEvents = "all";
});

how_to_play.addEventListener("click", function () {});
