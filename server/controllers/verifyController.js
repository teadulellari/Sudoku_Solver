import express from "express";
const router = express.Router();
import { verifyUser as verificateUser } from "../service/userService.js";

export const verifyUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await verificateUser(uuid);
    switch (result) {
      case 1:
        res.status(200).json({ message: "Your account is activated" });
        break;
      case -1:
        res.status(401).json({ message: "Token expired" });
        break;
      default:
        res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
