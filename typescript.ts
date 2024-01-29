const leftArrow = document.querySelector(".left-arrow") as HTMLDivElement;
const rightArrow = document.querySelector(".right-arrow") as HTMLDivElement;
const numberOfGrids = document.querySelector(".grids") as HTMLDivElement;
const startGame = document.querySelector(".start-game") as HTMLDivElement;
const newGame = document.querySelector(".new-game") as HTMLDivElement;
const body = document.querySelector(".body") as HTMLDivElement;
const currentScore = document.querySelector(".current-score") as HTMLDivElement;
const bestScore = document.querySelector(".best-score") as HTMLDivElement;
const mainBody = document.body as HTMLDivElement;

let gridsNumber = 16;
let gameGridsNumber = 16;
let gridsAddClassNameCounter = 0;
let gridsRemoveClassNameCounter = 0;
let gameOver = false;

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
    new PlayGame2048();
  }
});

newGame.addEventListener("click", () => {
  gameOver = false;
  mainBody.classList.value = "";
  PlayGame = new PlayGame2048();
});

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (!gameOver) {
    if (event.key === "ArrowDown") {
      // Arrow down key is pressed
      PlayGame.addRandomTile(PlayGame.board);
    } else if (event.key === "ArrowUp") {
      // Arrow down key is pressed
      const hh = PlayGame.addRandomTile(PlayGame.board);
    } else if (event.key === "ArrowRight") {
      // Arrow down key is pressed
      // PlayGame.moveBoard("PositiveX");
      PlayGame.slideRight();
      PlayGame.addRandomTile(PlayGame.board);
    } else if (event.key === "ArrowLeft") {
      // Arrow down key is pressed
      PlayGame.slideLeft();
      PlayGame.addRandomTile(PlayGame.board);
    }
  }
});

class PlayGame2048 {
  private gameScore: number = 0;
  private gameBoard: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  private gameSquareNumber =
    gameGridsNumber % 4 === 0
      ? 4
      : gameGridsNumber % 5 === 0
      ? 5
      : gameGridsNumber % 6 === 0
      ? 6
      : 4;
  public board: HTMLDivElement[];

  constructor() {
    body.innerHTML = "";
    this.play();
    this.board = this.initializeBoard();
  }

  private initializeBoard(): HTMLDivElement[] {
    const board: HTMLDivElement[] = [];

    // Select all grid cells within the body-four-column container
    const cells = document.querySelectorAll(".body > div > span");

    cells.forEach((cell: Element) => {
      board.push(cell as HTMLDivElement);
    });

    this.addRandomTile(board);
    this.addRandomTile(board);

    return board;
  }

  private getClassName = (num: number) => {
    switch (num) {
      case 2:
        return "two";
      case 4:
        return "four";
      case 8:
        return "eight";
      case 16:
        return "six-teen";
      case 32:
        return "thirty-two";
      case 64:
        return "sixty-four";
      case 128:
        return "one-two-eight";
      case 256:
        return "two-five-six";
      case 512:
        return "five-one-two";
      case 1024:
        return "ten-two-four";
      case 2048:
        return "twenty-four-eight";
      default:
        return "";
    }
  };

  private updateTile = (boardElement: HTMLDivElement, num: number) => {
    const className = this.getClassName(num);
    boardElement.innerText = `${num}`;
    boardElement.classList.value = "";
    boardElement.classList.add(className);
    if (num === 4096) {
      gameOver = true;
      mainBody.classList.add("game-over");
    }
  };

  private filterZero(row: number[]) {
    return row.filter((num) => num != 0); //create new array of all nums != 0
  }

  private slide(row: number[]) {
    //[0, 2, 2, 2]
    const filteredRow = this.filterZero(row); //[2, 2, 2]
    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        filteredRow[i + 1] = 0;
        this.gameScore += filteredRow[i];
        currentScore.innerText = `${this.gameScore}`;
      }
    } //[4, 0, 2]
    const afterMoveRow = this.filterZero(filteredRow); //[4, 2]
    //add zeroes
    while (afterMoveRow.length < this.gameSquareNumber) {
      afterMoveRow.push(0);
    }
    //[4, 2, 0, 0]
    return afterMoveRow;
  }

  private getNumberOfRow = (index: number, direction: string) =>
    (index === 0 && direction === "left") ||
    index % this.gameSquareNumber === 0 ||
    (index === gameGridsNumber && direction === "right");

  public slideLeft() {
    let firstArray = 0;
    let secondArray = 0;
    for (let i = 0; i < gameGridsNumber; i++) {
      if (this.getNumberOfRow(i, "left")) {
        secondArray = 0;
        firstArray = i === 0 ? firstArray : ++firstArray;
        const row = this.gameBoard[firstArray];
        const newRow = this.slide(row);
        this.gameBoard[firstArray] = newRow;
      }
      const boardElement = document.getElementById(`${i}`) as HTMLDivElement;
      const num = this.gameBoard[firstArray][secondArray];
      if (num > 0) {
        this.updateTile(boardElement, num);
      } else {
        boardElement.classList.value = "";
        boardElement.innerText = "";
      }
      secondArray++;
    }
  }

  public slideRight() {
    let firstArray = this.gameSquareNumber - 1;
    let secondArray = 0;
    for (let i = gameGridsNumber - 1; i > -1; i--) {
      if (this.getNumberOfRow(i + 1, "right")) {
        secondArray = this.gameSquareNumber - 1;
        firstArray = i + 1 === gameGridsNumber ? firstArray : --firstArray;
        const row = this.gameBoard[firstArray];
        const newRow = this.slide(row);
        this.gameBoard[firstArray] = newRow;
        console.log("new new enw new", row, firstArray);
        console.log("new row", newRow);
        //console.log("firstArray", firstArray);
        //console.log("this.gameBoard[firstArray]", this.gameBoard[firstArray]);
      }
      const boardElement = document.getElementById(`${i}`) as HTMLDivElement;
      const num = this.gameBoard[firstArray][secondArray];
      if (num > 0) {
        this.updateTile(boardElement, num);
        console.log("boardElement", boardElement);
        console.log("num", num);
      } else {
        boardElement.classList.value = "";
        boardElement.innerText = "";
      }
      secondArray--;
    }
  }

  public addRandomTile(cells: HTMLDivElement[]) {
    // Check if the cell is empty
    const emptyCells = cells.filter((cell) => !cell.textContent);

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
      randomCell.textContent = `${newValue}`;

      const gameArrayNumber =
        (Number(randomCell.id) + 1) % 4 === 0
          ? Number(randomCell.id) - 1
          : Number(randomCell.id);

      const gameArrayColumn = Math.floor(gameArrayNumber / 4);
      const gameArrayRow =
        Number(randomCell.id) - gameArrayColumn * this.gameSquareNumber;

      this.gameBoard[gameArrayColumn][gameArrayRow] = newValue;

      if (newValue === 2) {
        randomCell.classList.add("two");
      } else if (newValue === 4) {
        randomCell.classList.add("four");
      }
    } else {
      mainBody.classList.add("game-over");
      gameOver = true;
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

let PlayGame = new PlayGame2048();
