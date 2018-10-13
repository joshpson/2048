export default class Tile {
  constructor(obj) {
    this.value = this.startingNumber();
    this.className = obj.className;
  }

  startingNumber() {
    return Math.random() < 0.9 ? 2 : 4;
  }

  updateClass(className) {
    this.grab().className = className;
    this.className = className;
  }

  grab() {
    return document.querySelector(`.${this.className}`);
  }

  createDiv() {
    let div = document.createElement("div");
    let value = document.createElement("div");
    value.innerText = this.value;
    value.className = "value";
    div.appendChild(value);
    div.className = this.className;
    return div;
  }
}
