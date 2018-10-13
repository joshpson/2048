import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.cells = {};
  }

  grab() {
    return document.querySelector(`.grid`);
  }

  transform(keyCode) {
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
  }

  updateRow() {
    for (let i = 2; i <= 4; i += 1) {
      for (let j = i; j > 1; j -= 1) {
        if (this.cells[j]) {
          let tile = this.cells[j];
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
    }
    this.createTile();
  }

  createTile() {
    let cell = Math.floor(Math.random() * 4 + 1);
    if (this.cells[cell]) {
      console.log("dup");
      this.createTile();
    } else {
      console.log("create");
      let tile = new Tile({ className: `cell-${cell}` });
      this.cells[cell] = tile;
      this.grab().appendChild(tile.createDiv());
    }
  }

  returnContainer() {
    let div = document.createElement("div");
    div.className = "grid";

    return div;
  }
}
