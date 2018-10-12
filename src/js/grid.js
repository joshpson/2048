import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.tiles = [];
    this.positions = {};
    this.createTile();
  }

  createTile() {
    let cell = Math.floor(Math.random() * 16 + 1);
    let tile = new Tile({ cell: cell });
    this.tiles.push(tile);
  }

  returnContainer() {
    let div = document.createElement("div");
    div.className = "grid";
    this.tiles.forEach(tile => {
      div.appendChild(tile.createDiv());
    });
    return div;
  }
}
