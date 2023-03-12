import express from "express";
import { isBoardValid, solveSudoku } from "../service/sudokuService.js";
const router = express.Router();

export const sudokuCheck = (req, res) => {
  const board = req.body;
  try {
    if (req.session.user) {
      const result = isBoardValid(board);
      res.status(200).send(result);
    } else {
      res.status(403).send("Session expired");
    }
  } catch (error) {
    res.send(error);
  }
};

export const sudokuSolve = (req, res) => {
  const board = req.body;
  try {
    if (req.session.user) {
      if (!isBoardValid(board)) {
        res.status(400).send();
      } else {
        const result = solveSudoku(board, 0, 0);
        res.status(200).send(board);
      }
    } else {
      res.status(403).send("Session expired");
    }
  } catch (error) {
    res.send(error);
  }
};

export default router;
