import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import RecoveryModel from "../models/recoveryModel.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
dotenv.config();

// create transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teadulellari@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

export const checkUser = async (req, res) => {
  const email = decodeURIComponent(req.query.email);
  console.log(email);

  try {
    //check if user is in database
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(200);
    console.log(user?._id.toString());
    

    const saveRecovery = await RecoveryModel.create({
        UUID: uuidv4(),
        date: new Date(Date.now()),
        userId: user._id,
      });
     

    //send email
    let mailOptions = {
      from: "teadulellari@gmail.com",
      to: "teadulellari@gmail.com",
      subject: "Account Recovery  Email",
      text: `Click the following link to reset your password  http://localhost:3000/recoverAccount/${saveRecovery?.UUID.toString()}`,
    };

    // verify the user with email
    transporter.sendMail(mailOptions, (error) => {
      res.status(200);
    });
  } catch (error) {
    res.send(error);
  }
};


export const recoverPassword = async (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    console.log(req.body.id);
    console.log(data);

    try {
        //find and replace passw where id is this
    const hashedPassword = await bcrypt.hash(data.password, 12);
    if(data.password !== data.repeatPassword) return res.status(401).send("Passwords don't match");
  
    const revoveryData = await RecoveryModel.findById(id);
    if(!revoveryData) return res.status(404).send("No data");
    //if less than 24 hours you can change it
    const lastChecked = revoveryData.date;
    const dateNow = new Date(Date.now());
    const hoursSinceLastChecked = (dateNow - lastChecked) / (1000 * 60 * 60);
    if(hoursSinceLastChecked < 24){
        const user = await UserModel.findByIdAndUpdate(id, {password: hashedPassword});
        console.log(user.password)
        res.status(200).send("Password updated.");
    }
    
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}

export default router;
