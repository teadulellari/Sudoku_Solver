import express from "express";
const router = express.Router();
import { getUser, checkUserPass } from "../service/userService.js";

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password. Please try again." });
    }
    if (!user.isActive) {
      res.status(403).json({ message: "Account is not verified." });
    }
    const isPassValid = await checkUserPass(user, password);
    if (isPassValid) {
      req.session.user = user;
      return res.status(200).send({ name: `${user.firstName} ${user.lastName}` });
    }
    return res
      .status(401)
      .send({ message: "Incorrect email or password. Please try again." });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

export const checkSessionValidity = async (req, res) => {
  if (req.session.user) {
    const user = await getUser(req.session.user.email)
    if (!user) return res.status(404).send("User not found");

    const name = `${user.firstName} ${user.lastName}`;
    res.status(200).send({ name: name });
  } else {
    res.status(401).send("Unauthorized user");
  }
};

export default router;
