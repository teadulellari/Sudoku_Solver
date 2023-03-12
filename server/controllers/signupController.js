import express from "express";
import {
  createUser,
  createUserVerification,
  getUser,
} from "../service/userService.js";
import { hashPassword } from "../service/hashService.js";
import { sendMail } from "../service/emailService.js";
const router = express.Router();

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  try {
    // check if the user exists
    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    if (password !== repeatPassword)
      return res.status(401).json({ message: "Passwords don't match" });
    // encrypt the password and save user in db
    const hashedPass = hashPassword(password);
    const newUser = await createUser(firstName, lastName, email, hashedPass);
    if (newUser == null) {
      return res.status(500).send();
    }
    const userId = newUser._id.toString();
    // also save the email verification data
    const verifyUser = await createUserVerification(userId);
    // verify the user with email
    const isMailSend = await sendMail(
      newUser.email,
      "Verification Email",
      `Click the following link to verify your account http://localhost:3000/verify/${verifyUser.UUID}`
    );
    if(isMailSend){
      res.status(200).send(verifyUser.UUID);
    }
    else {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default router;
