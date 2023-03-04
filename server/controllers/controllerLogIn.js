import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const logIn = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    //check if the user exist in the user table
    const findUser = await UserModel.findOne({ email });
    // if user doesn'to exist send the code 404
    if (!findUser) {
      return res.status(404).json({ message: "This user doesnt exist." });
    }

    const userEmail = findUser.email;
    const userPassword = findUser.password;
    const isMatch = await bcrypt.compare(password, userPassword);
    if (userEmail === email && isMatch ) {
        if(findUser.isActive){
            res.status(200).json({ message: "Ok" });
        }else {
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

export default router;