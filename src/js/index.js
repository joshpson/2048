import Game from "./game.js";

let currentGame = null;
let highScore = 0;

function preventKeyDefault(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    e.preventDefault();
  }
}

function newGameButton() {
  document.querySelector(".new-game").addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".result").innerText = "";
    document.querySelector(".score").innerText = "Score: 0";
    currentGame.removeControlListeners();
    initialize();
  });
}

function initialize() {
  currentGame = new Game();
  currentGame.build();
}

document.addEventListener("DOMContentLoaded", () => {
  initialize();
  document.addEventListener("keydown", preventKeyDefault);
  if (window.localStorage.highScore) {
    document.querySelector(".high-score").innerText =
      window.localStorage.highScore;
  }
  newGameButton();
});
