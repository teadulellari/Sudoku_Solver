import express from "express";
const router = express.Router();

//import the controller
import { verifyUser } from "../controllers/controllerVerify.js";

router.get("/verify/:uuid", verifyUser);

export default router;
