export default class Game {
  // Constructor takes in an int that becomes
  // the dimensions of the board
  // Ex: new Game(4) = a 4 by 4 board
  constructor(boardSize) {
    this.gameState = {
      board: [],
      score: 0,
      won: false,
      over: false,
    };
    this.continue = false;
    this.boardSize = boardSize;
    this.moveListeners = [];
    this.winListeners = [];
    this.loseListeners = [];
    let zeroIndexes = [];
    for (let i = 0; i < boardSize ** 2; i++) {
      this.gameState.board.push(0);
      zeroIndexes.push(i);
    }
    // Need to add random indexes
    let tempArray = shuffle(zeroIndexes);
    const index1 = tempArray.pop();
    const index2 = tempArray.pop();

    const value1 = Math.random() >= 0.9 ? 4 : 2;
    const value2 = Math.random() >= 0.9 ? 4 : 2;
    this.gameState.board[index1] = value1;
    this.gameState.board[index2] = value2;
  }

  /*
  An example Board looks like this
  0, 0, 0, 2
  2, 0, 0, 32,
  0, 8, 0, 2
  16, 2, 2, 4
  */

  addNewTile() {
    let zeroIndexes = [];
    this.gameState.board.forEach((value, index) => {
      if (value === 0) {
        zeroIndexes.push(index);
      }
    });

    const newTileIndex = shuffle(zeroIndexes).pop();
    const value1 = Math.random() >= 0.9 ? 4 : 2;
    this.gameState.board[newTileIndex] = value1;
  }

  // adds new tiles
  setupNewGame() {
    this.gameState = {
      board: [],
      score: 0,
      won: false,
      over: false,
    };
    this.continue = false;
    this.moveListeners = [];
    this.winListeners = [];
    this.loseListeners = [];

    let zeroIndexes = [];
    for (let i = 0; i < this.boardSize ** 2; i++) {
      this.gameState.board.push(0);
      zeroIndexes.push(i);
    }
    // Need to add random indexes
    let tempArray = shuffle(zeroIndexes);
    const index1 = tempArray.pop();
    const index2 = tempArray.pop();

    const value1 = Math.random() >= 0.9 ? 2 : 4;
    const value2 = Math.random() >= 0.9 ? 2 : 4;
    this.gameState.board[index1] = value1;
    this.gameState.board[index2] = value2;
  }

  // gets current game state
  getGameState() {
    return this.gameState;
  }

  loadGame(gameState) {
    this.gameState = gameState;
    this.continue = false;
    this.boardSize = Math.sqrt(gameState.board.length);
  }

  toString() {
    const rowNum = this.boardSize;
    let rowString = "";
    for (let i = 0; i < rowNum ** 2; i++) {
      if (i % this.boardSize === this.boardSize - 1) {
        rowString += `[${
          this.gameState.board[i] === 0 ? " " : this.gameState.board[i]
        }]\n`;
      } else {
        rowString += `[${
          this.gameState.board[i] === 0 ? " " : this.gameState.board[i]
        }] `;
      }
    }
    console.log(rowString);
  }

