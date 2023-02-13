import express from "express";
const router = express.Router();

//import the controller
import { getSudoku, sudokuCheck } from '../controllers/controllerSudoku';

router.get('/', getSudoku);
router.post('/check', sudokuCheck);

export default router;
