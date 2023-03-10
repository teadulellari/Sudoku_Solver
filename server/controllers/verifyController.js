import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import VerificationModel from "../models/verificationModel.js";

export const verifyUser = async (req, res) => {
  const { uuid } = req.params;

  try {
    const result = await VerificationModel.findOne({ UUID: uuid });

    if (!result) {
      return res
        .status(400)
        .json({ message: "Verification ID cannot be found" });
    }
    const id = result.userId;
    const lastChecked = result.date;
    const dateNow = new Date(Date.now());
    const hoursSinceLastChecked = (dateNow - lastChecked) / (1000 * 60 * 60);
    if (hoursSinceLastChecked < 24) {
      const user = await UserModel.findByIdAndUpdate(id, { isActive: true });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      } else {
        res.status(200).json({ message: "Your account is activated" });
      }
    } else {
      res.status(401).json({ message: "Token expired" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
