import Background from "./background.js";
import Grid from "./grid.js";
import Tile from "./tile.js";

function root() {
  return document.getElementById("root");
}

function addArrowListeners(grid) {
  document.addEventListener("keydown", e => {
    grid.transform(e.keyCode);
  });
}

function initialize() {
  let background = new Background({ size: 4 });
  let grid = new Grid();
  root().appendChild(background.returnContainer());
  root().appendChild(grid.returnContainer());
  addArrowListeners(grid);
}

document.addEventListener("DOMContentLoaded", initialize);
