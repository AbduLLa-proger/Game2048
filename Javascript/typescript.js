"use strict";
var _a;
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
        console.log("Arrow down key is pressed!");
        PlayGame.addRandomTile(PlayGame.board);
    }
    else if (event.key === "ArrowUp") {
        // Arrow down key is pressed
        console.log("Arrow up key is pressed!");
        PlayGame.addRandomTile(PlayGame.board);
    }
    else if (event.key === "ArrowRight") {
        // Arrow down key is pressed
        console.log("Arrow right key is pressed!");
        PlayGame.addRandomTile(PlayGame.board);
    }
    else if (event.key === "ArrowLeft") {
        // Arrow down key is pressed
        console.log("Arrow left key is pressed!");
        PlayGame.addRandomTile(PlayGame.board);
    }
});
var Game2048 = /** @class */ (function () {
    function Game2048() {
        this.firstRowX = [];
        this.secondRowX = [];
        this.thirdRowX = [];
        this.fourthRowX = [];
        this.fifthRowX = [];
        this.sixthRowX = [];
        this.firstRowY = [];
        this.secondRowY = [];
        this.thirdRowY = [];
        this.fourthRowY = [];
        this.fifthRowY = [];
        this.sixthRowY = [];
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
    Game2048.prototype.findAxes = function (index, board) {
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
    Game2048.prototype.moveBoard = function (direction, axes) {
        var _a;
        for (var i = 0; i < this.board.length; i++) {
            if (((_a = this.board[i].textContent) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                var moveBy_1 = this.findAxes(i, this.board);
                if (Number(moveBy_1) > 0) {
                    if (direction === "positive") {
                        if (axes === "X") {
                            var className = positiveXAxis[Number(moveBy_1)];
                            this.board[i].classList.add(className);
                        }
                        else if (axes === "Y") {
                            var className = positiveYAxis[Number(moveBy_1)];
                            this.board[i].classList.add(className);
                        }
                    }
                    else if (direction === "negative") {
                        if (axes === "X") {
                            var className = negativeXAxis[Number(moveBy_1)];
                            this.board[i].classList.add(className);
                        }
                        else if (axes === "Y") {
                            var className = negativeYAxis[Number(moveBy_1)];
                            this.board[i].classList.add(className);
                        }
                    }
                }
            }
        }
    };
    Game2048.prototype.addRandomTile = function (cells) {
        // Check if the cell is empty
        var emptyCells = cells.filter(function (cell) { return !cell.textContent; });
        if (emptyCells.length > 0) {
            var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
            randomCell.textContent = newValue.toString();
            if (newValue === 2) {
                randomCell.classList.add("two");
                console.log(randomCell.classList.value);
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
            newDivElement.appendChild(newSpanElement);
            body.appendChild(newDivElement);
        }
    };
    return Game2048;
}());
var PlayGame = new Game2048();
console.log(PlayGame.board);
console.log(((_a = PlayGame.board[0].textContent) === null || _a === void 0 ? void 0 : _a.length) === 0);
//# sourceMappingURL=typescript.js.map