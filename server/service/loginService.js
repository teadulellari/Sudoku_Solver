import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUser = async (email) => {
  return await UserModel.findOne({ email });
};

export const checkUserPass = async (user, pass) => {
  return await bcrypt.compare(pass, user.password);
};
