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

function addArrowListeners(grid) {
  document.addEventListener("keydown", e => {
    e.preventDefault();
  });
  document.addEventListener(
    "keydown",
    _.throttle(e => keyHandler(e, grid), 250)
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
}

document.addEventListener("DOMContentLoaded", initialize);
