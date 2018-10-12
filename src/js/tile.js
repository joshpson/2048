export default class Tile {
  constructor(obj) {
    this.value = this.startingNumber();
  }

  startingNumber() {
    return Math.random() < 0.9 ? 2 : 4;
  }

  createDiv() {
    let div = document.createElement("div");
    let value = document.createElement("div");
    value.innerText = this.value;
    value.className = "value";
    div.appendChild(value);
    div.className = "tile";
    return div;
  }
}
