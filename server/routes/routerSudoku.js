import express from "express";
const router = express.Router();

//import the controller
import { sudokuCheck } from '../controllers/controllerSudoku';


router.post('/sudoku/check', sudokuCheck);

export default router;
