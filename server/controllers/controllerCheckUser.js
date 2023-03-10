import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import RecoveryModel from "../models/recoveryModel.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

// create transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:"bestsudokusolver@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

export const checkUser = async (req, res) => {
  const email = decodeURIComponent(req.query.email);

  try {
    //check if user is in database
    const user = await UserModel.findOne({ email: email });

    if (!user) return res.status(200).send();

    const saveRecovery = await RecoveryModel.create({
      UUID: uuidv4(),
      date: new Date(Date.now()),
      userId: user._id,
    });

    //send email
    let mailOptions = {
      from: "bestsudokusolver@gmail.com",
      to: user.email,
      subject: "Account Recovery  Email",
      text: `Click the following link to reset your password  http://localhost:3000/recoverAccount/${saveRecovery?.UUID.toString()}`,
    };

    // verify the user with email
    transporter.sendMail(mailOptions, (error) => {
      res.status(200).send();
    });
  } catch (error) {
    res.send(error);
  }
};

export const recoverPassword = async (req, res) => {
  const id = req.body.id;
  const data = req.body.data;

  try {
    //find and replace passw where id is this
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const recoveryData = await RecoveryModel.findOne({ UUID: id });

    if (!recoveryData) return res.status(404).send("No data");
    //if less than 24 hours you can change it
    const lastChecked = recoveryData.date;
    const dateNow = new Date(Date.now());
    const hoursSinceLastChecked = (dateNow - lastChecked) / (1000 * 60 * 60);
    if (hoursSinceLastChecked < 24 && !recoveryData.hasExpired) {
      const user = await UserModel.findOneAndUpdate(
        { _id: recoveryData.userId },
        {
          password: hashedPassword,
        }
      );
      await RecoveryModel.findByIdAndUpdate(recoveryData._id, {
        hasExpired: true,
      });
      res.status(200).send("Password updated.");
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};

export default router;
