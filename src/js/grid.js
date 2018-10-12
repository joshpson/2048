export default class Grid {
  constructor(obj) {
    this.size = obj.size;
  }

  //Return one tile of the grid
  returnGridTile() {
    let tile = document.createElement("div");
    tile.className = "tile";
    return tile;
  }

  //Return on row of the grid
  returnGridRow() {
    let row = document.createElement("div");
    row.className = "row";
    for (let i = 0; i < this.size; i += 1) {
      row.appendChild(this.returnGridTile());
    }
    return row;
  }

  //Return entire grid for appending on DOM
  returnGrid() {
    let grid = document.createElement("div");
    grid.className = "grid";
    for (let i = 0; i < this.size; i += 1) {
      grid.appendChild(this.returnGridRow());
    }
    return grid;
  }
}
