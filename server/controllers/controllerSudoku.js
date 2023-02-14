import express from "express";
const router = express.Router();

const isValid = (board, row, col, num) => {
  

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
  console.log(col - (col % 3));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        startRow !== row &&
        startCol !== col &&
        i + startRow!== row &&
        j + startCol!== col &&
        board[i + startRow][j + startCol] === num.toString()
      ) {
        return false;
      }
    }
  }
  return true;
};

const checkBoard = (board) => {
debugger;
  for (let row = 0; row <= 8; row++) {
    for (let col = 0; col <= 8; col++) {
      let num = board[row][col];

      // Check if the number is filled (not empty) and check its validity
      if (num !== "" && !(isValid(board, row, col, num))) {
        console.log(isValid(board, row, col, num));
        return false;
      }
    }
  }
  return true;
};

const solve = (board, row, col) => {
  debugger;
  console.log("this is row" + row)
  console.log("this is col" + col)
  //this changes the row
   if (col === 9) {
          row++;
          col = 0;
   }
   //the sudoku is solved 
   if( row === 9){
       return true;
   }
  //check if the cell is a number or .
  //if it is number i recursively call for next cell
   if (board[row][col] !== '') {
    console.log("element is not empty")
        return solve(board, row, col + 1);
    }
    //try numbers from 1 to 9 til i find one valid
    for (let i = 1; i <= 9; i++) {
          //if it is not valid  continue to the next number
          console.log("i value = "+i)
          console.log(isValid(board, row, col, i))
      if (!isValid(board, row, col, i)) {
        console.log("if it is not valid go next num")
        continue;
      }
     
       // if it is valid give this cell the string val of i
       console.log("if valid give the cell the i num")
       board[row][col] = i.toString();
       console.log("cell "+board[row][col]);
       //check about the next element 
       //if it is true retur ntrue, we are good so far
        if(solve(board, row, col + 1) === true ){
            return true;
        }else{
            //else we put the current element as '' because we found mistake 
            //and  continuedoing the process again
            console.log("found mistake")
            board[row][col] = '';
        
      }
    }
   return false;
};

export const sudokuCheck = async (req, res) => {
  const board = req.body;
  try {
    const result = await checkBoard(board);
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
};

export const sudokuSolve = async (req, res) => {
  const board = req.body;
  try {
  const result = await solve(board, 0, 0 ); 
    res.status(200).send(result);
  } catch (error) {
    console.log("This is the error " + error);
    res.send(error);
  }
}
export default router;
