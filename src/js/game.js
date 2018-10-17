import Background from "./background.js";
import Cells from "./cells.js";
import { throttle } from "lodash";

export default class Game {
  constructor() {
    this.background = new Background();
    this.cells = new Cells();
    this.throttle = _.throttle(e => this.controls(e), 275);
  }

  root() {
    return document.querySelector(".game");
  }

  controls(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      this.cells.resetTiles();
      switch (e.keyCode) {
        case 37: //left
          for (let i = 1; i <= 13; i += 4) {
            this.cells.updatePositive(i, 3, 1);
          }
          break;
        case 38: //up
          for (let i = 1; i <= 4; i += 1) {
            this.cells.updatePositive(i, 12, 4);
          }
          break;
        case 39: //right
          for (let i = 4; i <= 16; i += 4) {
            this.cells.updateNegative(i, 3, 1);
          }
          break;
        case 40: //down
          for (let i = 13; i <= 16; i += 1) {
            this.cells.updateNegative(i, 12, 4);
          }
          break;
        default:
          break;
      }
      this.resultCheck();
      this.cells.addNewTile();
    }
  }

  resultCheck() {
    let highScore = parseInt(document.querySelector(".high-score").innerText);
    if (this.cells.score > highScore) {
      window.localStorage.setItem("highScore", this.cells.score);
      document.querySelector(".high-score").innerText = this.cells.score;
    }
    let result = document.querySelector(".result");
    if (this.cells.winCheck()) {
      result.innerText = "YOU WIN!!!";
      this.removeControlListeners();
      return;
    }
    if (this.cells.loseCheck()) {
      result.innerText = "YOU LOSE!!!";
      this.removeControlListeners();
      return;
    }
  }

  removeControlListeners() {
    document.removeEventListener("keydown", this.throttle);
  }

  addControlListeners() {
    document.addEventListener("keydown", this.throttle);
  }

  build() {
    this.root().innerHTML = "";
    this.root().appendChild(this.background.returnContainer());
    this.root().appendChild(this.cells.returnContainer());
    this.cells.createTile();
    this.cells.createTile();
    this.addControlListeners();
  }
}
