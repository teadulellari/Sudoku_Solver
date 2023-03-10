import express from "express";
const router = express.Router();

//import the controller
import { sudokuCheck, sudokuSolve } from "../controllers/sudokuController.js";

router.post("/check", sudokuCheck);
router.post("/solve", sudokuSolve);

export default router;
