export default class Tile {
  constructor(obj) {
    this.value = Math.random() < 0.9 ? 2 : 4;
    this.cellClass = obj.cellClass;
    this.valueClass = `val-${this.value}`;
    this.merged = false;
    this.new = true;
  }

  grabCell() {
    return document.querySelector(`.${this.cellClass}`);
  }

  grabInnerDiv() {
    return this.grabCell().querySelector(".val");
  }

  grabNumberDiv() {
    return this.grabInnerDiv().querySelector(".number");
  }

  updateCell(cell) {
    let newCellClass = `cell-${cell}`;
    this.grabCell().classList.replace(this.cellClass, newCellClass);
    this.cellClass = newCellClass;
  }

  addValueClass(className) {
    this.grabInnerDiv().classList.add(className);
  }

  removeValueClass(className) {
    this.grabInnerDiv().classList.remove(className);
  }

  removeCell() {
    this.grabCell().remove();
  }

  merge() {
    this.doubleValue();
    this.merged = true;
    this.addValueClass("merged");
  }

  doubleValue() {
    this.value = this.value * 2;
    let newValueClass = `val-${this.value}`;
    this.grabInnerDiv().classList.replace(this.valueClass, newValueClass);
    this.valueClass = newValueClass;
    this.grabNumberDiv().innerText = this.value;
  }

  createDiv() {
    let cell = document.createElement("div");
    let innerDiv = document.createElement("div");
    let number = document.createElement("div");
    number.innerText = this.value;
    number.className = "number";
    cell.appendChild(innerDiv);
    innerDiv.appendChild(number);
    cell.className = `${this.cellClass}`;
    innerDiv.className = `val ${this.valueClass} enter`;
    return cell;
  }
}
