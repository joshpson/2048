import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.tiles = [];
    this.cells = {};
    this.createTile();
    this.createTile();
  }

  transform(keyCode) {
    this.tiles.forEach(tile => {
      switch (keyCode) {
        case 37: //left
          this.updateRow();
          break;
        case 38: //up
          break;
        case 39: //right
          break;
        case 40: //down
          break;
        default:
          break;
      }
    });
  }

  updateRow() {
    for (let i = 2; i <= 4; i += 1) {
      for (let j = i; j > 1; j -= 1) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          // debugger;
          if (!this.cells[j - 1]) {
            tile.updateCell(j - 1);
            this.cells[j - 1] = tile;
            delete this.cells[j];
          } else if (this.cells[j].value === this.cells[j - 1].value) {
            this.cells[j - 1].doubleValue();
            tile.remove();
            delete this.cells[j];
          }
        }
      }

      // if (this.cells[i]) {
      //   if (this.cells[i - 1]) {
      //     if (this.cells[i].value === this.cells[i - 1].value) {
      //       this.cells[i - 1].doubleValue();
      //       this.cells[i].updateCell(i - 1);
      //       this.cells[i].remove();
      //       this.cells[i] = null;
      //     }
      //   } else {
      //     this.cells[i].updateCell(i - 1);
      //     this.cells[i - 1] = this.cells[i];
      //     this.cells[i] = null;
      //   }
      // }
    }
  }

  createTile() {
    let cell = Math.floor(Math.random() * 4 + 1);
    if (this.cells[cell]) {
      this.createTile();
    } else {
      let tile = new Tile({ className: `cell-${cell}` });
      this.cells[cell] = tile;
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
