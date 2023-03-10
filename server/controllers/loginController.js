import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import { getUser, checkUserPass } from "../service/loginService.js";

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = getUser(email);
    if (!user) {
      return res.status(404).json({ message: "This user doesn't exist." });
    }
    if (!user.isActive) {
      res.status(403).json({ message: "Account is not verififed." });
    }
    const isPassValid = checkUserPass(user, password);
    if (isPassValid) {
      req.session.user = user;
      res.status(200).send({ name: `${user.firstName} ${user.lastName}` });
    }
    res
      .status(401)
      .json({ message: "Incorrect email or password. Please try again." });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const checkSessionValidity = async (req, res) => {
  if (req.session.user) {
    const userData = await UserModel.findOne({
      email: req.session.user.email,
    });

    if (!userData) return res.status(404).send("User not found");
    const name = `${userData.firstName} ${userData.lastName}`;

    res.status(200).send({ name: name });
  } else {
    res.status(401).send("Unauthorized user");
  }
};

export default router;
