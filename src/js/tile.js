export default class Tile {
  constructor(obj) {
    this.value = Math.random() < 0.9 ? 2 : 4;
    this.cellClass = obj.cellClass;
    this.valueClass = `val-${this.value}`;
    this.merged = false;
  }

  root() {
    return document.querySelector(`.${this.cellClass}`);
  }

  grabInnerDiv() {
    return this.root().querySelector(".val");
  }

  grabNumberDiv() {
    return this.grabInnerDiv().querySelector(".number");
  }

  addValueClass(className) {
    this.grabInnerDiv().classList.add(className);
  }

  removeValueClass(className) {
    this.grabInnerDiv().classList.remove(className);
  }

  remove() {
    this.root().remove();
  }

  updateCell(cell, queRemoval) {
    //Moves the tile by giving it a new cell class
    //Adds -remove if the tile is qued for removal
    let newCellClass = `cell-${cell}`;
    if (queRemoval) {
      newCellClass += "-remove";
      setTimeout(() => {
        this.remove();
      }, 50);
    }
    this.root().classList.replace(this.cellClass, newCellClass);
    this.cellClass = newCellClass;
  }

  reset() {
    //Removes all temporary classes and offsets the width so animations
    //don't linger
    this.removeValueClass("tile-enter");
    this.removeValueClass("tile-merged");
    this.merged = false;
    void this.grabInnerDiv().offsetWidth;
  }

  merge() {
    this.doubleValue();
    this.merged = true;
    this.addValueClass("tile-merged");
  }

  doubleValue() {
    //Doubles the value and updates the value class
    this.value = this.value * 2;
    let newValueClass = `val-${this.value}`;
    this.grabInnerDiv().classList.replace(this.valueClass, newValueClass);
    this.valueClass = newValueClass;
    this.grabNumberDiv().innerText = this.value;
  }

  returnContainer() {
    let cell = document.createElement("div");
    let innerDiv = document.createElement("div");
    let number = document.createElement("div");
    number.innerText = this.value;
    number.className = "number";
    cell.appendChild(innerDiv);
    innerDiv.appendChild(number);
    cell.className = `${this.cellClass}`;
    innerDiv.className = `val ${this.valueClass} tile-enter`;
    return cell;
  }
}
