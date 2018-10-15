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

  //Return entire grid for appending on DOM
  returnContainer() {
    let background = document.createElement("div");
    background.className = "game-background";
    for (let i = 0; i < this.size; i += 1) {
      background.appendChild(this.returnSpace());
    }
    return background;
  }
}
