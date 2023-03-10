import express from "express";
import nodemailer from "nodemailer";
import UserModel from "../models/userModel.js";
import VerificationModel from "../models/verificationModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// create transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bestsudokusolver@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;

  try {
    // check if the user exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    if (password !== repeatPassword)
      return res.status(401).json({ message: "Passwords don't match" });
    // encrypt the password and save user in db
    const hashedPass = await bcrypt.hash(password, 12);

    const saveUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPass,
      isActive: false,
    });

    const userId = saveUser._id.toString();

    // also save the email verification data
    const verifyUser = await VerificationModel.create({
      UUID: uuidv4(),
      date: new Date(Date.now()),
      userId: userId,
    });

    // create email message using nodemailer
    let mailOptions = {
      from: "bestsudokusolver@gmail.com",
      to: saveUser.email,
      subject: "Verification Email",
      text: `Click the following link to verify your account http://localhost:3000/verify/${verifyUser.UUID}`,
    };
    // verify the user with email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(verifyUser.UUID);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default router;
