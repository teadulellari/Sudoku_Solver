import express from "express";
const router = express.Router();
import { signUp } from "../controllers/signupController.js";

router.post("/signup/email", signUp);

export default router;
