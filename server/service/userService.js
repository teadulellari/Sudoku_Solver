import UserModel from "../models/userModel.js";
import VerificationModel from "../models/verificationModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import RecoveryModel from "../models/recoveryModel.js";

export const getUser = async (email) => {
  return await UserModel.findOne({ email });
};

export const checkUserPass = async (user, pass) => {
  return await bcrypt.compare(pass, user.password);
};

export const createUser = async (firstName, lastName, email, password) => {
  try {
    return await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      isActive: false,
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createUserVerification = async (userId) => {
  return await VerificationModel.create({
    UUID: uuidv4(),
    date: new Date(Date.now()),
    userId,
  });
};

export const verifyUser = async (uuid) => {
  const verifyObj = await VerificationModel.findOne({ UUID: uuid });
  const id = verifyObj.userId;
  const lastChecked = verifyObj.date;
  const dateNow = new Date(Date.now());
  const hoursSinceLastChecked = (dateNow - lastChecked) / (1000 * 60 * 60);
  if (hoursSinceLastChecked < 24) {
    const user = await UserModel.findByIdAndUpdate(id, { isActive: true });
    if (user) {
      return 1; // success
    } else {
      return 0; // user not found
    }
  } else {
    return -1; // token expired
  }
};

export const createPasswordRecovery = async (user) => {
  return await RecoveryModel.create({
    UUID: uuidv4(),
    date: new Date(Date.now()),
    userId: user._id,
  });
};

export const changePasswordByRecovery = async (uuid, password) => {
  const recoveryData = await RecoveryModel.findOne({ UUID: uuid });
  if (!recoveryData) return false;
  //if less than 24 hours you can change it
  const lastChecked = recoveryData.date;
  const dateNow = new Date(Date.now());
  const hoursSinceLastChecked = (dateNow - lastChecked) / (1000 * 60 * 60);
  if (hoursSinceLastChecked >= 24 || recoveryData.hasExpired) {
    return false;
  }
  const user = await UserModel.findOneAndUpdate(
    { _id: recoveryData.userId },
    { password }
  );
  await RecoveryModel.findByIdAndUpdate(recoveryData._id, {
    hasExpired: true,
  });
  return true;
};
