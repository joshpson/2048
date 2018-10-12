import Grid from "./grid.js";

function root() {
  return document.getElementById("root");
}

function initialize() {
  let initialGrid = new Grid({ size: 4 });
  root().appendChild(initialGrid.returnGrid());
}

document.addEventListener("DOMContentLoaded", initialize);
