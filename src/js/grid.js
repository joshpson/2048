import Tile from "./tile.js";

export default class Grid {
  constructor(obj) {
    this.cells = {};
    this.tileMoved = false;
    this.score = 0;
  }

  grab() {
    return document.querySelector(`.cells`);
  }

  resetTiles() {
    Object.values(this.cells).forEach(tile => {
      if (tile.new) {
        tile.removeValueClass("tile-enter");
      }
      if (tile.merged) {
        tile.removeValueClass("tile-merged");
        tile.merged = false;
        void tile.grabInnerDiv().offsetWidth; //Magic so the remove and add works!
      }
    });
  }

  createTile() {
    let cell = Math.floor(Math.random() * 16 + 1);
    if (this.cells[cell]) {
      this.createTile();
    } else {
      setTimeout(() => {
        let tile = new Tile({ cellClass: `cell-${cell}` });
        this.cells[cell] = tile;
        this.grab().appendChild(tile.createDiv());
      }, 100);
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
    div.className = "cells";
    return div;
  }

  winCheck() {
    return Object.values(this.cells).some(tile => {
      return tile.value === 2048;
    });
  }

  loseCheck() {
    let cells = this.cells;
    let keys = Object.keys(this.cells);
    if (keys.length === 16) {
      return !keys.some(keyString => {
        let key = parseInt(keyString);
        if (key < 4 || (key > 4 && key < 8) || (key > 8 && key < 12)) {
          return (
            cells[key].value === cells[key + 1].value ||
            cells[key].value === cells[key + 4].value
          );
        }
        if (key === 4 || key === 8 || key === 12) {
          return cells[key].value === cells[key + 4].value;
        }
        if (key > 12 && key < 16) {
          return cells[key].value === cells[key + 1].value;
        }
      });
    } else {
      return false;
    }
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
    if (this.loseCheck()) {
      console.log("you lose");
      return;
    }
    if (this.winCheck()) {
      console.log("you win");
      return;
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
    if (this.loseCheck()) {
      document.querySelector(".result").innerText = "YOU LOSE!";
      return;
    }
    if (this.winCheck()) {
      document.querySelector(".result").innerText = "YOU WIN!";
      return;
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
      this.score = this.score += nextTile.value;
      document.querySelector(".score").innerText = `Score: ${this.score}`;
      tile
        .grabCell()
        .classList.replace(tile.cellClass, `cell-${incrementFunc()}-remove`);
      tile.cellClass = `cell-${incrementFunc()}-remove`;
      setTimeout(() => {
        tile.removeCell();
      }, 50);
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
