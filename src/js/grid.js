import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.tiles = [];
    this.positions = {
      1: {
        1: false,
        2: false,
        3: false,
        4: false
      },
      2: {
        1: false,
        2: false,
        3: false,
        4: false
      },
      3: {
        1: false,
        2: false,
        3: false,
        4: false
      },
      4: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    };
    this.createTile();
    this.createTile();
  }

  transform(keyCode) {
    this.tiles.forEach(tile => {
      let row = tile.className.charAt(5);
      let col = tile.className.charAt(7);
      switch (keyCode) {
        case 37: //left
          tile.updateClass(`tile-${row}-1`);
          break;
        case 38: //up
          tile.updateClass(`tile-1-${col}`);
          break;
        case 39: //right
          tile.updateClass(`tile-${row}-4`);
          break;
        case 40: //down
          tile.updateClass(`tile-4-${col}`);
          break;
        default:
          break;
      }
    });
  }

  createTile() {
    let cell = Math.floor(Math.random() * 16 + 1);
    let row = Math.ceil(cell / 4);
    let col = (cell % 4) + 1;
    if (this.positions[row][col]) {
      console.log("positions");
      this.createTile();
    } else {
      let tile = new Tile({ className: `tile-${row}-${col}` });
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
