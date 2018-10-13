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
        this.updateRowLeft(1);
        this.updateRowLeft(5);
        this.updateRowLeft(9);
        this.updateRowLeft(13);
        this.createTile();
        break;
      case 38: //up
        this.updateColUp(1);
        this.updateColUp(2);
        this.updateColUp(3);
        this.updateColUp(4);
        this.createTile();
        break;
      case 39: //right
        this.updateRowRight(4);
        this.updateRowRight(8);
        this.updateRowRight(12);
        this.updateRowRight(16);
        this.createTile();
        break;
      case 40: //down
        this.updateColDown(13);
        this.updateColDown(14);
        this.updateColDown(15);
        this.updateColDown(16);
        this.createTile();
        break;
      default:
        break;
    }
  }

  updateColUp(start) {
    for (let i = start + 4; i <= start + 12; i += 4) {
      for (let j = i; j > start; j -= 4) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          if (!this.cells[j - 4]) {
            tile.updateCell(j - 4);
            this.cells[j - 4] = tile;
            delete this.cells[j];
          } else if (
            this.cells[j].value === this.cells[j - 4].value &&
            !tile.merged
          ) {
            this.cells[j - 4].doubleValue();
            this.cells[j - 4].merged = true;
            tile.remove();
            delete this.cells[j];
          }
        }
      }
    }
    Object.values(this.cells).forEach(tile => {
      if (tile.merged) {
        tile.merged = false;
      }
    });
  }

  updateColDown(start) {
    for (let i = start - 4; i >= start - 12; i -= 4) {
      for (let j = i; j < start; j += 4) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          if (!this.cells[j + 4]) {
            tile.updateCell(j + 4);
            this.cells[j + 4] = tile;
            delete this.cells[j];
          } else if (
            this.cells[j].value === this.cells[j + 4].value &&
            !tile.merged
          ) {
            this.cells[j + 4].doubleValue();
            this.cells[j + 4].merged = true;
            tile.remove();
            delete this.cells[j];
          }
        }
      }
    }
    Object.values(this.cells).forEach(tile => {
      if (tile.merged) {
        tile.merged = false;
      }
    });
  }

  updateRowLeft(start) {
    for (let i = start + 1; i <= start + 3; i += 1) {
      for (let j = i; j > start; j -= 1) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          if (!this.cells[j - 1]) {
            tile.updateCell(j - 1);
            this.cells[j - 1] = tile;
            delete this.cells[j];
          } else if (
            this.cells[j].value === this.cells[j - 1].value &&
            !tile.merged
          ) {
            this.cells[j - 1].doubleValue();
            this.cells[j - 1].merged = true;
            tile.remove();
            delete this.cells[j];
          }
        }
      }
    }
    Object.values(this.cells).forEach(tile => {
      if (tile.merged) {
        tile.merged = false;
      }
    });
  }

  updateRowRight(start) {
    for (let i = start - 1; i >= start - 3; i -= 1) {
      for (let j = i; j < start; j += 1) {
        if (this.cells[j]) {
          let tile = this.cells[j];
          if (!this.cells[j + 1]) {
            tile.updateCell(j + 1);
            this.cells[j + 1] = tile;
            delete this.cells[j];
          } else if (
            this.cells[j].value === this.cells[j + 1].value &&
            !tile.merged
          ) {
            this.cells[j + 1].doubleValue();
            this.cells[j + 1].merged = true;
            tile.remove();
            delete this.cells[j];
          }
        }
      }
    }
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
