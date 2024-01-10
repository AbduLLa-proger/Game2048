const leftArrow = document.querySelector(".left-arrow") as HTMLDivElement;
const rightArrow = document.querySelector(".right-arrow") as HTMLDivElement;
const numberOfGrids = document.querySelector(".grids") as HTMLDivElement;
const startGame = document.querySelector(".start-game") as HTMLDivElement;
const newGame = document.querySelector(".new-game") as HTMLDivElement;
const body = document.querySelector(".body") as HTMLDivElement;

let gridsNumber = 16;
let gameGridsNumber = 16;
let gridsAddClassNameCounter = 0;
let gridsRemoveClassNameCounter = 0;

const offsetXY = {
  0: 0,
  1: 129,
  2: 258,
  3: 387,
  4: 516,
  5: 645,
};

const numberOfCells: Record<number, number> = {
  0: 16,
  1: 25,
  2: 36,
};

const gridsClassNames: Record<number, string> = {
  0: "body-four-column",
  1: "body-six-column",
  2: "body-eight-column",
};

const positiveXAxis: Record<number, string> = {
  1: "moveByXOnePos",
  2: "moveByXTwoPos",
  3: "moveByXThreePos",
  4: "moveByXFourPos",
  5: "moveByXFivePos",
};

const positiveYAxis: Record<number, string> = {
  1: "moveByYOnePos",
  2: "moveByYTwoPos",
  3: "moveByYThreePos",
  4: "moveByYFourPos",
  5: "moveByYFivePos",
};

const negativeXAxis: Record<number, string> = {
  1: "moveByXOneNeg",
  2: "moveByXTwoNeg",
  3: "moveByXThreeNeg",
  4: "moveByXFourNeg",
  5: "moveByXFiveNeg",
};

const negativeYAxis: Record<number, string> = {
  1: "moveByYOneNeg",
  2: "moveByYTwoNeg",
  3: "moveByYThreeNeg",
  4: "moveByYFourNeg",
  5: "moveByYFiveNeg",
};

leftArrow.addEventListener("click", () => {
  if (Number(numberOfGrids.textContent) > 16) {
    gridsAddClassNameCounter -= 1;
    numberOfGrids.textContent = String(numberOfCells[gridsAddClassNameCounter]);
    gridsNumber = numberOfCells[gridsAddClassNameCounter];
  }
});

rightArrow.addEventListener("click", () => {
  if (Number(numberOfGrids.textContent) < 32) {
    gridsAddClassNameCounter += 1;
    numberOfGrids.textContent = String(numberOfCells[gridsAddClassNameCounter]);
    gridsNumber = numberOfCells[gridsAddClassNameCounter];
  }
});

startGame.addEventListener("click", () => {
  if (body.childElementCount !== gridsNumber) {
    body.classList.remove(gridsClassNames[gridsRemoveClassNameCounter]);
    body.classList.add(gridsClassNames[gridsAddClassNameCounter]);
    gridsRemoveClassNameCounter = gridsAddClassNameCounter;
    gameGridsNumber = gridsNumber;
    new Game2048();
  }
});

newGame.addEventListener("click", () => {
  new Game2048();
});

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    // Arrow down key is pressed
    PlayGame.addRandomTile(PlayGame.board);
  } else if (event.key === "ArrowUp") {
    // Arrow down key is pressed
    const hh = PlayGame.addRandomTile(PlayGame.board);
    console.log(hh);
  } else if (event.key === "ArrowRight") {
    // Arrow down key is pressed
    console.log(PlayGame.gameBoardArray);
    PlayGame.moveBoard("PositiveX");
    PlayGame.addRandomTile(PlayGame.board);
  } else if (event.key === "ArrowLeft") {
    // Arrow down key is pressed
    PlayGame.addRandomTile(PlayGame.board);
  }
});

class Game2048 {
  public board: HTMLDivElement[];
  public gameBoardArray: string[] = new Array(gameGridsNumber);

  constructor() {
    body.innerHTML = "";
    this.play();
    this.board = this.initializeBoard();
  }

  private initializeBoard(): HTMLDivElement[] {
    const board: HTMLDivElement[] = [];

    // Select all grid cells within the body-four-column container
    const cells = document.querySelectorAll(".body > div > span");

    cells.forEach((cell) => {
      board.push(cell as HTMLDivElement);
    });

    this.addRandomTile(board);
    this.addRandomTile(board);

    return board;
  }

