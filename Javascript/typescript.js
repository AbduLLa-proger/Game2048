"use strict";
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector(".right-arrow");
var numberOfGrids = document.querySelector(".grids");
var startGame = document.querySelector(".start-game");
var newGame = document.querySelector(".new-game");
var body = document.querySelector(".body");
var gridsNumber = 16;
var gameGridsNumber = 16;
var gridsAddClassNameCounter = 0;
var gridsRemoveClassNameCounter = 0;
var offsetXY = {
    0: 0,
    1: 129,
    2: 258,
    3: 387,
    4: 516,
    5: 645,
};
var numberOfCells = {
    0: 16,
    1: 25,
    2: 36,
};
var gridsClassNames = {
    0: "body-four-column",
    1: "body-six-column",
    2: "body-eight-column",
};
var positiveXAxis = {
    1: "moveByXOnePos",
    2: "moveByXTwoPos",
    3: "moveByXThreePos",
    4: "moveByXFourPos",
    5: "moveByXFivePos",
};
var positiveYAxis = {
    1: "moveByYOnePos",
    2: "moveByYTwoPos",
    3: "moveByYThreePos",
    4: "moveByYFourPos",
    5: "moveByYFivePos",
};
var negativeXAxis = {
    1: "moveByXOneNeg",
    2: "moveByXTwoNeg",
    3: "moveByXThreeNeg",
    4: "moveByXFourNeg",
    5: "moveByXFiveNeg",
};
var negativeYAxis = {
    1: "moveByYOneNeg",
    2: "moveByYTwoNeg",
    3: "moveByYThreeNeg",
    4: "moveByYFourNeg",
    5: "moveByYFiveNeg",
};
leftArrow.addEventListener("click", function () {
    if (Number(numberOfGrids.textContent) > 16) {
        gridsAddClassNameCounter -= 1;
        numberOfGrids.textContent = String(numberOfCells[gridsAddClassNameCounter]);
        gridsNumber = numberOfCells[gridsAddClassNameCounter];
    }
});
rightArrow.addEventListener("click", function () {
    if (Number(numberOfGrids.textContent) < 32) {
        gridsAddClassNameCounter += 1;
        numberOfGrids.textContent = String(numberOfCells[gridsAddClassNameCounter]);
        gridsNumber = numberOfCells[gridsAddClassNameCounter];
    }
});
startGame.addEventListener("click", function () {
    if (body.childElementCount !== gridsNumber) {
        body.classList.remove(gridsClassNames[gridsRemoveClassNameCounter]);
        body.classList.add(gridsClassNames[gridsAddClassNameCounter]);
        gridsRemoveClassNameCounter = gridsAddClassNameCounter;
        gameGridsNumber = gridsNumber;
        new Game2048();
    }
});
newGame.addEventListener("click", function () {
    new Game2048();
});
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
        // Arrow down key is pressed
        PlayGame.addRandomTile(PlayGame.board);
    }
    else if (event.key === "ArrowUp") {
        // Arrow down key is pressed
        var hh = PlayGame.addRandomTile(PlayGame.board);
        console.log(hh);
    }
    else if (event.key === "ArrowRight") {
        // Arrow down key is pressed
        console.log(PlayGame.gameBoardArray);
        PlayGame.moveBoard("PositiveX");
        PlayGame.addRandomTile(PlayGame.board);
    }
    else if (event.key === "ArrowLeft") {
        // Arrow down key is pressed
        PlayGame.addRandomTile(PlayGame.board);
    }
});
var Game2048 = /** @class */ (function () {
    function Game2048() {
        this.gameBoardArray = new Array(gameGridsNumber);
        body.innerHTML = "";
        this.play();
        this.board = this.initializeBoard();
    }
    Game2048.prototype.initializeBoard = function () {
        var board = [];
        // Select all grid cells within the body-four-column container
        var cells = document.querySelectorAll(".body > div > span");
        cells.forEach(function (cell) {
            board.push(cell);
        });
        this.addRandomTile(board);
        this.addRandomTile(board);
        return board;
    };
    Game2048.prototype.findAxes = function (index, board, direction) {
        var _a;
        if ((index + 1) % 4 === 0)
            return false;
        var startBoardIndex = Math.floor(index / 4) + 1;
        var length = Math.floor(index / 4) + 4;
        var moveByAxes = 0;
        for (var i = 4 * startBoardIndex; i < length; i++) {
            if (((_a = board[i].textContent) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                moveByAxes++;
            }
        }
        return moveByAxes;
    };
    Game2048.prototype.moveBoard = function (direction) {
        var cells = document.querySelectorAll(".body > div > span");
        var angleNumber = "";
        var squareNumber = gameGridsNumber % 4 === 0
            ? 4
            : gameGridsNumber % 5 === 0
                ? 5
                : gameGridsNumber % 6 === 0
                    ? 6
                    : 0;
        var positiveAxes = 0;
        var noNumberFound = false;
        if (direction === "PositiveX") {
            var squareAngleNumber = squareNumber + 1;
            for (var i = gameGridsNumber - 1; i > -1; i--) {
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
                if (this.gameBoardArray[i] !== undefined &&
                    noNumberFound &&
                    this.gameBoardArray[i] !== "") {
                    if (angleNumber === "undefined") {
                        positiveAxes++;
                        this.gameBoardArray[squareAngleNumber * squareNumber - positiveAxes] = this.gameBoardArray[i];
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
                            this.gameBoardArray[squareAngleNumber * squareNumber - positiveAxes] = this.gameBoardArray[i];
                            // console.log(squareAngleNumber, squareNumber, positiveAxes, i);
                        }
                    }
                    else if (angleNumber !== this.gameBoardArray[i]) {
                        // console.log(
                        //   "what number",
                        //   angleNumber,
                        //   this.gameBoardArray[i],
                        //   noNumberFound
                        // );
                        positiveAxes++;
                        noNumberFound = false;
                        this.gameBoardArray[squareAngleNumber * squareNumber - positiveAxes] = this.gameBoardArray[i];
                    }
                    else if (angleNumber === this.gameBoardArray[i]) {
                        // console.log(angleNumber, i, this.gameBoardArray[i]);
                        this.gameBoardArray[i] = "";
                    }
                }
            }
        }
        console.log("0000", this.gameBoardArray);
        // this.addRandomTile(PlayGame.board);
    };
    Game2048.prototype.addRandomTile = function (cells) {
        // Check if the cell is empty
        var emptyCells = cells.filter(function (cell) { return !cell.textContent; });
        if (emptyCells.length > 0) {
            var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
            randomCell.textContent = newValue.toString();
            this.gameBoardArray[Number(randomCell.id)] = newValue.toString();
            console.log("1111", this.gameBoardArray);
            if (newValue === 2) {
                randomCell.classList.add("two");
            }
            else if (newValue === 4) {
                randomCell.classList.add("four");
            }
        }
    };
    Game2048.prototype.play = function () {
        for (var i = 0; i < gameGridsNumber; i++) {
            var newDivElement = document.createElement("div");
            var newSpanElement = document.createElement("span");
            newSpanElement.id = "".concat(i);
            newDivElement.appendChild(newSpanElement);
            body.appendChild(newDivElement);
        }
    };
    return Game2048;
}());
var PlayGame = new Game2048();
//# sourceMappingURL=typescript.js.map