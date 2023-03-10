import nodemailer from "nodemailer";
import VerificationModel from "../models/verificationModel.js";
import UserModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
dotenv.config();

// create transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bestsudokusolver@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

export const getExistingUser = async (email) => {
  return await UserModel.findOne({ email });
};

export const saveUser = async (password) => {
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
};

export const sendMail = async () => {
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
};
