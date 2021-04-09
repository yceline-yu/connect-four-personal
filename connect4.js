"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//the js data for making the board
//set "board" to empty HEIGHT x WIDTH matrix array
function makeBoard() {
  for(let y = 0; y < HEIGHT; y++){
    let rowArray = [];
    for(let x = 0; x < WIDTH; x++){
      rowArray.push(null);
    }
    board.push(rowArray)
  }
return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

//the js for adding the board to the document
function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");

  // makes the table row element and assigns id, adds click event function
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // sets the top row table data id, the id starts from 0 ends with 7
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell); //adds complete table data with id to table row
  }
  htmlBoard.append(top);
  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    //Create a table row element and assign to a "row" variable
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      //Create a table cell element and assign to a "cell" variable
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      //add an id, y-x, to the above table cell element
      //you'll use this later, so make sure you use y-x
      //append the table cell to the table row
      row.append(cell);
    }
    //append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT-1; y >= 0; y--){
    if(board[y][x] === null){
      return y
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  console.log("placeInTable runs")
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  let cell = document.getElementById(`${y}-${x}`);
  console.log(cell);
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  makeBoard();
  makeHtmlBoard();
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  let tieCheck = board.flat().every(elem => !elem);

  if (tieCheck){
    endGame("Tie");
  }

  // switch players
  // switch currPlayer 1 <-> 2
  if (currPlayer === 1){
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * y = height, x = width
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    //nest loop -> what am i trying to get? -> coordiante values
    //what will i do with values -> see if it gives a value from board array
    //if value given i need to check color of it to see if all coordinates are the same

cells.every(cell => {
  let y = cell[0];
  let x = cell[1];
  return y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer;
}
)
  //   for (let y = 0; y < cells.length; y++){
  //     for (let x = 0; x < cells[y].length, x++){
  //       if (board[cell[y][x]][cell[x][y]] === currPlayer){
  //       }
  //     }
  //   }
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
