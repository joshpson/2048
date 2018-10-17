import Game from "./game.js";

let currentGame = null;

function newGameButton(game) {
  document.querySelector(".new-game").addEventListener("click", e => {
    e.preventDefault();
    currentGame.removeArrowListeners();
    initialize();
  });
}

function initialize() {
  currentGame = new Game();
  currentGame.build();
}

document.addEventListener("DOMContentLoaded", () => {
  initialize();
  newGameButton();
});
