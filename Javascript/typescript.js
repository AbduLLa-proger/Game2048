"use strict";
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector(".right-arrow");
var numberOfGrids = document.querySelector(".grids");
var startGame = document.querySelector(".start-game");
var newGame = document.querySelector(".new-game");
var body = document.querySelector(".body");
var currentScore = document.querySelector(".current-score");
var bestScore = document.querySelector(".best-score");
var mainBody = document.body;
var gridsNumber = 16;
var gameGridsNumber = 16;
var gridsAddClassNameCounter = 0;
var gridsRemoveClassNameCounter = 0;
var gameOver = false;
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
        new PlayGame2048();
    }
});
newGame.addEventListener("click", function () {
    gameOver = false;
    mainBody.classList.value = "";
    PlayGame = new PlayGame2048();
});
document.addEventListener("keydown", function (event) {
    if (!gameOver) {
        if (event.key === "ArrowDown") {
            // Arrow down key is pressed
            PlayGame.addRandomTile(PlayGame.board);
        }
        else if (event.key === "ArrowUp") {
            // Arrow down key is pressed
            var hh = PlayGame.addRandomTile(PlayGame.board);
        }
        else if (event.key === "ArrowRight") {
            // Arrow down key is pressed
            // PlayGame.moveBoard("PositiveX");
            PlayGame.slideRight();
            PlayGame.addRandomTile(PlayGame.board);
        }
        else if (event.key === "ArrowLeft") {
            // Arrow down key is pressed
            PlayGame.slideLeft();
            PlayGame.addRandomTile(PlayGame.board);
        }
    }
});
var PlayGame2048 = /** @class */ (function () {
    function PlayGame2048() {
        var _this = this;
        this.gameScore = 0;
        this.gameBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.gameSquareNumber = gameGridsNumber % 4 === 0
            ? 4
            : gameGridsNumber % 5 === 0
                ? 5
                : gameGridsNumber % 6 === 0
                    ? 6
                    : 4;
        this.getClassName = function (num) {
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
        this.updateTile = function (boardElement, num) {
            var className = _this.getClassName(num);
            boardElement.innerText = "".concat(num);
            boardElement.classList.value = "";
            boardElement.classList.add(className);
            if (num === 4096) {
                gameOver = true;
                mainBody.classList.add("game-over");
            }
        };
        this.getNumberOfRow = function (index, direction) {
            return (index === 0 && direction === "left") ||
                index % _this.gameSquareNumber === 0 ||
                (index === gameGridsNumber && direction === "right");
        };
        body.innerHTML = "";
        this.play();
        this.board = this.initializeBoard();
    }
    PlayGame2048.prototype.initializeBoard = function () {
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
    PlayGame2048.prototype.filterZero = function (row) {
        return row.filter(function (num) { return num != 0; }); //create new array of all nums != 0
    };
    PlayGame2048.prototype.slide = function (row) {
        //[0, 2, 2, 2]
        var filteredRow = this.filterZero(row); //[2, 2, 2]
        for (var i = 0; i < filteredRow.length - 1; i++) {
            if (filteredRow[i] === filteredRow[i + 1]) {
                filteredRow[i] *= 2;
                filteredRow[i + 1] = 0;
                this.gameScore += filteredRow[i];
                currentScore.innerText = "".concat(this.gameScore);
            }
        } //[4, 0, 2]
        var afterMoveRow = this.filterZero(filteredRow); //[4, 2]
        //add zeroes
        while (afterMoveRow.length < this.gameSquareNumber) {
            afterMoveRow.push(0);
        }
        //[4, 2, 0, 0]
        return afterMoveRow;
    };
    PlayGame2048.prototype.slideLeft = function () {
        var firstArray = 0;
        var secondArray = 0;
        for (var i = 0; i < gameGridsNumber; i++) {
            if (this.getNumberOfRow(i, "left")) {
                secondArray = 0;
                firstArray = i === 0 ? firstArray : ++firstArray;
                var row = this.gameBoard[firstArray];
                var newRow = this.slide(row);
                this.gameBoard[firstArray] = newRow;
            }
            var boardElement = document.getElementById("".concat(i));
            var num = this.gameBoard[firstArray][secondArray];
            if (num > 0) {
                this.updateTile(boardElement, num);
            }
            else {
                boardElement.classList.value = "";
                boardElement.innerText = "";
            }
            secondArray++;
        }
    };
    PlayGame2048.prototype.slideRight = function () {
        var firstArray = this.gameSquareNumber - 1;
        var secondArray = 0;
        for (var i = gameGridsNumber - 1; i > -1; i--) {
            if (this.getNumberOfRow(i + 1, "right")) {
                secondArray = this.gameSquareNumber - 1;
                firstArray = i + 1 === gameGridsNumber ? firstArray : --firstArray;
                var row = this.gameBoard[firstArray];
                var newRow = this.slide(row);
                this.gameBoard[firstArray] = newRow;
                console.log("new new enw new", row, firstArray);
                console.log("new row", newRow);
                //console.log("firstArray", firstArray);
                //console.log("this.gameBoard[firstArray]", this.gameBoard[firstArray]);
            }
            var boardElement = document.getElementById("".concat(i));
            var num = this.gameBoard[firstArray][secondArray];
            if (num > 0) {
                this.updateTile(boardElement, num);
                console.log("boardElement", boardElement);
                console.log("num", num);
            }
            else {
                boardElement.classList.value = "";
                boardElement.innerText = "";
            }
            secondArray--;
        }
    };
    PlayGame2048.prototype.addRandomTile = function (cells) {
        // Check if the cell is empty
        var emptyCells = cells.filter(function (cell) { return !cell.textContent; });
        if (emptyCells.length > 0) {
            var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
            randomCell.textContent = "".concat(newValue);
            var gameArrayNumber = (Number(randomCell.id) + 1) % 4 === 0
                ? Number(randomCell.id) - 1
                : Number(randomCell.id);
            var gameArrayColumn = Math.floor(gameArrayNumber / 4);
            var gameArrayRow = Number(randomCell.id) - gameArrayColumn * this.gameSquareNumber;
            this.gameBoard[gameArrayColumn][gameArrayRow] = newValue;
            if (newValue === 2) {
                randomCell.classList.add("two");
            }
            else if (newValue === 4) {
                randomCell.classList.add("four");
            }
        }
        else {
            mainBody.classList.add("game-over");
            gameOver = true;
        }
    };
    PlayGame2048.prototype.play = function () {
        for (var i = 0; i < gameGridsNumber; i++) {
            var newDivElement = document.createElement("div");
            var newSpanElement = document.createElement("span");
            newSpanElement.id = "".concat(i);
            newDivElement.appendChild(newSpanElement);
            body.appendChild(newDivElement);
        }
    };
    return PlayGame2048;
}());
var PlayGame = new PlayGame2048();
//# sourceMappingURL=typescript.js.map