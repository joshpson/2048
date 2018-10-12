import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.tiles = [];
    this.positions = {};
    this.createTile();
    this.createTile();
  }

  createTile() {
    let cell = Math.floor(Math.random() * 16 + 1);
    if (this.positions[cell]) {
      this.createTile();
    } else {
      let tile = new Tile({ cell: cell });
      this.positions[cell] = tile;
      this.tiles.push(tile);
    }
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
