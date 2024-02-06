"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector(".right-arrow");
var gameScore = document.querySelector(".game-score");
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
    1: "body-five-column",
    2: "body-six-column",
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
    if (Number(gameScore.textContent) > 16) {
        gridsAddClassNameCounter -= 1;
        gameScore.textContent = String(numberOfCells[gridsAddClassNameCounter]);
        gridsNumber = numberOfCells[gridsAddClassNameCounter];
    }
});
rightArrow.addEventListener("click", function () {
    if (Number(gameScore.textContent) < 32) {
        gridsAddClassNameCounter += 1;
        gameScore.textContent = String(numberOfCells[gridsAddClassNameCounter]);
        gridsNumber = numberOfCells[gridsAddClassNameCounter];
    }
});
startGame.addEventListener("click", function () {
    if (body.childElementCount !== gridsNumber) {
        body.classList.remove(gridsClassNames[gridsRemoveClassNameCounter]);
        body.classList.add(gridsClassNames[gridsAddClassNameCounter]);
        gridsRemoveClassNameCounter = gridsAddClassNameCounter;
        gameGridsNumber = gridsNumber;
        mainBody.classList.value = "";
        PlayGame = new PlayGame2048();
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
            PlayGame.slideDown();
            PlayGame.addRandomTile(PlayGame.board);
        }
        else if (event.key === "ArrowUp") {
            // Arrow down key is pressed
            PlayGame.slideUp();
            PlayGame.addRandomTile(PlayGame.board);
        }
        else if (event.key === "ArrowRight") {
            // Arrow down key is pressed
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
        this.gameBoard = [];
        this.fourBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.fiveBoard = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        this.sixBoard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        this.gameSquareNumber = gameGridsNumber / 4 === 4
            ? 4
            : gameGridsNumber / 5 === 5
                ? 5
                : gameGridsNumber / 6 === 6
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
            if (num >= 4096) {
                gameOver = true;
                mainBody.classList.add("game-over");
            }
        };
        this.getNumberOfRow = function (index, direction) {
            return (index === 0 && direction === "left") ||
                index % _this.gameSquareNumber === 0 ||
                (index === gameGridsNumber && direction === "right");
        };
        this.getColumnArray = function (column) {
            if (_this.gameSquareNumber === 5) {
                return [
                    _this.gameBoard[0][column],
                    _this.gameBoard[1][column],
                    _this.gameBoard[2][column],
                    _this.gameBoard[3][column],
                    _this.gameBoard[4][column],
                ];
            }
            else if (_this.gameSquareNumber === 6) {
                return [
                    _this.gameBoard[0][column],
                    _this.gameBoard[1][column],
                    _this.gameBoard[2][column],
                    _this.gameBoard[3][column],
                    _this.gameBoard[4][column],
                    _this.gameBoard[5][column],
                ];
            }
            return [
                _this.gameBoard[0][column],
                _this.gameBoard[1][column],
                _this.gameBoard[2][column],
                _this.gameBoard[3][column],
            ];
        };
        this.slideLeft = function () {
            var firstArray = 0;
            var secondArray = 0;
            for (var i = 0; i < gameGridsNumber; i++) {
                if (_this.getNumberOfRow(i, "left")) {
                    secondArray = 0;
                    firstArray = i === 0 ? firstArray : ++firstArray;
                    var row = _this.gameBoard[firstArray];
                    var newRow = _this.slide(row, "left");
                    _this.gameBoard[firstArray] = newRow;
                }
                var boardElement = document.getElementById("".concat(i));
                var num = _this.gameBoard[firstArray][secondArray];
                if (num > 0) {
                    _this.updateTile(boardElement, num);
                }
                else {
                    boardElement.classList.value = "";
                    boardElement.innerText = "";
                }
                secondArray++;
            }
        };
        this.slideRight = function () {
            var firstArray = _this.gameSquareNumber - 1;
            var secondArray = 0;
            for (var i = gameGridsNumber - 1; i > -1; i--) {
                if (_this.getNumberOfRow(i + 1, "right")) {
                    secondArray = _this.gameSquareNumber - 1;
                    firstArray = i + 1 === gameGridsNumber ? firstArray : --firstArray;
                    var row = _this.gameBoard[firstArray];
                    var newRow = _this.slide(row, "right");
                    _this.gameBoard[firstArray] = newRow;
                }
                var boardElement = document.getElementById("".concat(i));
                var num = _this.gameBoard[firstArray][secondArray];
                if (num > 0) {
                    _this.updateTile(boardElement, num);
                }
                else {
                    boardElement.classList.value = "";
                    boardElement.innerText = "";
                }
                secondArray--;
            }
        };
        this.slideUp = function () {
            var firstArray = 0;
            var secondArray = 0;
            var columnIndex = 0;
            var tempArray = __spreadArray([], __read(_this.gameBoard), false);
            var isNumber = /[0-9]/;
            for (var i = 0; i < _this.gameSquareNumber; i++) {
                var row = _this.getColumnArray(i);
                var newRow = _this.slide(row, "left");
                tempArray[i] = newRow;
            }
            _this.gameBoard = tempArray;
            for (var i = 0; i < gameGridsNumber; i++) {
                if (_this.getNumberOfRow(i, "left")) {
                    secondArray = 0;
                    firstArray = i === 0 ? firstArray : ++firstArray;
                }
                if (columnIndex % _this.gameSquareNumber === 0) {
                    columnIndex = 0;
                }
                var idElement = columnIndex === 0
                    ? columnIndex + firstArray
                    : firstArray + _this.gameSquareNumber * columnIndex;
                var boardElement = document.getElementById("".concat(idElement));
                var num = _this.gameBoard[firstArray][secondArray];
                if (num > 0) {
                    _this.updateTile(boardElement, num);
                }
                else {
                    boardElement.classList.value = "";
                    boardElement.innerText = "";
                }
                secondArray++;
                columnIndex++;
            }
            for (var i = 0; i < gameGridsNumber; i++) {
                if (_this.getNumberOfRow(i, "left")) {
                    secondArray = 0;
                    firstArray = i === 0 ? 0 : ++firstArray;
                }
                var boardElement = document.getElementById("".concat(i));
                var assignNumber = isNumber.test(boardElement.innerText)
                    ? boardElement.innerText
                    : 0;
                _this.gameBoard[firstArray][secondArray] = Number(assignNumber);
                secondArray++;
            }
        };
        this.slideDown = function () {
            var firstArray = 0;
            var secondArray = 0;
            var columnIndex = 0;
            var tempArray = __spreadArray([], __read(_this.gameBoard), false);
            var isNumber = /[0-9]/;
            for (var i = 0; i < _this.gameSquareNumber; i++) {
                var row = _this.getColumnArray(i);
                var newRow = _this.slide(row, "right");
                tempArray[i] = newRow;
            }
            _this.gameBoard = tempArray;
            for (var i = 0; i < gameGridsNumber; i++) {
                if (_this.getNumberOfRow(i, "left")) {
                    secondArray = 0;
                    firstArray = i === 0 ? firstArray : ++firstArray;
                }
                if (columnIndex % _this.gameSquareNumber === 0) {
                    columnIndex = 0;
                }
                var idElement = columnIndex === 0
                    ? columnIndex + firstArray
                    : firstArray + _this.gameSquareNumber * columnIndex;
                var boardElement = document.getElementById("".concat(idElement));
                var num = _this.gameBoard[firstArray][secondArray];
                if (num > 0) {
                    _this.updateTile(boardElement, num);
                }
                else {
                    boardElement.classList.value = "";
                    boardElement.innerText = "";
                }
                secondArray++;
                columnIndex++;
            }
            for (var i = 0; i < gameGridsNumber; i++) {
                if (_this.getNumberOfRow(i, "left")) {
                    secondArray = 0;
                    firstArray = i === 0 ? 0 : ++firstArray;
                }
                var boardElement = document.getElementById("".concat(i));
                var assignNumber = isNumber.test(boardElement.innerText)
                    ? boardElement.innerText
                    : 0;
                _this.gameBoard[firstArray][secondArray] = Number(assignNumber);
                secondArray++;
            }
        };
        body.innerHTML = "";
        this.play();
        this.board = this.initializeBoard();
    }
    PlayGame2048.prototype.initializeBoard = function () {
        var board = [];
        var cells = document.querySelectorAll(".body > div > span");
        cells.forEach(function (cell) {
            board.push(cell);
        });
        this.addRandomTile(board);
        this.addRandomTile(board);
        return board;
    };
    PlayGame2048.prototype.filterZero = function (row) {
        return row.filter(function (num) { return num !== 0; }); //create new array of all nums != 0
    };
    PlayGame2048.prototype.slide = function (row, direction) {
        var filteredRow = this.filterZero(row);
        if (direction === "left") {
            for (var i = 0; i < filteredRow.length - 1; i++) {
                if (filteredRow[i] === filteredRow[i + 1]) {
                    filteredRow[i] *= 2;
                    filteredRow[i + 1] = 0;
                    this.gameScore += filteredRow[i];
                    currentScore.innerText = "".concat(this.gameScore);
                }
            }
            var afterMoveRow_1 = this.filterZero(filteredRow);
            while (afterMoveRow_1.length < this.gameSquareNumber) {
                afterMoveRow_1.push(0);
            }
            return afterMoveRow_1;
        }
        for (var i = filteredRow.length - 1; i > 0; i--) {
            if (filteredRow[i] === filteredRow[i - 1]) {
                filteredRow[i] *= 2;
                filteredRow[i - 1] = 0;
                this.gameScore += filteredRow[i];
                currentScore.innerText = "".concat(this.gameScore);
            }
        }
        var afterMoveRow = this.filterZero(filteredRow);
        while (afterMoveRow.length < this.gameSquareNumber) {
            afterMoveRow.unshift(0);
        }
        return afterMoveRow;
    };
    PlayGame2048.prototype.addRandomTile = function (cells) {
        // Check if the cell is empty
        var emptyCells = cells.filter(function (cell) { return !cell.textContent; });
        if (emptyCells.length > 0) {
            var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
            randomCell.textContent = "".concat(newValue);
            var gameArrayNumber = (Number(randomCell.id) + 1) % this.gameSquareNumber === 0
                ? Number(randomCell.id) - 1
                : Number(randomCell.id);
            var gameArrayColumn = Math.floor(gameArrayNumber / this.gameSquareNumber);
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
        if (this.gameSquareNumber === 4) {
            this.gameBoard = __spreadArray([], __read(this.fourBoard), false);
        }
        else if (this.gameSquareNumber === 5) {
            this.gameBoard = __spreadArray([], __read(this.fiveBoard), false);
        }
        else if (this.gameSquareNumber === 6) {
            this.gameBoard = __spreadArray([], __read(this.sixBoard), false);
        }
    };
    return PlayGame2048;
}());
var PlayGame = new PlayGame2048();
//# sourceMappingURL=typescript.js.map