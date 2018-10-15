import Background from "./background.js";
import Grid from "./grid.js";
import Tile from "./tile.js";

function root() {
  return document.querySelector(".game");
}

function addArrowListeners(grid) {
  document.addEventListener("keydown", e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
      grid.transform(e.keyCode);
    }
  });
}

function initialize() {
  let background = new Background({ size: 4 });
  let grid = new Grid();
  root().appendChild(background.returnContainer());
  root().appendChild(grid.returnContainer());
  grid.createTile();
  grid.createTile();
  addArrowListeners(grid);
}

document.addEventListener("DOMContentLoaded", initialize);
