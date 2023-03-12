import express from "express";
const router = express.Router();
import {
  changePasswordByRecovery,
  createPasswordRecovery,
  getUser,
} from "../service/userService.js";
import { sendMail } from "../service/emailService.js";
import { hashPassword } from "../service/hashService.js";

export const checkUser = async (req, res) => {
  const email = decodeURIComponent(req.query.email);
  try {
    //check if user is in database
    const user = await getUser(email);
    if (!user) return res.status(200).send();
    const saveRecovery = await createPasswordRecovery(user);
    //send email
    const isMailSend = await sendMail(
      user.email,
      "Account Recovery  Email",
      `Click the following link to reset your password  http://localhost:3000/recoverAccount/${saveRecovery?.UUID.toString()}`
    );
    if (isMailSend) {
      res.status(200).send();
    } else {
      res.status(500).send();
    }
  } catch (error) {
    console.log(error);
    console.log("anan?")
    res.send(error);
  }
};

export const recoverPassword = async (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  try {
    const hashedPassword = hashPassword(data.password);
    const isPassChanged = await changePasswordByRecovery(id, hashedPassword);
    if (isPassChanged) {
      res.status(200).send("Password updated.");
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};

export default router;
