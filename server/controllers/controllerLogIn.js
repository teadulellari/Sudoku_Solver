import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "This user doesn't exist." });
    }
    console.log("this is the session value before")
    console.log(req.session.user )
    req.session.user = user;
    
    console.log("this is the session value after")
    console.log(req.session.user )
    const userEmail = user.email;
    const userPassword = user.password;
    const isMatch = await bcrypt.compare(password, userPassword);

    if (userEmail === email && isMatch) {
      if (user.isActive) {
        res.status(200).send({ name: `${user.firstName} ${user.lastName}` });
      } else {
        res.status(403).json({ message: "Account is not verififed." });
      }
    } else if (userEmail !== email || !isMatch) {
      res
        .status(401)
        .json({ message: "Incorrect email or password. Please try again." });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const checkSessionValidity = async (req, res) => {

  if (req.session.user) {
    const userData = await UserModel.findOne({
       email: req.session.user.email
    });
    console.log("this is the email of user")
    console.log(userData.email)
    if (!userData) return res.status(404).send("User not found");
    const name = `${userData.firstName} ${userData.lastName}`;
    console.log("this is name")
    console.log(name)
    res.status(200).send({name: name});
  } else {
    res.status(401).send("Unauthorized user");
  }
};

export default router;
