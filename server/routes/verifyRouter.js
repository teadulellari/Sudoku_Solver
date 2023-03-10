import express from "express";
const router = express.Router();

//import the controller
import { verifyUser } from "../controllers/verifyController.js";

router.get("/verify/:uuid", verifyUser);

export default router;
