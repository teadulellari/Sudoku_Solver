import express from "express";
const router = express.Router();


export const getSudoku = async (req, res) => {

  res.send("Hi");
}

export const  sudokuCheck = async (req, res) => {
    const  {board}  = req.body;
    console.log("This is what I get")
    console.log({board});

    
    try {
      const checkBoard  =  async (board) =>  {
        for (let row = 0; row <= 8; row++) {
          for (let col = 0; col <= 8; col++) {
            let num = board[row][col];
            // Check if the number is filled (not empty) and check its validity
            if (num !== '' && !isValid(board, row, col, num)) {
              return false;
            }
          }
        }
        return true;
      };
    
      const isValid = async (board, row, col, num) => {
        for (let i = 0; i <= 8; i++) {
          if (board[row][i] === num.toString()) {
            return false;
          }
        }
    
        for (let i = 0; i <= 8; i++) {
          if (board[i][col] === num.toString()) {
            console.log("it is not valid");
            return false;
          }
        }
    
        let startRow = row - row % 3;
        let startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num.toString()) {
              return false;
            }
          }
        }
        console.log("it is valid");
        return true;
      };
      const result = await checkBoard(board);
      console.log("This is the result" + result)
     res.status(200).send( result );
      
    } catch (error) {
      console.log("This is the error " + error)
      res.send(error);
    }
    
  
   
  };
  export default router;