import Background from "./background.js";
import Grid from "./grid.js";
import Tile from "./tile.js";
import { throttle } from "lodash";

function root() {
  return document.querySelector(".game");
}

function keyHandler(e, grid) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    grid.transform(e.keyCode);
  }
}

function newGameButton() {
  document.querySelector(".new-game").addEventListener("click", e => {
    e.preventDefault();
    window.location.reload();
  });
}

function addArrowListeners(grid) {
  document.addEventListener("keydown", e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
    }
  });
  document.addEventListener(
    "keydown",
    _.throttle(e => keyHandler(e, grid), 300)
  );
}

function initialize() {
  let background = new Background({ size: 16 });
  let grid = new Grid();
  root().appendChild(background.returnContainer());
  root().appendChild(grid.returnContainer());
  grid.createTile();
  grid.createTile();
  addArrowListeners(grid);
  newGameButton();
}

document.addEventListener("DOMContentLoaded", initialize);
