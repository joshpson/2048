import Background from "./background.js";
import Grid from "./grid.js";

import Tile from "./tile.js";

function root() {
  return document.getElementById("root");
}

function addArrowListeners() {
  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 37:
        console.log("left");
        break;
      case 38:
        console.log("up");
        break;
      case 39:
        console.log("right");
        break;
      case 40:
        console.log("down");
        break;
      default:
        break;
    }
  });
}

function initialize() {
  let background = new Background({ size: 4 });
  let grid = new Grid();
  root().appendChild(background.returnContainer());
  root().appendChild(grid.returnContainer());
  addArrowListeners();
}

document.addEventListener("DOMContentLoaded", initialize);
