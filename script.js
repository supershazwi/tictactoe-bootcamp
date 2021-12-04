// Please implement exercise logic here
// keep data about the game in a 2-D array
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const winningNumbers = [
  ["00", "01", "02"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"],
  ["20", "11", "02"],
];

// if any of this 0 hit 3 first, the player wins, if not, draw

const playerCheck = {
  X: [0, 0, 0, 0, 0, 0, 0, 0],
  O: [0, 0, 0, 0, 0, 0, 0, 0],
};

let roundWon = false;

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = "X";

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

const squareClick = (row, column) => {
  // see if the clicked square has been clicked on before
  if (!roundWon) {
    if (board[row][column] === "") {
      // alter the data array, set it to the current player
      board[row][column] = currentPlayer;

      // refresh the creen with a new board
      // according to the array that was just changed
      buildBoard(board);

      // check winner
      checkWinner(row, column);

      // change the player
      togglePlayer();
    }
  }
};

const checkWinner = (row, column) => {
  // loop through winningNumbers
  const coordinate = `${row}${column}`;

  for (let i = 0; i < winningNumbers.length; i++) {
    if (winningNumbers[i].indexOf(coordinate) !== -1) {
      playerCheck[currentPlayer][i]++;
    }
  }

  for (let i = 0; i < playerCheck[currentPlayer].length; i++) {
    if (playerCheck[currentPlayer][i] == 3) {
      document.getElementById(
        "message"
      ).innerHTML = `Player ${currentPlayer} wins!`;
      roundWon = true;
    }
  }
};

initGame();
