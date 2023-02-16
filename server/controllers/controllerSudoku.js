import express from "express";
const router = express.Router();

const isValid = (board, row, col, num) => {
  debugger;

  for (let i = 0; i <= 8; i++) {
    if (i !== col && board[row][i] === num.toString()) {
      return false;
    }
  }

  for (let i = 0; i <= 8; i++) {
    if (i !== row && board[i][col] === num.toString()) {
      return false;
    }
  }

  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        (i + startRow !== row || j + startCol !== col) &&
        board[i + startRow][j + startCol] === num.toString()
      ) {
        return false;
      }
    }
  }
  return true;
};

const checkBoard = (board) => {
  for (let row = 0; row <= 8; row++) {
    for (let col = 0; col <= 8; col++) {
      let num = board[row][col];
      // Check if the number is filled (not empty) and check its validity
      if (num !== "" && !isValid(board, row, col, num)) {
        return false;
      }
    }
  }
  return true;
};

const solve = (board, row, col) => {
  //this changes the row
  if (col === 9) {
    row++;
    col = 0;
  }
  //the sudoku is solved
  if (row === 9) {
    return true;
  }
  //check if the cell is a number or .
  //if it is number i recursively call for next cell
  if (board[row][col] !== "") {
    return solve(board, row, col + 1);
  }

  //try numbers from 1 to 9 til i find one valid
  for (let i = 1; i <= 9; i++) {
    //if it is not valid  continue to the next number
    if (!isValid(board, row, col, i)) {
      continue;
    }

    // if it is valid give this cell the string val of i
    board[row][col] = i.toString();
    //check about the next element
    //if it is true retur ntrue, we are good so far
    if (solve(board, row, col + 1) === true) {
      return true;
    } else {
      //else we put the current element as '' because we found mistake
      //and  continuedoing the process again
      board[row][col] = "";
    }
  }
  return false;
};

export const sudokuCheck = (req, res) => {
  const board = req.body;
  try {
    const result = checkBoard(board);
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
};

export const sudokuSolve = (req, res) => {
  const board = req.body;
  try {
    const result = solve(board, 0, 0);
    res.status(200).send(board);
  } catch (error) {
    res.send(error);
  }
};

export default router;
