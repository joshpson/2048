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
      if (tile.new) {
        tile.removeValueClass("enter");
      }
      if (tile.merged) {
        tile.removeValueClass("merged");
        tile.merged = false;
        void tile.grabInnerDiv().offsetWidth; //Magic so the remove and add works!
      }
    });
  }

  createTile() {
    //need to find a way to lose
    let cell = Math.floor(Math.random() * 16 + 1);
    if (this.cells[cell]) {
      //check up down left right addition
      this.loseCheck();
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

  loseCheck() {
    Object.keys(this.cells).forEach(cell => {
      if (
        this.cells[cell].value === this.cells[cell - 1]
          ? this.cells[cell - 1].value
          : false || this.cells[cell].value === this.cells[cell + 1]
            ? this.cells[cell + 1].value
            : false || this.cells[cell].value === this.cells[cell - 4]
              ? this.cells[cell - 4].value
              : false || this.cells[cell].value === this.cells[cell + 4]
                ? this.cells[cell + 4].value
                : false
      ) {
        console.log("you lost");
        return;
      } else {
        console.log("you good");
      }
    });
  }

  transform(keyCode) {
    switch (keyCode) {
      case 37: //left
        this.resetTiles();
        for (let i = 1; i <= 13; i += 4) {
          this.updatePositive(i, 3, 1);
        }
        this.tileCheck();
        break;
      case 38: //up
        this.resetTiles();
        for (let i = 1; i <= 4; i += 1) {
          this.updatePositive(i, 12, 4);
        }
        this.tileCheck();
        break;
      case 39: //right
        this.resetTiles();
        for (let i = 4; i <= 16; i += 4) {
          this.updateNegative(i, 3, 1);
        }
        this.tileCheck();
        break;
      case 40: //down
        this.resetTiles();
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
          this.updateCells(j, function() {
            return j - increment;
          });
        }
      }
    }
  }

  updateNegative(start, length, increment) {
    for (let i = start - increment; i >= start - length; i -= increment) {
      for (let j = i; j < start; j += increment) {
        if (this.cells[j]) {
          this.updateCells(j, function() {
            return j + increment;
          });
        }
      }
    }
  }

  updateCells(cell, incrementFunc) {
    let tile = this.cells[cell];
    let nextTile = this.cells[incrementFunc()];
    if (!nextTile) {
      this.moveTile(tile, incrementFunc);
      delete this.cells[cell];
    } else if (
      tile.value === nextTile.value &&
      !tile.merged &&
      !nextTile.merged
    ) {
      nextTile.merge();
      tile
        .grabCell()
        .classList.replace(tile.cellClass, `cell-${incrementFunc()}-remove`);
      tile.cellClass = `cell-${incrementFunc()}-remove`;
      setTimeout(() => {
        tile.removeCell();
      }, 80);
      this.tileMoved = true;
      delete this.cells[cell];
    }
  }

  moveTile(tile, incrementFunc) {
    tile.updateCell(incrementFunc());
    this.cells[incrementFunc()] = tile;
    this.tileMoved = true;
  }
}
