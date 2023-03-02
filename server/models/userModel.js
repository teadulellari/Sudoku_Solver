import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: {type: Boolean, required: true}
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
