import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.cells = {};
    this.tileMoved = false;
  }

  grab() {
    return document.querySelector(`.grid`);
  }

  resetTiles() {
    Object.values(this.cells).forEach(tile => {
      if (tile.merged) {
        tile.merged = false;
      }
    });
  }

  createTile() {
    let cell = Math.floor(Math.random() * 16 + 1);
    if (this.cells[cell]) {
      this.createTile();
    } else {
      let tile = new Tile({ cellClass: `cell-${cell}` });
      this.cells[cell] = tile;
      this.grab().appendChild(tile.createDiv());
    }
  }

  tileCheck() {
    if (this.tileMoved) {
      this.createTile();
      this.tileMoved = false;
    }
  }

  returnContainer() {
    let div = document.createElement("div");
    div.className = "grid";
    return div;
  }

  transform(keyCode) {
    switch (keyCode) {
      case 37: //left
        for (let i = 1; i <= 13; i += 4) {
          this.updatePositive(i, 3, 1);
        }
        this.tileCheck();
        break;
      case 38: //up
        for (let i = 1; i <= 4; i += 1) {
          this.updatePositive(i, 12, 4);
        }
        this.tileCheck();
        break;
      case 39: //right
        for (let i = 4; i <= 16; i += 4) {
          this.updateNegative(i, 3, 1);
        }
        this.tileCheck();
        break;
      case 40: //down
        for (let i = 13; i <= 16; i += 1) {
          this.updateNegative(i, 12, 4);
        }
        this.tileCheck();
        break;
      default:
        break;
    }
  }

  updatePositive(start, length, increment) {
    for (let i = start + increment; i <= start + length; i += increment) {
      for (let j = i; j > start; j -= increment) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          if (!this.cells[j - increment]) {
            tile.updateCell(j - increment);
            this.cells[j - increment] = tile;
            delete this.cells[j];
            this.tileMoved = true;
          } else if (
            this.cells[j].value === this.cells[j - increment].value &&
            !tile.merged
          ) {
            this.cells[j - increment].doubleValue();
            this.cells[j - increment].merged = true;
            tile.remove();
            delete this.cells[j];
            this.tileMoved = true;
          }
        }
      }
    }
    this.resetTiles();
  }

  updateNegative(start, length, increment) {
    for (let i = start - increment; i >= start - length; i -= increment) {
      for (let j = i; j < start; j += increment) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          if (!this.cells[j + increment]) {
            tile.updateCell(j + increment);
            this.cells[j + increment] = tile;
            delete this.cells[j];
            this.tileMoved = true;
          } else if (
            this.cells[j].value === this.cells[j + increment].value &&
            !tile.merged
          ) {
            this.cells[j + increment].doubleValue();
            this.cells[j + increment].merged = true;
            tile.remove();
            delete this.cells[j];
            this.tileMoved = true;
          }
        }
      }
    }
    this.resetTiles();
  }
}
