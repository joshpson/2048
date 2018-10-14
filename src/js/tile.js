export default class Tile {
  constructor(obj) {
    this.value = this.startingNumber();
    this.cellClass = obj.cellClass;
    this.valueClass = `val-${this.value}`;
    this.merged = false;
  }

  grab() {
    return document.querySelector(`.${this.cellClass}`);
  }

  startingNumber() {
    return Math.random() < 0.9 ? 2 : 4;
  }

  updateCell(cell) {
    let newCellClass = `cell-${cell}`;
    this.updateClass(this.cellClass, newCellClass);
    this.cellClass = newCellClass;
  }

  updateClass(oldClass, newClass) {
    this.grab().classList.replace(oldClass, newClass);
  }

  remove() {
    this.grab().remove();
  }

  doubleValue() {
    this.value = this.value * 2;
    let newValueClass = `val-${this.value}`;
    this.updateClass(this.valueClass, newValueClass);
    this.valueClass = newValueClass;
    this.grab().querySelector(".value").innerText = this.value;
  }

  createDiv() {
    let div = document.createElement("div");
    let value = document.createElement("div");
    value.innerText = this.value;
    value.className = "value";
    div.appendChild(value);
    div.className = `${this.cellClass} ${this.valueClass}`;
    return div;
  }
}
