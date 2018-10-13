import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.tiles = { 1: {}, 2: {}, 3: {}, 4: {} };
  }

  transform(keyCode) {
    Object.keys(this.tiles).forEach(row => {
      Object.values(this.tiles[row]).forEach(tile => {
        let rowClass = tile.className.charAt(5);
        let colClass = tile.className.charAt(7);
        switch (keyCode) {
          case 37: //left
            tile.updateClass(`tile-${rowClass}-1`);
            break;
          case 38: //up
            tile.updateClass(`tile-1-${colClass}`);
            break;
          case 39: //right
            tile.updateClass(`tile-${rowClass}-4`);
            break;
          case 40: //down
            tile.updateClass(`tile-4-${colClass}`);
            break;
          default:
            break;
        }
      });
    });
  }

  createTile() {
    let cell = Math.floor(Math.random() * 16 + 1);
    let row = Math.ceil(cell / 4);
    let col = (cell % 4) + 1;
    if (this.tiles[row][col]) {
      this.createTile();
    } else {
      let tile = new Tile({ className: `tile-${row}-${col}` });
      this.tiles[row][cell] = tile;
      return tile;
    }
  }

  returnContainer() {
    let div = document.createElement("div");
    div.className = "grid";
    let tile1 = this.createTile();
    let tile2 = this.createTile();
    div.appendChild(tile1.createDiv());
    div.appendChild(tile2.createDiv());
    return div;
  }
}
