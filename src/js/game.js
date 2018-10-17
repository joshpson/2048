import Background from "./background.js";
import Grid from "./grid.js";
import { throttle } from "lodash";

export default class Game {
  constructor() {
    this.background = new Background();
    this.grid = new Grid();
    this.throttle = _.throttle(e => this.keyHandler(e), 300);
  }

  root() {
    return document.querySelector(".game");
  }

  keyHandler(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      this.grid.transform(e.keyCode);
    }
  }

  preventKeyDefault(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      console.log("1");
      e.preventDefault();
    }
  }

  removeArrowListeners() {
    document.removeEventListener("keydown", this.throttle);
    document.removeEventListener("keydown", this.preventKeyDefault);
  }

  addArrowListeners() {
    document.addEventListener("keydown", this.preventKeyDefault);
    document.addEventListener("keydown", this.throttle);
  }

  build() {
    this.root().innerHTML = "";
    this.root().appendChild(this.background.returnContainer());
    this.root().appendChild(this.grid.returnContainer());
    this.grid.createTile();
    this.grid.createTile();
    this.addArrowListeners();
  }
}
