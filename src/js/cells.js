import Tile from "./tile.js";

export default class Cells {
  constructor(obj) {
    this.tiles = {};
    this.tileMoved = false;
    this.score = 0;
  }

  root() {
    return document.querySelector(`.cells`);
  }

  resetTiles() {
    //Loop through all tiles and reset their classes and merge properties
    Object.values(this.tiles).forEach(tile => {
      tile.reset();
    });
  }

  createTile() {
    //Randomly pick a cell, if a tile is already in that cell try again.
    //Once an empty cell is found, create the tile and append it
    let cell = Math.floor(Math.random() * 16 + 1);
    if (this.tiles[cell]) {
      this.createTile();
    } else {
      let tile = new Tile({ cellClass: `cell-${cell}` });
      this.tiles[cell] = tile;
      this.root().appendChild(tile.createDiv());
    }
  }

  addNewTile() {
    //Check if a tile moved last turn. If so, create a new tile
    //after 100ms. The extra time is to allow for animations to finish.
    if (this.tileMoved) {
      setTimeout(() => {
        this.createTile();
      }, 100);
      this.tileMoved = false;
    }
  }

  winCheck() {
    //Return true if any tile equals 2048
    return Object.values(this.tiles).some(tile => {
      return tile.value === 2048;
    });
  }

  loseCheck() {
    //Returns true if there are no possible moves remaining.
    if (Object.keys(this.tiles).length === 16) {
      //A player can only lose if every cell is full
      return !this.movementCheck(Object.keys(this.tiles));
    } else {
      return false;
    }
  }

  movementCheck(keys) {
    let tiles = this.tiles;
    return keys.some(keyString => {
      //Returns true if any move is possible
      let key = parseInt(keyString);
      if ([1, 2, 3, 5, 6, 7, 9, 10, 11].includes(key)) {
        //Checks if a tile can move right or down
        return (
          tiles[key].value === tiles[key + 1].value ||
          tiles[key].value === tiles[key + 4].value
        );
      }
      if ([4, 8, 12].includes(key)) {
        //Checks if a tile can move down
        return tiles[key].value === tiles[key + 4].value;
      }
      if ([13, 14, 15].includes(key)) {
        //Checks if a tile can move right
        return tiles[key].value === tiles[key + 1].value;
      }
    });
  }

  updatePositive(start, length, increment) {
    for (let i = start + increment; i <= start + length; i += increment) {
      for (let j = i; j > start; j -= increment) {
        if (this.tiles[j]) {
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
        if (this.tiles[j]) {
          this.updateCells(j, function() {
            return j + increment;
          });
        }
      }
    }
  }

  updateCells(cell, incrementFunc) {
    let tile = this.tiles[cell];
    let nextTile = this.tiles[incrementFunc()];
    if (!nextTile) {
      this.moveTile(tile, incrementFunc);
      delete this.tiles[cell];
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
      delete this.tiles[cell];
    }
  }

  moveTile(tile, incrementFunc) {
    tile.updateCell(incrementFunc());
    this.tiles[incrementFunc()] = tile;
    this.tileMoved = true;
  }

  returnContainer() {
    let div = document.createElement("div");
    div.className = "cells";
    return div;
  }
}
