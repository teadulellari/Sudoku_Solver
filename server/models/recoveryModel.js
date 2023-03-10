import mongoose from "mongoose";

const recoverySchema = mongoose.Schema({
  UUID: { type: String, require: true },
  date: { type: Date, require: true },
  userId: { type: String, require: true },
  hasExpired: { type: Boolean, default: false },
});

const RecoveryModel = mongoose.model("RecoveryModel", recoverySchema);

export default RecoveryModel;
