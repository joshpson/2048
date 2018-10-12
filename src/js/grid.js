import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.tiles = [];
    this.positions = {};
    this.createTile();
    this.createTile();
  }

  transform(keyCode) {
    switch (keyCode) {
      case 37: //left
        this.tiles.forEach(tile => {
          let row = tile.className.charAt(5);
          tile.grab().className = `tile-${row}-1`;
          tile.className = `tile-${row}-1`;
        });
        break;
      case 38: //up
        this.tiles.forEach(tile => {
          let col = tile.className.charAt(7);
          tile.grab().className = `tile-1-${col}`;
          tile.className = `tile-1-${col}`;
        });
        break;
      case 39: //right
        this.tiles.forEach(tile => {
          let row = tile.className.charAt(5);
          tile.grab().className = `tile-${row}-4`;
          tile.className = `tile-${row}-4`;
        });
        break;
      case 40: //down
        this.tiles.forEach(tile => {
          let col = tile.className.charAt(7);
          tile.grab().className = `tile-4-${col}`;
          tile.className = `tile-4-${col}`;
        });
        break;
      default:
        break;
    }
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