  move(direction) {
    const boardLength = this.gameState.board.length;

    // copies the state board
    let iMoved = false;

    switch (direction) {
      case "up":
        // goes through the board for up
        let exitBoolean = false;
        let mergedListUp = [];
        for (let i = 0; i < boardLength; i++) {
          // when you get to the last row break out

          const upFunction = (i, merge = true) => {
            if (i >= this.boardSize * (this.boardSize - 1)) {
              exitBoolean = true;
              return;
              // break
            } else if (i < 0 || i >= boardLength) {
              return;
            }

            // both entries are zero so nothing needs to happen
            if (
              this.gameState.board[i] === 0 &&
              this.gameState.board[i + this.boardSize] === 0
            ) {
              // continue;
              return;
            }

            // checks if the square under you is compatible
            if (
              this.gameState.board[i] ===
                this.gameState.board[i + this.boardSize] ||
              this.gameState.board[i] === 0
            ) {
              // zeros are handled differently
              if (
                this.gameState.board[i] === 0 &&
                this.gameState.board[i + this.boardSize] !== 0
              ) {
                this.gameState.board[i] = this.gameState.board[
                  i + this.boardSize
                ];
                this.gameState.board[i + this.boardSize] = 0;
                iMoved = true;
                upFunction(i - this.boardSize);
              } else {
                // regular combination 2 + 2 = 4
                if (merge && !mergedListUp.includes(i)) {
                  this.gameState.board[i] = this.gameState.board[i] * 2;
                  this.gameState.board[i + this.boardSize] = 0;
                  this.gameState.score += this.gameState.board[i];
                  iMoved = true;
                  mergedListUp.push(i);
                  upFunction(i - this.boardSize, false);
                }
              }
              // Checks to see if the new tile is 2048
              if (this.gameState.board[i] === 2048) {
                // YOU WON
                this.gameState.won = true;
              }
            }
          };

          // if it reaches the last row
          if (exitBoolean) {
            break;
          }
          upFunction(i);
        }

        break;
      case "down":
        // start at bottom row

        let mergedList = [];
        for (let i = boardLength; i >= 0; i--) {
          const upFunction = (i, merge = true) => {
            // skips first row
            if (i < this.boardSize) {
              return;
            }

            // both entries are zero so nothing needs to happen
            if (
              this.gameState.board[i] === 0 &&
              this.gameState.board[i - this.boardSize] === 0
            ) {
              return;
            }

            // checks if the square above you is compatible
            if (
              this.gameState.board[i] ===
                this.gameState.board[i - this.boardSize] ||
              this.gameState.board[i] === 0
            ) {
              // deals with the 0 case
              if (
                this.gameState.board[i] === 0 &&
                this.gameState.board[i - this.boardSize] !== 0
              ) {
                this.gameState.board[i] = this.gameState.board[
                  i - this.boardSize
                ];
                this.gameState.board[i - this.boardSize] = 0;
                iMoved = true;

                upFunction(i + this.boardSize);
              } else {
                if (merge && !mergedList.includes(i)) {
                  this.gameState.board[i] = this.gameState.board[i] * 2;
                  this.gameState.board[i - this.boardSize] = 0;
                  this.gameState.score += this.gameState.board[i];
                  iMoved = true;
                  mergedList.push(i);
                  upFunction(i + this.boardSize, false);
                }
              }

              if (this.gameState.board[i] === 2048) {
                // YOU WON
                this.gameState.won = true;
              }
            }
          };
          upFunction(i);
        }

        break;
      case "left":
        let mergedListLeft = [];
        for (let i = 0; i < boardLength; i++) {
          // first column isnt allowed
          const upFunction = (i, merge = true) => {
            if (i % this.boardSize === 0) {
              return;
            }
            // both entries are zero so nothing needs to happen
            if (
              this.gameState.board[i - 1] === 0 &&
              this.gameState.board[i] === 0
            ) {
              return;
            }

            if (
              this.gameState.board[i] === this.gameState.board[i - 1] ||
              this.gameState.board[i - 1] === 0
            ) {
              // handling left and right diff than up and down
              // checking the actual block next to me rather than to see if
              // the reverse direction is good to merge
              if (
                this.gameState.board[i] !== 0 &&
                this.gameState.board[i - 1] === 0
              ) {
                this.gameState.board[i - 1] = this.gameState.board[i];
                this.gameState.board[i] = 0;
                iMoved = true;
                upFunction(i - 1);
              } else {
                if (merge && !mergedListLeft.includes(i)) {
                  this.gameState.board[i - 1] = this.gameState.board[i - 1] * 2;
                  this.gameState.board[i] = 0;
                  this.gameState.score += this.gameState.board[i - 1];
                  iMoved = true;
                  mergedListLeft.push(i);
                  upFunction(i - 1, false);
                }
              }

              if (this.gameState.board[i - 1] === 2048) {
                // YOU WON
                this.gameState.won = true;
              }
            }
          };
          upFunction(i);
        }
        break;
      case "right":
        let mergedListRight = [];
        for (let i = boardLength - 1; i >= 0; i--) {
          // last column isnt allowed
          const upFunction = (i, merge = true) => {
            if (i % this.boardSize === 0) {
              return;
            }
            // both entries are zero so nothing needs to happen
            if (
              this.gameState.board[i - 1] === 0 &&
              this.gameState.board[i] === 0
            ) {
              return;
            }
            // checks if the square above you is compatible
            if (
              this.gameState.board[i] === this.gameState.board[i - 1] ||
              this.gameState.board[i] === 0
            ) {
              if (
                this.gameState.board[i] === 0 &&
                this.gameState.board[i - 1] !== 0
              ) {
                this.gameState.board[i] = this.gameState.board[i - 1];
                this.gameState.board[i - 1] = 0;
                iMoved = true;
                upFunction(i + 1);
              } else {
                if (merge && !mergedListRight.includes(i)) {
                  this.gameState.board[i] = this.gameState.board[i] * 2;
                  this.gameState.board[i - 1] = 0;
                  this.gameState.score += this.gameState.board[i];
                  iMoved = true;
                  mergedListRight.push(i);
                  upFunction(i + 1, false);
                }
              }
              if (this.gameState.board[i] === 2048) {
                // YOU WON
                this.gameState.won = true;
              }
            }
          };
          upFunction(i);
        }
        break;
    }

    // Need to add a check to see if the new tile should be addded
    // For example: if you press up but nothing moves, dont add a tile
    if (iMoved) {
      // Need a method to add a new tile
      this.addNewTile();
      if (this.moveListeners.length !== 0) {
        this.moveListeners.forEach((eachFunction) => {
          eachFunction(this.gameState);
        });
      }
    }

    // calls all move functions

    if (this.gameState.won && iMoved && !this.continue) {
      // updates the moves
      // Calls win functions
      if (this.winListeners.length !== 0) {
        this.winListeners.forEach((eachFunction) => {
          eachFunction(this.gameState);
        });
      }
      this.continue = true;
      return;
    } else {
      // Check if the game you lost
      if (!iMoved) {
        return;
      }
      if (this.checkLose() && iMoved) {
        // update move listeners
        this.gameState.over = true;

        if (this.loseListeners.length !== 0) {
          this.loseListeners.forEach((eachFunction) => {
            eachFunction(this.gameState);
          });
        }
        return;
      }
    }
  }

