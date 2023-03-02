import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import VerificationModel from "../models/verificationModel.js";

export const verifyUser = async (req, res) => {
  const {uuid} = req.params;
  //const uuid = req.params.uuid;
  console.log(uuid);

  try {
    //will query the Verification document/table and get Verification data with given UUID
    const result = await VerificationModel.findOne({ UUID: uuid });
    console.log(result)
    if (!result) {
      return res.status(400).json({ message: "Verification ID cannot be found" });
    }
    const id = result.userId;
    const lastChecked = result.date;
    const dateNow = new Date(Date.now());
    const hoursSinceLastChecked = (dateNow - lastChecked) / (1000 * 60 * 60);
    if (hoursSinceLastChecked < 24) {
      //link is valid
      //now find the user in the userModel and activate the user
      const findUser = UserModel.findById({ _id: id });
      if (!findUser) {
        return res.status(400).json({ message: "User does not exist" });
      }
      findUser.isActive = true;
      console.log(findUser.isActive);
      res.status(200).json({ message: "Your account is activated" });
    } else {
      //link is not valid
      console.log("Token expired");
      res.status(401).json({ message: "Token expired" });
    }
    //you will check if user accessed this link before 24 hour of the time that we send the mail.
    //If everything is okay, then you will use UserId to locate the related user, and set their isActive attribute to "true"
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
