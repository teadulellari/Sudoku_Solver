import express from "express";
import nodemailer from "nodemailer";
import UserModel from "../models/userModel.js";
import VerificatinModel from "../models/verificationModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

//create transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teadulellari@gmail.com",
    pass: "bayftuftypevpjqn",
  },
});

//create email message using nodemailer
// let mailOptions = {
//   from: "teadulellari@gmail.com",
//   to: "berkintsn@gmail.com",
//   subject: "Test Email",
//   text: `http://localhost:3001/verify/${UUID}`,
// };

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check if the user exists
    const existingUser = await UserModel.findOne({ email });
    //if not, then save the user as a new one
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });
    if (!existingUser) {
      // encrypt the password and save user in db
      const hashedPass = await bcrypt.hash(password, 12);
      const saveUser = await UserModel.create({
        id:  ObjectId(),
        firstName: firstName ,
        lastName: lastName,
        email,
        password: hashedPass,
        isActive: false
      });
     

      const userId = existingUser.id;
      // also save the email verification data
      const verifyUser = await VerificatinModel.create({
       UUID: uuidv4(),
       date: new Date(Date.now()),
       userId: userId
      });
      ;
      const userUUID = existingUser.UUID;
      //verify the user with email
      transporter.sendMail({
        from: "teadulellari@gmail.com",
        to: "tea.dulellari@vkok.ee",
        subject: "Test Email",
        text: `http://localhost:3001/verify/${userUUID}`,
      }, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent to: " + firstName);
          res.status(200).send(info);
        }
      });
      
    }
  } catch (error) {
    res.send(error);
  }
};

export default router;
