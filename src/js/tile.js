export default class Tile {
  constructor(obj) {
    this.value = this.startingNumber();
    this.cellClass = obj.cellClass;
    this.valueClass = `val-${this.value}`;
    this.merged = false;
  }

  grabCell() {
    return document.querySelector(`.${this.cellClass}`);
  }

  grabValDiv() {
    return document.querySelector(`.${this.cellClass}`).querySelector(".val");
  }

  startingNumber() {
    return Math.random() < 0.9 ? 2 : 4;
  }

  updateCell(cell) {
    let newCellClass = `cell-${cell}`;
    this.updateCellClass(this.cellClass, newCellClass);
    this.cellClass = newCellClass;
  }

  updateCellClass(oldClass, newClass) {
    this.grabCell().classList.replace(oldClass, newClass);
  }

  updateValueClass(oldClass, newClass) {
    this.grabValDiv().classList.replace(oldClass, newClass);
  }

  addValueClass(className) {
    this.grabValDiv().classList.add(className);
  }

  removeValueClass(className) {
    this.grabValDiv().classList.remove(className);
  }

  remove() {
    this.grabCell().remove();
  }

  doubleValue() {
    this.value = this.value * 2;
    let newValueClass = `val-${this.value}`;
    this.updateValueClass(this.valueClass, newValueClass);
    this.valueClass = newValueClass;
    this.grabCell().querySelector(".number").innerText = this.value;
  }

  createDiv() {
    let cell = document.createElement("div");
    let numberContainer = document.createElement("div");
    let number = document.createElement("div");
    number.innerText = this.value;
    number.className = "number";
    cell.appendChild(numberContainer);
    numberContainer.appendChild(number);
    cell.className = `${this.cellClass}`;
    numberContainer.className = `val ${this.valueClass} enter`;
    return cell;
  }
}
