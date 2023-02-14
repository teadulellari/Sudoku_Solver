import express from "express";
const router = express.Router();

//import the controller
import { sudokuCheck, sudokuSolve } from '../controllers/controllerSudoku.js';

router.post('/check', sudokuCheck);
router.post('/solve', sudokuSolve);

export default router;
