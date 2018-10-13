export default class Tile {
  constructor(obj) {
    this.value = this.startingNumber();
    this.className = obj.className;
  }

  grab() {
    return document.querySelector(`.${this.className}`);
  }

  startingNumber() {
    return Math.random() < 0.9 ? 2 : 4;
  }

  updateCell(cell) {
    let newClass = `cell-${cell}`;
    this.grab().className = newClass;
    this.className = newClass;
  }

  remove() {
    this.grab().remove();
  }

  doubleValue() {
    let newValue = this.value * 2;
    this.grab().querySelector(".value").innerText = newValue;
    this.value = newValue;
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
