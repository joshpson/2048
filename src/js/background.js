export default class Background {
  constructor(obj) {
    this.size = obj.size;
  }

  //Return one tile of the grid
  returnSpace() {
    let space = document.createElement("div");
    space.className = "background-cell";
    return space;
  }

  //Return one row of the grid
  returnRow() {
    let row = document.createElement("div");
    row.className = "background-row";
    for (let i = 0; i < this.size; i += 1) {
      row.appendChild(this.returnSpace());
    }
    return row;
  }

  //Return entire grid for appending on DOM
  returnContainer() {
    let background = document.createElement("div");
    background.className = "background";
    for (let i = 0; i < this.size; i += 1) {
      background.appendChild(this.returnRow());
    }
    return background;
  }
}