  private findAxes(
    index: number,
    board: HTMLDivElement[],
    direction: string
  ): number | false {
    if ((index + 1) % 4 === 0) return false;
    const startBoardIndex = Math.floor(index / 4) + 1;
    const length = Math.floor(index / 4) + 4;
    let moveByAxes = 0;

    for (let i = 4 * startBoardIndex; i < length; i++) {
      if (board[i].textContent?.length === 0) {
        moveByAxes++;
      }
    }

    return moveByAxes;
  }

  public moveBoard(direction: string) {
    const cells = document.querySelectorAll(".body > div > span");
    let angleNumber = "";
    const squareNumber =
      gameGridsNumber % 4 === 0
        ? 4
        : gameGridsNumber % 5 === 0
        ? 5
        : gameGridsNumber % 6 === 0
        ? 6
        : 0;
    let positiveAxes = 0;
    let noNumberFound = false;
    if (direction === "PositiveX") {
      let squareAngleNumber = squareNumber + 1;
      for (let i = gameGridsNumber - 1; i > -1; i--) {
        ///////////////////////////////////////////
        if ((i + 1) % squareNumber === 0) {
          angleNumber =
            this.gameBoardArray[i] === undefined
              ? "undefined"
              : this.gameBoardArray[i];
          squareAngleNumber--;
          positiveAxes = 0;
          noNumberFound = false;
        }

        ///////////////////////////////////////////

        if (this.gameBoardArray[i] === undefined && !noNumberFound) {
          noNumberFound = true;
        }
        ///////////////////////////////////////////
        if (
          this.gameBoardArray[i] !== undefined &&
          noNumberFound &&
          this.gameBoardArray[i] !== ""
        ) {
          if (angleNumber === "undefined") {
            positiveAxes++;
            this.gameBoardArray[
              squareAngleNumber * squareNumber - positiveAxes
            ] = this.gameBoardArray[i];
            noNumberFound = false;

            // console.log(
            //   squareAngleNumber,
            //   squareNumber,
            //   positiveAxes,
            //   i,
            //   angleNumber,
            //   this.gameBoardArray[i]
            // );

            angleNumber = this.gameBoardArray[i];
            this.gameBoardArray[i] = "";
            if (i - 1 > -1 && this.gameBoardArray[i - 1] !== undefined) {
              positiveAxes++;
              this.gameBoardArray[
                squareAngleNumber * squareNumber - positiveAxes
              ] = this.gameBoardArray[i];
              // console.log(squareAngleNumber, squareNumber, positiveAxes, i);
            }
          } else if (angleNumber !== this.gameBoardArray[i]) {
            // console.log(
            //   "what number",
            //   angleNumber,
            //   this.gameBoardArray[i],
            //   noNumberFound
            // );
            positiveAxes++;
            noNumberFound = false;
            this.gameBoardArray[
              squareAngleNumber * squareNumber - positiveAxes
            ] = this.gameBoardArray[i];
          } else if (angleNumber === this.gameBoardArray[i]) {
            // console.log(angleNumber, i, this.gameBoardArray[i]);
            this.gameBoardArray[i] = "";
          }
        }
      }
    }
    console.log("0000", this.gameBoardArray);

    // this.addRandomTile(PlayGame.board);
  }

  public addRandomTile(cells: HTMLDivElement[]) {
    // Check if the cell is empty
    const emptyCells = cells.filter((cell) => !cell.textContent);

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
      randomCell.textContent = newValue.toString();
      this.gameBoardArray[Number(randomCell.id)] = newValue.toString();
      console.log("1111", this.gameBoardArray);

      if (newValue === 2) {
        randomCell.classList.add("two");
      } else if (newValue === 4) {
        randomCell.classList.add("four");
      }
    }
  }

  public play() {
    for (let i = 0; i < gameGridsNumber; i++) {
      const newDivElement = document.createElement("div");
      const newSpanElement = document.createElement("span");
      newSpanElement.id = `${i}`;
      newDivElement.appendChild(newSpanElement);
      body.appendChild(newDivElement);
    }
  }
}

const PlayGame = new Game2048();
