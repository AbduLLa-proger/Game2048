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
    console.log("Arrow down key is pressed!");
    PlayGame.addRandomTile(PlayGame.board);
  } else if (event.key === "ArrowUp") {
    // Arrow down key is pressed
    console.log("Arrow up key is pressed!");
    PlayGame.addRandomTile(PlayGame.board);
  } else if (event.key === "ArrowRight") {
    // Arrow down key is pressed
    console.log("Arrow right key is pressed!");
    PlayGame.addRandomTile(PlayGame.board);
  } else if (event.key === "ArrowLeft") {
    // Arrow down key is pressed
    console.log("Arrow left key is pressed!");
    PlayGame.addRandomTile(PlayGame.board);
  }
});

class Game2048 {
  public board: HTMLDivElement[];
  private firstRowX: number[] = [];
  private secondRowX: number[] = [];
  private thirdRowX: number[] = [];
  private fourthRowX: number[] = [];
  private fifthRowX: number[] = [];
  private sixthRowX: number[] = [];

  private firstRowY: number[] = [];
  private secondRowY: number[] = [];
  private thirdRowY: number[] = [];
  private fourthRowY: number[] = [];
  private fifthRowY: number[] = [];
  private sixthRowY: number[] = [];

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

  private findAxes(index: number, board: HTMLDivElement[]): number | false {
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

  public moveBoard(direction: string, axes: string) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].textContent?.length !== 0) {
        const moveBy = this.findAxes(i, this.board);
        if (Number(moveBy) > 0) {
          if (direction === "positive") {
            if (axes === "X") {
              const className = positiveXAxis[Number(moveBy)];
              this.board[i].classList.add(className);
            } else if (axes === "Y") {
              const className = positiveYAxis[Number(moveBy)];
              this.board[i].classList.add(className);
            }
          } else if (direction === "negative") {
            if (axes === "X") {
              const className = negativeXAxis[Number(moveBy)];
              this.board[i].classList.add(className);
            } else if (axes === "Y") {
              const className = negativeYAxis[Number(moveBy)];
              this.board[i].classList.add(className);
            }
          }
        }
      }
    }
  }

  public addRandomTile(cells: HTMLDivElement[]) {
    // Check if the cell is empty
    const emptyCells = cells.filter((cell) => !cell.textContent);

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
      randomCell.textContent = newValue.toString();
      if (newValue === 2) {
        randomCell.classList.add("two");
        console.log(randomCell.classList.value);
      } else if (newValue === 4) {
        randomCell.classList.add("four");
      }
    }
  }

  public play() {
    for (let i = 0; i < gameGridsNumber; i++) {
      const newDivElement = document.createElement("div");
      const newSpanElement = document.createElement("span");
      newDivElement.appendChild(newSpanElement);
      body.appendChild(newDivElement);
    }
  }
}

const PlayGame = new Game2048();

console.log(PlayGame.board);

console.log(PlayGame.board[0].textContent?.length === 0);
