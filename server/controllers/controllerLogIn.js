import express, { application } from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const logIn = async (req, res) => {
  const { email, password } = req.body;
   req.session.user = {email: email}
 
  try {
    //check if the user exist in the user table
    const user = await UserModel.findOne({ email });
    // if user doesn'to exist send the code 404
    if (!user) {
      return res.status(404).json({ message: "This user doesn't exist." });
    }

    const userEmail = user.email;
    const userPassword = user.password;
    const isMatch = await bcrypt.compare(password, userPassword);
    if (userEmail === email && isMatch ) {
        if(user.isActive){
            res.status(200).send({ name:`${user.firstName} ${user.lastName}` });
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

export const checkSessionValidity = async (req, res) => {
  const {user} = req.body
   try {
    if(req.session.user){
      res.status(200).send("logged in")
    }else{
      res.status(401).send('Unauthorized');
    }
    
   } catch (error) {
    res.status(500).send(error);
   }
}

export default router;