  // adds an event listener for moves
  onMove(callback) {
    const bool = this.moveListeners.includes(callback);
    if (!bool) {
      this.moveListeners.push(callback);
    }
  }

  // adds an event listener for moves
  onWin(callback) {
    const bool = this.winListeners.includes(callback);
    if (!bool) {
      this.winListeners.push(callback);
    }
  }

  // adds an event listener for moves
  onLose(callback) {
    const bool = this.loseListeners.includes(callback);
    if (!bool) {
      this.loseListeners.push(callback);
    }
  }

  checkLose() {
    const tempBoard = this.gameState.board;
    let allNonZero = true;
    for (let i = 0; i < tempBoard.length; i++) {
      // game is not over
      if (tempBoard[i] === 0) {
        allNonZero = false;
        break;
      }
    }

    // if an entry is zero you haven't lost
    if (!allNonZero) return false;

    // Need to check if all of the entries are non zero

    const check = (l, r) => l === r;

    // need to check if any squares can merge
    if (allNonZero) {
      for (let i = 0; i < tempBoard.length; i++) {
        // the top row
        if (i < this.boardSize) {
          //top left corner
          if (i === 0) {
            if (
              check(tempBoard[0], tempBoard[1]) ||
              check(tempBoard[0], tempBoard[this.boardSize])
            ) {
              return false;
            }
          } else if (i === this.boardSize - 1) {
            // top right corner
            if (
              check(
                tempBoard[this.boardSize - 1],
                tempBoard[this.boardSize - 2] ||
                  check(
                    tempBoard[this.boardSize - 1],
                    tempBoard[(this.boardSize - 1) * 2]
                  )
              )
            ) {
              return false;
            }
          } else {
            // top row in between left and right corner
            // needs to check
            if (
              check(tempBoard[i], tempBoard[i - 1]) ||
              check(tempBoard[i], tempBoard[i + 1]) ||
              check(tempBoard[i], tempBoard[i + this.boardSize])
            ) {
              return false;
            }
          }
        } else if (i >= tempBoard.length - this.boardSize) {
          // Last row

          // checks the bottom left corner
          if (i === this.boardSize * (this.boardSize - 1)) {
            if (
              check(tempBoard[i], tempBoard[i + 1]) ||
              check(tempBoard[i], tempBoard[i - this.boardSize])
            ) {
              return false;
            }
          } else if (i === tempBoard.length - 1) {
            // bottom right corner
            if (
              check(tempBoard[i], tempBoard[i - 1]) ||
              check(tempBoard[i], tempBoard[i - this.boardSize])
            ) {
              return false;
            }
          } else {
            // everything in between left and right corners
            if (
              check(tempBoard[i], tempBoard[i - 1]) ||
              check(tempBoard[i], tempBoard[i + 1]) ||
              check(tempBoard[i], tempBoard[i - this.boardSize])
            ) {
              return false;
            }
          }
        } else {
          // middle rows

          // looks for left side column
          if (i % this.boardSize === 0) {
            if (
              check(tempBoard[i], tempBoard[i + this.boardSize]) ||
              check(tempBoard[i], tempBoard[i - this.boardSize]) ||
              check(tempBoard[i], tempBoard[i + 1])
            ) {
              return false;
            }
          } else if (i % this.boardSize === this.boardSize - 1) {
            // right side column
            if (
              check(tempBoard[i], tempBoard[i + this.boardSize]) ||
              check(tempBoard[i], tempBoard[i - this.boardSize]) ||
              check(tempBoard[i], tempBoard[i - 1])
            ) {
              return false;
            }
          } else {
            // all of the middle values
            if (
              check(tempBoard[i], tempBoard[i + this.boardSize]) ||
              check(tempBoard[i], tempBoard[i - this.boardSize]) ||
              check(tempBoard[i], tempBoard[i - 1]) ||
              check(tempBoard[i], tempBoard[i + 1])
            ) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
}

/*
 * KMP used this in class
 * LA said it was okay to use
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
export let shuffle = function (array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
