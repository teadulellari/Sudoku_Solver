import express from "express";
const router = express.Router();

import { logIn, checkSessionValidity } from "../controllers/loginController.js";

router.post("/login", logIn);
router.get("/checkSession", checkSessionValidity);

export default router;
